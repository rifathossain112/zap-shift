import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import bannerImage1 from '../../../assets/banner/banner1.png'
import bannerImage2 from '../../../assets/banner/banner2.png'
import bannerImage3 from '../../../assets/banner/banner3.png'
const Banner = () => {
  return (
     <Carousel
      autoPlay = {true}
      infiniteLoop = {true}
      interval={2000}
     >
                <div>
                    <img src= {bannerImage1}/>
                   
                </div>
                <div>
                    <img src={bannerImage2} />
                    
                </div>
                <div>
                    <img src={bannerImage3}/>
                </div>
            </Carousel>
  )
}

export default Banner