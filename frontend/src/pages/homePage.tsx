import { type FC, useState, useRef, useEffect } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { useUser } from "../hooks/useUser";

import logo from "../assets/logo.png";
import defaultProfile from "../assets/defaultprofile.png";
import { clearAuth } from "../ui/utils/auth";




const HomePage: FC = () => {
  const user = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm px-10 py-4 flex justify-between items-center">
        {/* inset-inline-start: Logo and menu */}
        <div className="flex items-center gap-10">
<img
  src={logo}
  alt="Civil Logo"
  className="h-10 w-auto"
/>
          <nav className="hidden md:flex gap-6 text-gray-700 text-sm font-medium">
            <a href="#">Software Categories</a>
            <a href="#">Companies</a>
            <a href="#">All Software</a>
            <a href="#">Subscriptions</a>
          </nav>
        </div>

        {/* inset-inline-end: Search, Cart, Profile */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-500 absolute top-1/2 left-3 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search software..."
              className="pl-10 pr-4 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Cart */}
          <ShoppingCart className="w-6 h-6 text-gray-600 cursor-pointer" />

          {/* Profile */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
           <img
      src={(user && user.picture) || defaultProfile}
      alt={user?.name || "Guest"}
      className="w-10 h-10 rounded-full border border-gray-200 object-cover"
    />

                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <a
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/logout"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      clearAuth();
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="text-center py-20 px-6 bg-gradient-to-b from-white to-blue-50">
          <span className="inline-block px-4 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
            Civil Engineering Software, Genuine & Instant
          </span>
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Genuine Civil Engineering Software
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Get authentic AutoCAD, Revit, Lumion, Tekla and other professional
            software licenses with instant delivery and lifetime support.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg shadow-md hover:opacity-90">
              Explore Products
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-2xl font-bold text-blue-600">5000+</p>
              <p className="text-sm text-gray-500 mt-1">Happy Engineers</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-2xl font-bold text-green-600">12,500+</p>
              <p className="text-sm text-gray-500 mt-1">Software Delivered</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-2xl font-bold text-purple-600">100%</p>
              <p className="text-sm text-gray-500 mt-1">Secure Transactions</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-2xl font-bold text-yellow-500">4.9/5</p>
              <p className="text-sm text-gray-500 mt-1">Customer Rating</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
