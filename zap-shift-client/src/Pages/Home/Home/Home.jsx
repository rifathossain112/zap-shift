import React from 'react'
import Banner from '../Banner/Banner'
import Brands from '../Brands/Brands'
import HowItWorks from '../../HowItWorks/HowItWorks'
import OurServices from '../../Our Services/OurServices'
import Features from '../../Features/Features'
import Reviews from '../Reviews/Reviews'

const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <HowItWorks></HowItWorks>
        <OurServices></OurServices>
        <Brands></Brands>
        <Features></Features>
        <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  )
}

export default Home