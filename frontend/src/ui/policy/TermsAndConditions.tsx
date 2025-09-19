import React from "react";
import { motion } from "framer-motion";
import { Cookie, FileText, Link, Layout, Shield, AlertCircle } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const TermsAndConditions: React.FC = () => {
  return (
  <div className="py-14 px-4 sm:py-20 sm:px-6 bg-gradient-to-tr from-blue-92 via-violet-50 to-white-50">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h1 className="text-5xl font-serif font-bold text-gray-900">
          Terms & Conditions
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Welcome to <strong>Civil DigitalStore</strong>! Please read these Terms
          & Conditions carefully before using our website{" "}
          <a
            href="https://civildigitalstore.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-700 font-semibold hover:underline"
          >
            https://civildigitalstore.com/
          </a>.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid gap-8">
        {/* Cookies */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-8 border border-gray-200"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-full">
              <Cookie className="w-7 h-7 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Cookies</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            By using our website, you consent to the use of cookies in accordance
            with our Privacy Policy. Cookies help improve user experience and
            enable certain site functionalities.
          </p>
        </motion.div>

        {/* License */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-8 border border-gray-200"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-full">
              <FileText className="w-7 h-7 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">License</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unless otherwise stated, <strong>Civil DigitalStore</strong> owns the
            intellectual property rights for all material on this site. You may
            use it for personal purposes only under these restrictions:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>No republishing of content</li>
            <li>No selling or sublicensing</li>
            <li>No reproduction or duplication</li>
            <li>No redistribution without permission</li>
          </ul>
        </motion.div>

        {/* Hyperlinking */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-8 border border-gray-200"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-full">
              <Link className="w-7 h-7 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Hyperlinking to Our Content
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            The following organizations may link to our website without prior
            approval:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Government agencies</li>
            <li>Search engines</li>
            <li>News organizations</li>
            <li>Online directories</li>
          </ul>
        </motion.div>

        {/* iFrames */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-8 border border-gray-200"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-full">
              <Layout className="w-7 h-7 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">iFrames</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Without written approval, you may not create frames around our web
            pages that alter the appearance or presentation of our website.
          </p>
        </motion.div>

        {/* Content Liability */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-8 border border-gray-200"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-full">
              <Shield className="w-7 h-7 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Content Liability
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We are not responsible for any content that appears on your website.
            You agree to defend and protect us against any claims arising from
            your site.
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-8 border border-gray-200"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-full">
              <AlertCircle className="w-7 h-7 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Disclaimer</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            To the fullest extent permitted by law, we exclude all warranties and
            conditions relating to this website. Nothing in this disclaimer will:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Limit liability for death or personal injury</li>
            <li>Limit liability for fraud or misrepresentation</li>
            <li>Exclude liabilities that cannot be excluded by law</li>
          </ul>
        </motion.div>
      </div>

      {/* Footer Notice */}
      <div className="mt-12 text-center text-sm text-gray-500">
        Last updated: <strong>September 2025</strong> • Subject to change anytime
      </div>
    </div>
  );
};

export default TermsAndConditions;
