import React from "react";

const Disclaimer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Disclaimer
        </h1>

        {/* Intro */}
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          The information provided by <strong>Civil DigitalStore</strong> (“we,” “us,” or “our”) on this website is for general informational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind regarding accuracy, adequacy, validity, reliability, or completeness.
        </p>

        {/* External Links Disclaimer */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          External Links Disclaimer
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          This website may contain (or you may be sent through the site) links to other websites. We do not investigate, monitor, or check such external links for accuracy or reliability. We are not responsible for any third-party websites.
        </p>

        {/* Professional Disclaimer */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          Professional Disclaimer
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          The site cannot and does not contain legal, financial, or engineering advice. Any information provided is for general informational and educational purposes only and should not be relied upon as a substitute for professional advice.
        </p>

        {/* Limitation of Liability */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Under no circumstances shall we be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way connected with the use of this site.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;