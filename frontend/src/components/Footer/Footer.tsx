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
import { useAdminTheme } from "../../contexts/AdminThemeContext";
import logo from "../../assets/logo.png";

const Footer = () => {
    const { colors } = useAdminTheme();

    return (
        <footer
            className="font-light transition-colors duration-200"
            style={{
                backgroundColor: colors.background.primary,
                color: colors.text.primary
            }}
        >
            <div
                className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-b text-center transition-colors duration-200"
                style={{ borderColor: colors.border.primary }}
            >
                {[
                    { title: "Free Digital Shipping", desc: "5-10 Min Instant Delivery" },
                    { title: "24/7 Customer Support", desc: "Online Help By Our Agents" },
                    { title: "100% Secure Payments", desc: "UPI / Internet Banking / Cards" }
                ].map((item, i) => (
                    <div key={i}>
                        <p
                            className="font-semibold text-lg tracking-wide transition-colors duration-200"
                            style={{ color: colors.text.primary }}
                        >
                            {item.title}
                        </p>
                        <p
                            className="text-sm mt-1 transition-colors duration-200"
                            style={{ color: colors.text.secondary }}
                        >
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
            {/* ===== Hero Section (keep as it is) ===== */}
            <div
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 py-12 px-6 border-b transition-colors duration-200"
                style={{ borderColor: colors.border.primary }}
            >
                {/* Company Description */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src={logo}
                            alt="Civil Digital Store Logo"
                            className="h-10 w-auto object-contain"
                        />
                       
                    </div>
                    <p
                        className="text-sm leading-relaxed transition-colors duration-200"
                        style={{ color: colors.text.secondary }}
                    >
                        Civil DigitalStore is a user-friendly website offering a vast
                        selection of civil engineering resources, from software to
                        educational materials. A valuable platform for professionals and
                        students alike.
                    </p>

                </div>

                {/* Our Services */}
                <div>
                    <h3
                        className="font-semibold mb-4 tracking-wide transition-colors duration-200"
                        style={{ color: colors.interactive.primary }}
                    >
                        OUR SERVICES
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/advertising"
                                className="transition-colors duration-200 hover:underline"
                                style={{ color: colors.text.secondary }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = colors.text.primary;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = colors.text.secondary;
                                }}
                            >
                                Advertising
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/careers"
                                className="transition-colors duration-200 hover:underline"
                                style={{ color: colors.text.secondary }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = colors.text.primary;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = colors.text.secondary;
                                }}
                            >
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/permissions"
                                className="transition-colors duration-200 hover:underline"
                                style={{ color: colors.text.secondary }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = colors.text.primary;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = colors.text.secondary;
                                }}
                            >
                                Permissions
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/shipping-policy"
                                className="transition-colors duration-200 hover:underline"
                                style={{ color: colors.text.secondary }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = colors.text.primary;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = colors.text.secondary;
                                }}
                            >
                                Shipping & Delivery Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Policies */}
                <div>
                    <h3
                        className="font-semibold mb-4 tracking-wide transition-colors duration-200"
                        style={{ color: colors.interactive.primary }}
                    >
                        CUSTOMER POLICIES
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/terms-and-conditions"
                                className="transition-colors duration-200 hover:underline"
                                style={{ color: colors.text.secondary }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = colors.text.primary;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = colors.text.secondary;
                                }}
                            >
                                Terms and Conditions
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/return-policy"
                                className="transition-colors duration-200 hover:underline"
                                style={{ color: colors.text.secondary }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = colors.text.primary;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = colors.text.secondary;
                                }}
                            >
                                Return and Refund Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/disclaimer"
                                className="transition-colors duration-200 hover:underline"
                                style={{ color: colors.text.secondary }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = colors.text.primary;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = colors.text.secondary;
                                }}
                            >
                                Disclaimer
                            </Link>
                        </li>
                    </ul>
                </div>



                {/* Software */}
                <div>
                    <h3
                        className="font-semibold mb-4 tracking-wide transition-colors duration-200"
                        style={{ color: colors.interactive.primary }}
                    >
                        SOFTWARE
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/software?category=CAD Software"
                                className="transition-colors duration-200 hover:underline"
                                style={{ color: colors.text.secondary }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = colors.text.primary;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = colors.text.secondary;
                                }}
                            >
                                AutoCAD
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/software?category=Lumion"
                                className="transition-colors duration-200 hover:underline"
                                style={{ color: colors.text.secondary }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = colors.text.primary;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = colors.text.secondary;
                                }}
                            >
                                Lumion
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/software?category=MS Office"
                                className="transition-colors duration-200 hover:underline"
                                style={{ color: colors.text.secondary }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = colors.text.primary;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = colors.text.secondary;
                                }}
                            >
                                MS Office
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/software?category=SketchUp"
                                className="transition-colors duration-200 hover:underline"
                                style={{ color: colors.text.secondary }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = colors.text.primary;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = colors.text.secondary;
                                }}
                            >
                                SketchUp
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/software?category=Tekla"
                                className="transition-colors duration-200 hover:underline"
                                style={{ color: colors.text.secondary }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = colors.text.primary;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = colors.text.secondary;
                                }}
                            >
                                Tekla
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/software?category=Revit"
                                className="transition-colors duration-200 hover:underline"
                                style={{ color: colors.text.secondary }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = colors.text.primary;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = colors.text.secondary;
                                }}
                            >
                                Revit
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3
                        className="font-semibold mb-4 tracking-wide transition-colors duration-200"
                        style={{ color: colors.interactive.primary }}
                    >
                        DOWNLOAD APP
                    </h3>
                    <h4
                        className="space-y-2 mb-2 transition-colors duration-200"
                        style={{ color: colors.text.secondary }}
                    >
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
                            className="h-30 space-y-2 md:pr-6"
                        />
                    </a>
                </div>
            </div>

            {/* ===== Contact + Social Icons (replaced payment row) ===== */}
            <div
                className="max-w-7xl mx-auto px-6 py-6 border-t flex flex-col md:flex-row justify-between items-center gap-6 transition-colors duration-200"
                style={{ borderColor: colors.border.primary }}
            >
                {/* Contact Info */}
                <div
                    className="flex flex-col md:flex-row md:items-center md:gap-8 text-sm transition-colors duration-200"
                    style={{ color: colors.text.secondary }}
                >
                    <p
                        className="flex items-center gap-2 border-b md:border-b-0 md:border-r pb-2 md:pb-0 md:pr-6 transition-colors duration-200"
                        style={{ borderColor: colors.border.secondary }}
                    >
                        <FaPhoneAlt style={{ color: colors.interactive.primary }} /> +91 88074 23228
                    </p>
                    <p
                        className="flex items-center gap-2 border-b md:border-b-0 md:border-r pb-2 md:pb-0 md:pr-6 transition-colors duration-200"
                        style={{ borderColor: colors.border.secondary }}
                    >
                        <FaEnvelope style={{ color: colors.interactive.primary }} /> admin@civildigitalstore.com
                    </p>
                    <p className="flex items-center gap-2">
                        <FaClock style={{ color: colors.interactive.primary }} /> 24x7 Service Available in
                        India
                    </p>
                </div>

                {/* Social Icons instead of Payments */}
                <div className="flex space-x-3">
                    {[
                        {
                            href: "https://www.facebook.com/civildigitalstore",
                            icon: FaFacebookF,
                            hoverColor: "#3b82f6",
                        },
                        {
                            href: "https://in.pinterest.com/civildigitalstore/",
                            icon: FaPinterestP,
                            hoverColor: "#ef4444",
                        },
                        {
                            href: "https://www.instagram.com/civildigitalstore/",
                            icon: FaInstagram,
                            hoverColor: "#ec4899",
                        },
                        {
                            href: "https://www.linkedin.com/in/civil-digitalstore-907769287/",
                            icon: FaLinkedinIn,
                            hoverColor: "#60a5fa",
                        },
                        {
                            href: "https://www.youtube.com/@CivilDigitalStore",
                            icon: FaYoutube,
                            hoverColor: "#dc2626",
                        },
                        {
                            href: "https://x.com/cDigitalstore",
                            icon: FaTwitter,
                            hoverColor: "#0ea5e9",
                        },
                    ].map(({ href, icon: Icon, hoverColor }, i) => (
                        <a
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200"
                            style={{
                                backgroundColor: colors.background.secondary,
                                color: colors.text.primary
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = hoverColor;
                                e.currentTarget.style.color = colors.background.primary;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = colors.background.secondary;
                                e.currentTarget.style.color = colors.text.primary;
                            }}
                        >
                            <Icon className="w-4 h-4" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Copyright */}
            <div
                className="text-center text-xs py-4 border-t transition-colors duration-200"
                style={{
                    color: colors.text.secondary,
                    borderColor: colors.border.secondary
                }}
            >
                © {" "}
                <span
                    className="font-semibold transition-colors duration-200"
                    style={{ color: colors.text.primary }}
                >
                    Civil Digital Store
                </span>.
                All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
