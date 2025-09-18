import React from "react";
import { CheckCircle, Shield, Zap, Users } from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="h-8 w-8 text-green-700" />,
    title: "100% Genuine",
    description: "Authentic licenses from authorized vendors",
    bg: "bg-green-50",
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-700" />,
    title: "Secure Checkout",
    description: "SSL encrypted with UPI & card payments",
    bg: "bg-blue-50",
  },
  {
    icon: <Zap className="h-8 w-8 text-purple-700" />,
    title: "Instant Delivery",
    description: "License keys within minutes of purchase",
    bg: "bg-purple-50",
  },
  {
    icon: <Users className="h-8 w-8 text-orange-700" />,
    title: "24/7 Support",
    description: "Dedicated installation & licensing help",
    bg: "bg-orange-50",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-r from-indigo-50 to-violet-50 rounded-3xl shadow-sm py-14 px-6 md:px-20">
      {/* Heading */}
      <div className="text-center mb-14">
       <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Why Choose CivilDigitalStore?
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Trusted by engineers worldwide for authentic software solutions
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-md rounded-2xl p-6"
          >
            <div
              className={`flex items-center justify-center w-16 h-16 rounded-xl ${feature.bg} shadow-sm`}
            >
              {feature.icon}
            </div>
            <h3 className="mt-5 text-lg font-semibold text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-500 text-sm mt-2 max-w-[220px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
