import React from "react";
import { motion } from "framer-motion";
import { Link, BookOpen, Shield, AlertTriangle } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Disclaimer: React.FC = () => {
  return (
    <div className="py-14 px-4 sm:py-20 sm:px-6 bg-gradient-to-tr from-blue-50 via-violet-50 to-white">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h1 className="text-5xl font-serif font-bold text-gray-900">
          Disclaimer
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Please read this page carefully to understand the limitations, scope, and
          responsibilities regarding the information provided on{" "}
          <strong>Civil DigitalStore</strong>.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid gap-8">
        {/* Intro */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-8 border border-gray-200"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 leading-relaxed text-lg">
            The information provided by <strong>Civil DigitalStore</strong> 
            (“we,” “us,” or “our”) on this website is for general informational 
            purposes only. All information is provided in good faith; however, 
            we make no representation or warranty of any kind regarding accuracy, 
            adequacy, validity, reliability, or completeness.
          </p>
        </motion.div>

        {/* External Links Disclaimer */}
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
              <Link className="w-7 h-7 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              External Links Disclaimer
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            This website may contain (or you may be sent through the site) links 
            to other websites. We do not investigate, monitor, or check such 
            external links for accuracy or reliability. We are not responsible 
            for any third-party websites.
          </p>
        </motion.div>

        {/* Professional Disclaimer */}
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
              <BookOpen className="w-7 h-7 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Professional Disclaimer
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            The site cannot and does not contain legal, financial, or engineering 
            advice. Any information provided is for general informational and 
            educational purposes only and should not be relied upon as a substitute 
            for professional advice.
          </p>
        </motion.div>

        {/* Limitation of Liability */}
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
              <Shield className="w-7 h-7 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Limitation of Liability
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Under no circumstances shall we be liable for any direct, indirect, 
            incidental, consequential, or special damages arising out of or in 
            any way connected with the use of this site.
          </p>
        </motion.div>
      </div>

      {/* Footer Notice */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <AlertTriangle className="w-5 h-5 inline-block mr-1 text-yellow-500" />
        This disclaimer is subject to change without notice.
      </div>
    </div>
  );
};

export default Disclaimer;
