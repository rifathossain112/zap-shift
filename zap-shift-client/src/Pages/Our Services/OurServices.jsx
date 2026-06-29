import React from 'react'

const OurServices = () => {
const serviceData = [
    {
      title: "Express & Standard Delivery",
      description: "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
      icon: "🚚", // এখানে আপনি ইমেজ বা SVG ব্যবহার করতে পারেন
      isHighlighted: false
    },
    {
      title: "Nationwide Delivery",
      description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.",
      icon: "🌍",
      isHighlighted: true // এই কার্ডটি লাইম গ্রিন কালারের হবে
    },
    {
      title: "Fulfillment Solution",
      description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      icon: "📦",
      isHighlighted: false
    },
    {
      title: "Cash on Home Delivery",
      description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      icon: "💵",
      isHighlighted: false
    },
    {
      title: "Corporate Service / Contract In Logistics",
      description: "Customized corporate services which includes warehouse and inventory management support.",
      icon: "🏢",
      isHighlighted: false
    },
    {
      title: "Parcel Return",
      description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      icon: "🔄",
      isHighlighted: false
    }
  ];

  return (
    <section className="bg-secondary py-16 px-6 rounded-[40px] text-white">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-sm">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
          From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceData.map((service, index) => (
          <div
            key={index}
            className= "p-8 rounded-3xl transition duration-300 flex flex-col items-center text-center shadow-sm hover:shadow-md  bg-white text-black">
            {/* Icon Container */}
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-3xl">
              {service.icon}
            </div>

            <h3 className="text-xl font-bold mb-4 px-4 leading-tight">
              {service.title}
            </h3>
            
            <p className={`text-sm leading-relaxed ${service.isHighlighted ? 'text-gray-800' : 'text-gray-600'}`}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OurServices