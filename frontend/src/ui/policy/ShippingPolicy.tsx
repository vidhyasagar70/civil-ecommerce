import React from "react";

const ShippingPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Shipping & Delivery Policy
        </h1>

        {/* Last Updated */}
        <p className="text-sm text-gray-500 mb-6 text-center">
          Last updated: July 10, 2023
        </p>

        {/* Intro */}
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          This Shipping & Delivery Policy is part of our Terms and Conditions (“Terms”) and should be read alongside our main Terms:{" "}
          <a
            href="https://www.civildigitalstore.com/terms-and-conditions/"
            className="text-violet-700 font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.civildigitalstore.com/terms-and-conditions/
          </a>.
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Please carefully review our Shipping & Delivery Policy when purchasing our products. This policy will apply to any order you place with us.
        </p>

        {/* Shipping Options */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          What Are My Shipping & Delivery Options?
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          <strong>Free Shipping:</strong> We offer free Instant Download shipping on all orders.
        </p>

        {/* International Delivery */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          Do You Deliver Internationally?
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We do not offer international shipping.
        </p>

        {/* Returns */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          Questions About Returns?
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          If you have questions about returns, please review our Return Policy:{" "}
          <a
            href="https://www.civildigitalstore.com/return-and-refund-policy"
            className="text-violet-700 font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.civildigitalstore.com/return-and-refund-policy
          </a>.
        </p>

        {/* Contact Info */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          How Can You Contact Us About This Policy?
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          If you have any further questions or comments, you may contact us by:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>📞 Phone: +91 8807423228, 9042993986</li>
          <li>📧 Email: civildigitalstore@gmail.com</li>
          <li>
            🌐 Online contact form:{" "}
            <a
              href="https://civildigitalstore.com/contact-us/"
              className="text-violet-700 font-semibold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://civildigitalstore.com/contact-us/
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShippingPolicy;