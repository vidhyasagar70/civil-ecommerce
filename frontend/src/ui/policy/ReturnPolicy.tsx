import React from "react";

const ReturnPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
                {/* Title */}
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    Return and Refund Policy
                </h1>

                {/* Last Updated */}
                <p className="text-sm text-gray-500 mb-6 text-center">
                    Last updated: July 12, 2023
                </p>

                {/* Intro */}
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Thank you for shopping at <strong>Civil DigitalStore</strong>.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    If, for any reason, you are not completely satisfied with a purchase, we invite you to review our policy on refunds and returns. The following terms are applicable for any products that you purchased with us.
                </p>

                {/* Interpretation and Definitions */}
                <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Interpretation and Definitions</h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Interpretation</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                    The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">Definitions</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">For the purposes of this Return and Refund Policy:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Company</strong>: Civil Engineering DigitalStore.</li>
                    <li><strong>Goods</strong>: Items offered for sale on the Service.</li>
                    <li><strong>Orders</strong>: A request by You to purchase Goods from Us.</li>
                    <li><strong>Service</strong>: Refers to the Website.</li>
                    <li>
                        <strong>Website</strong>: Civil Engineering Data, accessible from{" "}
                        <a href="https://civildigitalstore.com/" className="text-violet-700 font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                            https://civildigitalstore.com/
                        </a>
                    </li>
                    <li><strong>You</strong>: The individual or entity accessing or using the Service.</li>
                </ul>

                {/* Cancellation Rights */}
                <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Your Order Cancellation Rights</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                    You are entitled to cancel your order within 7 days without giving any reason. The deadline is 7 days from the date you received the goods or a third party (not the carrier) took possession.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                    To exercise your right of cancellation, inform us via:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>📧 Email: civildigitalstore@gmail.com</li>
                    <li>📞 Phone: 8807423228</li>
                </ul>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    We will reimburse you within 14 days of receiving the returned goods, using the same payment method with no fees.
                </p>

                {/* Conditions for Returns */}
                <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Conditions for Returns</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">To be eligible for a return:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Refunds are processed within 2–3 business days after inspection.</li>
                    <li>
                        The following goods cannot be returned:
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Customized or personalized goods.</li>
                            <li>Goods that deteriorate quickly or are expired.</li>
                            <li>Unsealed goods unsuitable for return due to hygiene reasons.</li>
                            <li>Goods inseparably mixed with other items after delivery.</li>
                        </ul>
                    </li>
                </ul>
                <p className="text-gray-700 mb-4 leading-relaxed">
                    We reserve the right to refuse returns that don’t meet these conditions. Sale items are non-refundable unless required by law.
                </p>

                {/* Returning Goods */}
                <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Returning Goods</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                    You are responsible for the cost and risk of returning goods. Since this is a digital product, returns generally do not apply.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                    We recommend using an insured and trackable mail service. Refunds require proof of return delivery.
                </p>

                {/* Gifts */}
                <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Gifts</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                    If marked as a gift, you’ll receive a gift credit. Otherwise, refunds go to the original purchaser.
                </p>

                {/* Contact */}
                <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">Questions about this policy?</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>📧 Email: civildigitalstore@gmail.com</li>
                    <li>📞 Phone: 8807423228</li>
                </ul>
            </div>
        </div>
    );
};

export default ReturnPolicy;