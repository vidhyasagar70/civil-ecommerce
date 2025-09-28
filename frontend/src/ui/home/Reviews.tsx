import React from "react";
import { Star } from "lucide-react";
import { useAdminTheme } from "../../contexts/AdminThemeContext";

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
  const { colors } = useAdminTheme();

  return (
    <section
      className="w-full py-16 transition-colors duration-200"
      style={{
        background: `linear-gradient(to right, ${colors.background.secondary}, ${colors.background.primary})`
      }}
    >
      <div className="text-center mb-12">
        <h2
          className="text-3xl md:text-4xl font-bold transition-colors duration-200"
          style={{ color: colors.text.primary }}
        >
          What Our Customers Say
        </h2>
        <p
          className="mt-2 text-lg transition-colors duration-200"
          style={{ color: colors.text.secondary }}
        >
          Join thousands of satisfied customers who trust our software solutions
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-20">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="rounded-2xl shadow-md p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            style={{ backgroundColor: colors.background.primary }}
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
            <p
              className="italic mb-6 transition-colors duration-200"
              style={{ color: colors.text.secondary }}
            >
              "{review.text}"
            </p>

            {/* Profile */}
            <div className="flex items-center space-x-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full border-2 transition-colors duration-200"
                style={{ borderColor: colors.interactive.primary }}
              />
              <div>
                <h4
                  className="font-semibold transition-colors duration-200"
                  style={{ color: colors.text.primary }}
                >
                  {review.name}
                </h4>
                <p
                  className="text-sm transition-colors duration-200"
                  style={{ color: colors.text.secondary }}
                >
                  {review.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
