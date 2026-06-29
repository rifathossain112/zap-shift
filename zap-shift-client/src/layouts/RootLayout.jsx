import React from 'react'
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import NavBar from '../Pages/Shared/NavBar/NavBar';
import HowItWorks from '../Pages/HowItWorks/HowItWorks';
import OurServices from '../Pages/Our Services/OurServices';
const RootLayout = () => {
  return (
    <div className='max-w-7xl mx-auto bg-gray-100'>
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default RootLayout;