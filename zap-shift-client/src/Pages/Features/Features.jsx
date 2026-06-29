import React from 'react'
import live_traking from '../../assets/live_traking.png'
import safe from '../../assets/safe.png'
import hours_suport from '../../assets/24-hours-support.png'

const Features = () => {
  const features = [
    {
      img: live_traking,
      title: "Live Parcel Tracking",
      desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    },
    {
      img: safe,
      title: "100% Safe Delivery",
      desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
      img: hours_suport,
      title: "24/7 Call Center Support",
      desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-6 bg-gray-50 rounded-2xl p-6 shadow-sm"
          >
            {/* Image */}
            <div className="w-40">
              <img src={item.img} alt={item.title} />
            </div>

            {/* Divider (optional design) */}
            <div className="hidden md:block h-16 border-l-2 border-dashed border-gray-300"></div>

            {/* Content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Features