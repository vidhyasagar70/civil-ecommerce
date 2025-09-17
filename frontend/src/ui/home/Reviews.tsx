import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    text: "Got AutoCAD 2024 from CivilDigitalStore. 100% genuine license and instant delivery. Excellent support!",
    name: "Rajesh Kumar",
    role: "Senior Civil Engineer at L&T Construction",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    text: "Purchased Tekla Structures. The software is authentic and the pricing is very competitive.",
    name: "Priya Sharma",
    role: "Structural Engineer at Tata Projects",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    text: "Amazing experience! Got Revit 2024 with lifetime license. Highly recommended for professionals.",
    name: "Arun Patel",
    role: "Architect at DLF",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  
];

const Reviews: React.FC = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-r from-indigo-50 to-violet-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Join thousands of satisfied customers who trust our software solutions
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-20">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
          >
            {/* Stars */}
            <div className="flex justify-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>

            {/* Review text */}
            <p className="text-gray-700 italic mb-6">"{review.text}"</p>

            {/* Profile */}
            <div className="flex items-center space-x-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full border-2 border-violet-500"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                <p className="text-sm text-gray-600">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
