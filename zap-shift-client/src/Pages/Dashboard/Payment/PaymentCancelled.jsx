import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
const PaymentCancelled = () => {
  return (
    <div>
        <h2>Payment is cancelled</h2>
        <Link to ="/dashboard/my-parcels">
        <button className='btn btn-primary text-black'>
            Try again
        </button>
        </Link>
    </div>
  )
}

export default PaymentCancelled