import React from 'react'
import { FaQuoteLeft } from 'react-icons/fa'

const ReviewCard = ({review}) => {
    const {userName, review: testimonial, user_photoURL} = review;
  return (
    <div className="card w-96 bg-base-100 shadow-xl p-8 rounded-[1rem] border border-gray-100 px-10">
      {/* Quote Icon */}
      <div className="text-[#C3DFE2] mb-4">
        <FaQuoteLeft size={40} />
      </div>

      {/* Testimonial Text */}
      <div className="card-body p-0">
        <p className="text-gray-600 leading-relaxed text-sm">
          {testimonial}
        </p>

        {/* Dotted Divider */}
        <div className="border-t-2 border-dotted border-cyan-200 my-6"></div>

        {/* Author Section */}
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full bg-[#004d4d]">
              {/* Replace with <img> if you have an author photo */}
              <img src={user_photoURL} alt="" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-[#003d3d] text-lg">{userName}</h2>
            <p className="text-gray-500 text-xs">Senior Product Designer</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard