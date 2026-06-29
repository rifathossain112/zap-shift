import React from 'react'
import { Truck, CreditCard, Building2, Package } from "lucide-react";

const HowItWorks = () => {
const items = [
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-primary" />,
      title: "Cash On Delivery",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: <Package className="w-8 h-8 text-primary" />,
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: <Building2 className="w-8 h-8 text-primary" />,
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];

  return (
    <section className="bg-gray-100 py-10 px-30">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          How it Works
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4">{item.icon}</div>

              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks