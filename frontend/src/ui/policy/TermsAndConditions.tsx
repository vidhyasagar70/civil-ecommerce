import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Terms and Conditions
        </h1>

        {/* Intro */}
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Welcome to <strong>Civil DigitalStore</strong>! These terms and
          conditions outline the rules and regulations for the use of Civil
          DigitalStore Website, located at{" "}
          <a
            href="https://civildigitalstore.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-700 font-semibold hover:underline"
          >
            https://civildigitalstore.com/
          </a>
          .
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          By accessing this website, we assume you accept these terms and
          conditions. Do not continue to use Civil DigitalStore if you do not
          agree with all the terms and conditions stated on this page.
        </p>

        {/* Cookies */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          Cookies
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We employ the use of cookies. By accessing Civil DigitalStore, you
          agree to use cookies in accordance with our{" "}
          <strong>Privacy Policy</strong>. Most interactive websites use cookies
          to retrieve user details for each visit.
        </p>

        {/* License */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          License
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Unless otherwise stated, Civil DigitalStore and/or its licensors own
          the intellectual property rights for all material on this website. All
          rights are reserved. You may access this for your personal use subject
          to restrictions set in these terms.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Do not republish material from Civil DigitalStore</li>
          <li>Do not sell, rent or sub-license material</li>
          <li>Do not reproduce, duplicate or copy material</li>
          <li>Do not redistribute content without permission</li>
        </ul>

        {/* Hyperlinking */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          Hyperlinking to our Content
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The following organizations may link to our Website without prior
          written approval:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Government agencies</li>
          <li>Search engines</li>
          <li>News organizations</li>
          <li>Online directory distributors</li>
        </ul>

        {/* iFrames */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          iFrames
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Without prior approval and written permission, you may not create
          frames around our Webpages that alter the visual presentation or
          appearance of our Website.
        </p>

        {/* Content Liability */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          Content Liability
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We shall not be held responsible for any content that appears on your
          website. You agree to protect and defend us against all claims that
          arise on your site.
        </p>

        {/* Disclaimer */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          Disclaimer
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          To the maximum extent permitted by law, we exclude all
          representations, warranties, and conditions relating to our website
          and the use of this website. Nothing in this disclaimer will:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Limit or exclude liability for death or personal injury</li>
          <li>
            Limit or exclude liability for fraud or fraudulent misrepresentation
          </li>
          <li>
            Exclude any liabilities that may not be excluded under applicable
            law
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TermsAndConditions;
