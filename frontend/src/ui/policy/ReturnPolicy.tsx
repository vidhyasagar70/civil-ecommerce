
import {
  Info,
  FileText,
  RefreshCcw,
  Package,
  Gift,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    icon: Info,
    title: "Introduction",
    content: (
      <p className="text-gray-700 leading-relaxed">
        Thank you for shopping at{" "}
        <span className="font-medium text-indigo-600">Civil DigitalStore</span>.
        If you are dissatisfied with your purchase, this policy explains how
        returns and refunds work. By placing an order, you agree to these terms.
      </p>
    ),
  },
  {
    icon: FileText,
    title: "Interpretation & Definitions",
    content: (
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>
          <b>Company:</b> Civil Engineering DigitalStore.
        </li>
        <li>
          <b>Goods:</b> The products available for sale.
        </li>
        <li>
          <b>Orders:</b> Your purchase requests from us.
        </li>
        <li>
          <b>Website:</b>{" "}
          <a
            href="https://civildigitalstore.com/"
            className="text-indigo-600 underline"
          >
            civildigitalstore.com
          </a>
        </li>
        <li>
          <b>You:</b> The customer using our service.
        </li>
      </ul>
    ),
  },
  {
    icon: RefreshCcw,
    title: "Order Cancellation Rights",
    content: (
      <>
        <p className="text-gray-700 leading-relaxed">
          You have the right to cancel your order within <b>7 days</b> without
          giving any reason.
        </p>
        <p className="text-gray-700 leading-relaxed mt-2">
          To cancel, please notify us clearly by:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
          <li>
            Email:{" "}
            <span className="text-indigo-600 font-medium">
              civildigitalstore@gmail.com
            </span>
          </li>
          <li>
            Phone:{" "}
            <span className="text-indigo-600 font-medium">8807423228</span>
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-2">
          Refunds will be processed within 14 days using your original payment
          method. No fees will be charged for reimbursement.
        </p>
      </>
    ),
  },
  {
    icon: Package,
    title: "Conditions for Returns",
    content: (
      <>
        <p className="text-gray-700">For goods to be eligible for a return:</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
          <li>They were purchased within the last 7 days.</li>
          <li>They are in the original packaging.</li>
        </ul>
        <p className="text-gray-700 mt-3 font-semibold">
          The following items cannot be returned:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-1">
          <li>Customized goods or made-to-order products.</li>
          <li>Digital items once downloaded.</li>
          <li>
            Goods not suitable for return due to hygiene reasons and unsealed
            after delivery.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Gift,
    title: "Gifts",
    content: (
      <>
        <p className="text-gray-700 leading-relaxed">
          If the goods were marked as a gift and shipped directly to you, you
          will receive a gift credit for the value of your return. Once the
          returned item is received, a gift certificate will be sent.
        </p>
        <p className="text-gray-700 leading-relaxed mt-2">
          If the goods were not marked as a gift, or shipped to the gift giver,
          the refund will be issued to the original purchaser.
        </p>
      </>
    ),
  },
  {
    icon: Mail,
    title: "Contact Us",
    content: (
      <>
        <p className="text-gray-700 leading-relaxed">
          For any questions about this Return & Refund Policy, contact us:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mt-2">
          <li>
            Email:{" "}
            <span className="text-indigo-600 font-medium">
              civildigitalstore@gmail.com
            </span>
          </li>
          <li>
            Phone:{" "}
            <span className="text-indigo-600 font-medium">8807423228</span>
          </li>
        </ul>
      </>
    ),
  },
];

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-purple-50 to-white font-sans text-gray-800 antialiased">
      <div className="max-w-5xl mx-auto py-14 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-5xl font-serif font-bold text-gray-900">
            Return & Refund Policy
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Please read this policy carefully before purchasing from{" "}
            <span className="text-indigo-600 font-semibold">
              Civil DigitalStore
            </span>
            . Your rights as a customer matter to us.
          </p>
          <p className="text-sm text-gray-400 mt-3">
            Last updated: July 12, 2023
          </p>
        </motion.div>

        {/* Segmented cards */}
        <div className="grid gap-8">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                {section.content}
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
