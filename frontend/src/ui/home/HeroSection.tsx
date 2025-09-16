import React from "react";
import {
  UserGroupIcon,
  CloudArrowDownIcon,
  ShieldCheckIcon,
  StarIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import FormButton from "../../components/Button/FormButton";

const features = [
  {
    icon: <UserGroupIcon className="h-12 w-14 text-violet-600/80" />,
    value: "5000+",
    label: "Happy Engineers",
  },
  {
    icon: <CloudArrowDownIcon className="h-12 w-14 text-blue-600/80" />,
    value: "12,500+",
    label: "Software Delivered",
  },
  {
    icon: <ShieldCheckIcon className="h-12 w-14 text-emerald-600/80" />,
    value: "100%",
    label: "Secure Transactions",
  },
  {
    icon: <StarIcon className="h-12 w-14 text-amber-500/80" />,
    value: "4.9/5",
    label: "Customer Rating",
  },
];

const paymentMethods = [
  {
    icon: <DevicePhoneMobileIcon className="h-5 w-5 text-pink-500" />,
    label: "UPI & Mobile Payments",
  },
  {
    icon: <CreditCardIcon className="h-5 w-5 text-blue-600" />,
    label: "Secure Cards",
  },
  {
    icon: <BoltIcon className="h-5 w-5 text-yellow-400" />,
    label: "Instant Activation",
  },
];

const HeroSection: React.FC = () => {
  return (
    <section className="py-14 px-4 sm:py-20 sm:px-6 bg-gradient-to-tr from-blue-50 via-violet-50 to-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        {/* Heading */}
       <h1
         className=" text-4xl sm:text-5xl font-extrabold font-sans mb-3 tracking-tight bg-gradient-to-br from-blue-700 via-violet-700  to-blue-500  bg-clip-text text-transparent leading-normal text-center ">Genuine Civil<br />
         Engineering Software
         </h1>


        {/* Subtext */}
        <p className="mb-10 text-base sm:text-xl text-gray-600 font-medium text-center font-sans max-w-2xl">
          Get authentic AutoCAD, Revit, Lumion, Tekla and other professional software licenses with instant delivery and lifetime support.
        </p>

        {/* Product Button Only */}
        <div className="flex justify-center w-full sm:w-auto mb-12">
          <FormButton size="lg" variant="primary">Explore Products</FormButton>
        </div>

        {/* Features Grid with Hover Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex flex-col items-center bg-white rounded-2xl py-7 px-6 shadow-md border border-gray-100 transition transform duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-violet-400"
            >
              <div className="mb-3">{f.icon}</div>
              <div className="text-2xl font-extrabold text-gray-800 mb-0.5 font-sans">
                {f.value}
              </div>
              <div className="text-gray-600 text-base font-medium font-sans text-center">
                {f.label}
              </div>
            </div>
          ))}
        </div>

        {/* Colored Payment Info Icons */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-12 justify-center text-sm text-gray-500 font-medium font-sans">
          {paymentMethods.map((method) => (
            <span key={method.label} className="flex items-center gap-2">
              {method.icon}
              {method.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
