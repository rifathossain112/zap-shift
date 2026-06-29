const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const serviceAccount = require("C:/Secrets/zap-shift-bb6c8-firebase-adminsdk-fbsvc-4cbc7866e6.json");

initializeApp({
  credential: cert(serviceAccount),
});

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const port = process.env.PORT || 3000;
const crypto = require("crypto");

function generateTrackingId() {
    const prefix = "PRCL"; // your brand prefix
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
    const random = crypto.randomBytes(3).toString("hex").toUpperCase(); // 6-char random hex

    return `${prefix}-${date}-${random}`;
}

// Middleware
app.use(cors());
app.use(express.json());

const verifyFBToken = async(req, res, next) =>{
  console.log('headers in the middleware', req.headers.authorization)
  const token = req.headers.authorization;
  if(!token){
    return res.status(401).send({message: 'unauthorized access'})
  }
  try{
    const idToken = token.split(' ')[1];
    const decoded = await getAuth().verifyIdToken(idToken);
    console.log('decoded in the token', decoded)
    req.decoded_email = decoded.email;
    next();
    
  }
  catch(err){
    return res.status(401).send({message: 'unauthorized access'})
  }
 
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mybxoki.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db('zap_shift_db');
    const userCollection = db.collection('users');
    const parcelsCollection = db.collection('parcels');
    const paymentCollection = db.collection('payments');
    const riderCollection = db.collection('riders');

    // user related apis
    app.post('/users', async(req, res) =>{
      const user = req.body;
      user.role = 'user';
      user.createdAt = new Date();
      const email = user.email;
      const userExists = await userCollection.findOne({email})

      if(userExists){
        return res.send({message: 'user exists'})
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    }) 

    // Get all parcels
    app.get('/parcels', async (req, res) => {
      const query = {};

      const { email } = req.query;

      if (email) {
        query.senderEmail = email;
      }

      const options = {
        sort: { createdAt: -1 },
      };

      const result = await parcelsCollection
        .find(query, options)
        .toArray();

      res.send(result);
    });

    // Get single parcel
    app.get('/parcels/:id', async (req, res) => {
      const id = req.params.id;

      const query = {
        _id: new ObjectId(id),
      };

      const result = await parcelsCollection.findOne(query);

      res.send(result);
    });

    // Add parcel
    app.post('/parcels', async (req, res) => {
      const parcel = req.body;

      parcel.createdAt = new Date();

      const result = await parcelsCollection.insertOne(parcel);

      res.send(result);
    });

    // Delete parcel
    app.delete('/parcels/:id', async (req, res) => {
      const id = req.params.id;

      const query = {
        _id: new ObjectId(id),
      };

      const result = await parcelsCollection.deleteOne(query);

      res.send(result);
    });

    // Stripe Checkout Session
    // payment related apis

    //old

    app.post('/create-checkout-session', async (req, res) => {
      try {
        const paymentInfo = req.body;

        const amount = Number(paymentInfo.cost) * 100;

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],

          line_items: [
            {
              price_data: {
                currency: 'usd',
                unit_amount: amount,
                product_data: {
                  name: `Please pay for: ${paymentInfo.parcelName}`,
                },
              },
              quantity: 1,
            },
          ],

          customer_email: paymentInfo.senderEmail,

          mode: 'payment',

          success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment-cancelled`,

          metadata: {
            parcelId: paymentInfo.parcelId,
            parcelName: paymentInfo.parcelName,
          },
        });

        console.log('Stripe Session Created:', session.id);

        res.send({
          url: session.url,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({
          error: error.message,
        });
      }
    });

    app.patch('/payment-success', async(req, res) =>{
      const sessionId = req.query.session_id;
      
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      // console.log('session retrieve', session)
      const transactionId = session.payment_intent;
      const query = {transactionId: transactionId}

      const paymentExist = await paymentCollection.findOne(query);

      if(paymentExist){
        return res.send({
          message: 'already exists',
          transactionId,
          trackingId: paymentExist.trackingId
        })
      }

      const trackingId = generateTrackingId()
      if(session.payment_status ==='paid'){
        const id = session.metadata.parcelId;
        const query = {_id: new ObjectId(id)}
        const update = {
          $set:{
            paymentStatus: 'paid',
            trackingId: trackingId,
          }
        }
        const result = await parcelsCollection.updateOne(query, update);

        const payment = {
          amount: session.amount_total/100,
          currency: session.currency,
          customerEmail: session.customer_email,
          parcelId: session.metadata.parcelId,
          parcelName: session.metadata.parcelName,
          transactionId: session.payment_intent,
          paymentStatus: session.payment_status,
          paidAt: new Date(),
          trackingId: trackingId
        }
        if(session.payment_status === 'paid'){
          const resultPayment = await paymentCollection.insertOne(payment)
          res.send({success: true,
             modifyParcel: result,
             trackingId: trackingId,
             transactionId:session.payment_intent,
              paymentInfo: resultPayment})
        }
      }
      res.send({success: false})
    })

    //payment related apis
    app.get('/payments',verifyFBToken, async(req, res) =>{
      const email = req.query.email;
      const query = {}
      if(email){
        query.customerEmail = email;
        //check email address
        if(email !== req.decoded_email){
          return res.status(403).send({message: 'forbidden access'})
        }
      }
      const cursor = paymentCollection.find(query).sort({paidAt: -1});
      const result = await cursor.toArray();
      res.send(result);
    })

    //riders related apis

    app.get('/riders', async(req, res) =>{
      const query = {}
      if(req.query.status){
        query.status = req.query.status;
      }
      const cursor = riderCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);

    })

    app.patch('/riders/:id', verifyFBToken, async(req, res) =>{
      const status = req.body.status;
      const id = req.body.id;
      const query = {_id : new ObjectId(id)}
      const updatedDoc = {
        $set:{
          status: status
        }
      }
    })

    // rider related information
    app.post('/riders', async(req, res) =>{
      const rider = req.body;
      rider.status = 'pending';
      rider.creatAt = new Date();

      const result = await riderCollection.insertOne(rider);
      res.send(result);
    })

    await client.db('admin').command({ ping: 1 });

    console.log('MongoDB Connected Successfully');
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('zap is shifting');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});