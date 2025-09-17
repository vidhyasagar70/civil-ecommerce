import React from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../../components/Button/FormButton";


type Offer = {
  id: string | number;
  title: string;
  desc: string;
  img?: string; // optional; uses generic placeholder if not provided
  to?: string;
};

const defaultOffers: Offer[] = [
  {
    id: 1,
    title: "Exclusive offers on MS Office Packages",
    desc: "Genuine Office suite licenses at unbeatable prices.",

    to: "/products",
  },
  {
    id: 2,
    title: "Elementor Pro at just ₹449",
    desc: "Build beautiful websites with premium Elementor Pro.",
   
    to: "/products",
  },
];

const MinimalOffers: React.FC<{ offers?: Offer[] }> = ({ offers = defaultOffers }) => {
  const navigate = useNavigate();

  return (
        <section className="w-full bg-gradient-to-r from-indigo-50 to-violet-50 rounded-3xl shadow-sm py-14 px-6 md:px-20">

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Exclusive Offers 🎉</h2>
          <p className="text-gray-600 mt-3 text-lg">
            Limited-time deals — clean, simple and attention grabbing.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {offers.map((o) => (
            <div
              key={o.id}
              className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between overflow-hidden
                         border border-transparent transition-all duration-500
                         hover:border-indigo-500 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
            >
              {/* content */}
              <div className="relative z-10 flex items-start gap-4">
                {/* image (optional) */}
                <div
                  className="w-16 h-16 rounded-xl bg-white/40 flex items-center justify-center flex-shrink-0
                             transition-transform duration-300 group-hover:scale-105"
                >
                  
                    <svg
                      className="w-10 h-10 text-indigo-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="4"
                        fill="currentColor"
                        opacity="0.12"
                      />
                      <path
                        d="M7 12h10M7 8h6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{o.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{o.desc}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="relative z-10 mt-6">
                <FormButton
                  onClick={() => navigate(o.to || "/products")}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-2 rounded-lg
                             transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                >
                  <span className="relative z-10">View Offer</span>
                  {/* shine effect */}
                  <span
                    className="absolute left-[-40%] top-0 w-1/2 h-full bg-white/20 transform skew-x-[-20deg]
                               opacity-0 group-hover:opacity-80 transition-all duration-500"
                  />
                </FormButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinimalOffers;
