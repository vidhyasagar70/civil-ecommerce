import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaPinterestP,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaTwitter,
    FaPhoneAlt,
    FaClock,
    FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#0b1a36] text-white font-light">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-gray-700 text-center"> {[{ title: "Free Digital Shipping", desc: "5-10 Min Instant Delivery" }, { title: "Easy & Fast Exchange", desc: "7 Days Free Exchange Policy" }, { title: "24/7 Customer Support", desc: "Online Help By Our Agents" }, { title: "100% Secure Payments", desc: "UPI / Internet Banking / Cards" },].map((item, i) => (<div key={i}> <p className="font-semibold text-lg tracking-wide">{item.title}</p> <p className="text-sm text-gray-400 mt-1">{item.desc}</p> </div>))} </div>
            {/* ===== Hero Section (keep as it is) ===== */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 py-12 px-6 border-b border-gray-700">
                {/* Company Description */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 text-black font-bold rounded">
                            C
                        </div>
                        <h2 className="text-lg font-semibold">
                            CIVIL{" "}
                            <span className="block text-sm font-normal">DigitalStore</span>
                        </h2>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Civil DigitalStore is a user-friendly website offering a vast
                        selection of civil engineering resources, from software to
                        educational materials. A valuable platform for professionals and
                        students alike.
                    </p>

                </div>

                {/* Our Services */}
                <div>
                    <h3 className="font-semibold text-blue-400 mb-4 tracking-wide">
                        OUR SERVICES
                    </h3>
                    <ul className="space-y-2 text-gray-300 hover:text-white transition">
                        <li>
                            <Link to="/advertising">Advertising</Link>
                        </li>
                        <li>
                            <Link to="/careers">Careers</Link>
                        </li>
                        <li>
                            <Link to="/permissions">Permissions</Link>
                        </li>
                        <li>
                            <Link to="/ShippingPolicy">Shipping & Delivery Policy</Link>
                        </li>
                    </ul>
                </div>

                {/* Policies */}
                {/* Policies */}
                <div>
                    <h3 className="font-semibold text-blue-400 mb-4 tracking-wide">
                        CUSTOMER POLICIES
                    </h3>
                    <ul className="space-y-2 text-gray-300 hover:text-white transition">
                        <li>
                            <Link to="/policies/terms">Terms and Conditions</Link>
                        </li>
                        <li>
                            <Link to="/support/return">Return and Refund Policy</Link>
                        </li>
                        <li>
                            <Link to="/policies/disclaimer">Disclaimer</Link>
                        </li>

                    </ul>
                </div>



                {/* Software */}
                <div>
                    <h3 className="font-semibold text-blue-400 mb-4 tracking-wide">
                        SOFTWARE
                    </h3>
                    <ul className="space-y-2 text-gray-300 hover:text-white transition">
                        <li>
                            <Link to="/software?category=CAD">AutoCAD</Link>
                        </li>
                        <li>
                            <Link to="/software?category=Lumion">Lumion</Link>
                        </li>
                        <li>
                            <Link to="/software?category=MS Office">MS Office</Link>
                        </li>
                        <li>
                            <Link to="/software?category=SketchUp">SketchUp</Link>
                        </li>
                        <li>
                            <Link to="/software?category=Tekla">Tekla</Link>
                        </li>
                        <li>
                            <Link to="/software?category=Revit">Revit</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-blue-400 mb-4 tracking-wide">
                        DOWNLOAD APP
                    </h3>
                    <h4 className="space-y-2 text-gray-300 hover:text-white transition mb-2">
                        Get it on Google Play Store
                    </h4>
                    <a
                        href="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                    >
                        <img
                            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                            alt="Get it on Google Play"
                            className="h-30 space-y-2 md:pr-6  "
                        />
                    </a>
                </div>
            </div>

            {/* ===== Contact + Social Icons (replaced payment row) ===== */}
            <div className="max-w-7xl mx-auto px-6 py-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Contact Info */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-8 text-sm text-gray-300">
                    <p className="flex items-center gap-2 border-b md:border-b-0 md:border-r border-gray-600 pb-2 md:pb-0 md:pr-6">
                        <FaPhoneAlt className="text-blue-400" /> +91 88074 23228
                    </p>
                    <p className="flex items-center gap-2 border-b md:border-b-0 md:border-r border-gray-600 pb-2 md:pb-0 md:pr-6">
                        <FaEnvelope className="text-blue-400" /> admin@civildigitalstore.com
                    </p>
                    <p className="flex items-center gap-2">
                        <FaClock className="text-blue-400" /> 24x7 Service Available in
                        India
                    </p>
                </div>

                {/* Social Icons instead of Payments */}
                <div className="flex space-x-3">
                    {[
                        {
                            href: "https://www.facebook.com/civildigitalstore",
                            icon: FaFacebookF,
                            color: "hover:bg-blue-500",
                        },
                        {
                            href: "https://in.pinterest.com/civildigitalstore/",
                            icon: FaPinterestP,
                            color: "hover:bg-red-500",
                        },
                        {
                            href: "https://www.instagram.com/civildigitalstore/",
                            icon: FaInstagram,
                            color: "hover:bg-pink-500",
                        },
                        {
                            href: "https://www.linkedin.com/in/civil-digitalstore-907769287/",
                            icon: FaLinkedinIn,
                            color: "hover:bg-blue-400",
                        },
                        {
                            href: "https://www.youtube.com/@CivilDigitalStore",
                            icon: FaYoutube,
                            color: "hover:bg-red-600",
                        },
                        {
                            href: "https://x.com/cDigitalstore",
                            icon: FaTwitter,
                            color: "hover:bg-sky-400",
                        },
                    ].map(({ href, icon: Icon, color }, i) => (
                        <a
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 transition-colors ${color}`}
                        >
                            <Icon className="w-4 h-4" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-800">
                © 2024{" "}
                <span className="font-semibold text-gray-300">Webforest Digital</span>.
                All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
