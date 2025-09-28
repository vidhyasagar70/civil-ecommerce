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
import { useNavigate } from "react-router-dom";
import FormButton from "../../components/Button/FormButton";
import { useAdminTheme } from "../../contexts/AdminThemeContext";

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
  const navigate = useNavigate();
  const { colors } = useAdminTheme();

  return (
    <section
      className="py-14 px-4 sm:py-20 sm:px-6 transition-colors duration-200"
      style={{
        background: `linear-gradient(to top right, ${colors.background.secondary}, ${colors.background.primary})`
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl font-serif font-bold mb-6 tracking-wide leading-snug text-center transition-colors duration-200"
          style={{ color: colors.text.primary }}
        >
          Genuine Civil <br />
          Engineering Software
        </h1>

        {/* Subtext */}
        <p
          className="mb-12 text-lg sm:text-xl font-serif leading-relaxed text-center max-w-2xl transition-colors duration-200"
          style={{ color: colors.text.secondary }}
        >
          Get authentic AutoCAD, Revit, Lumion, Tekla and other professional software licenses
          with instant delivery and lifetime support.
        </p>

        {/* Explore Products Button */}
        <div className="flex justify-center w-full sm:w-auto mb-15">
          <FormButton
            size="lg"
            variant="primary"
            onClick={() => navigate("/products")} // 👈 Navigate to products page
          >
            Explore Products
          </FormButton>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex flex-col items-center rounded-2xl py-7 px-6 shadow-md border transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
              style={{
                backgroundColor: colors.background.primary,
                borderColor: colors.border.primary
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.interactive.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border.primary;
              }}
            >
              <div className="mb-3">{f.icon}</div>
              <div
                className="text-2xl font-extrabold mb-0.5 font-sans transition-colors duration-200"
                style={{ color: colors.text.primary }}
              >
                {f.value}
              </div>
              <div
                className="text-base font-medium font-sans text-center transition-colors duration-200"
                style={{ color: colors.text.secondary }}
              >
                {f.label}
              </div>
            </div>
          ))}
        </div>

        {/* Payment Info */}
        <div
          className="flex flex-wrap gap-x-6 gap-y-2 mt-12 justify-center text-sm font-medium font-sans transition-colors duration-200"
          style={{ color: colors.text.secondary }}
        >
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
