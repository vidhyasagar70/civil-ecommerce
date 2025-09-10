import React, { useState } from 'react';
import { Search, Phone, User, ShoppingCart, Menu, X, Shield, UserCheck, BarChart3, Package, Tag, Building2, Settings as settingsicon, Filter, List, Grid3X3, Plus, Eye, Edit, Trash2, TrendingUp, Users, Package2 } from 'lucide-react';

// Header configuration - easily customizable
const headerConfig = {
  logo: {
    text: "webforest",
    href: "/"
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ],
  contact: {
    phone: "790-355-4767",
    phoneHref: "tel:+17903554767"
  },
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Disclaimer", href: "/disclaimer" }
  ],
  search: {
    placeholder: "Search for"
  },
  auth: {
    customer: { label: "Customer Login", href: "/customer-login" },
    admin: { label: "Admin Login", href: "/admin-login" }
  }
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [viewMode, setViewMode] = useState('list');

  // Sample data
  const sampleProducts = [
    {
      id: 1,
      name: "3ds Max 2024",
      version: "2024.1",
      company: "Autodesk",
      category: "Rendering",
      price: 2399,
      rating: 4.5,
      reviews: 278,
      image: "🎨"
    },
    {
      id: 2,
      name: "Adobe Creative Suite 2024",
      version: "2024",
      company: "Adobe",
      category: "Design Software",
      price: 2399,
      rating: 4.6,
      reviews: 445,
      image: "🎭"
    },
    {
      id: 3,
      name: "ANSYS Workbench",
      version: "2024 R1",
      company: "ANSYS",
      category: "Simulation",
      price: 4999,
      rating: 4.8,
      reviews: 89,
      image: "⚙️"
    },
    {
      id: 4,
      name: "AutoCAD 2024",
      version: "2024.1",
      company: "Autodesk",
      category: "CAD Software",
      price: 1999,
      rating: 4.8,
      reviews: 324,
      image: "📐"
    },
    {
      id: 5,
      name: "ETABS",
      version: "21.0.0",
      company: "Computers and Structures",
      category: "Structural Analysis",
      price: 2999,
      rating: 4.7,
      reviews: 98,
      image: "🏗️"
    }
  ];

  const sampleCategories = [
    { id: 1, name: "CAD Software", products: 4, icon: "📐" },
    { id: 2, name: "BIM Software", products: 1, icon: "🏢" },
    { id: 3, name: "Design Software", products: 3, icon: "🎨" },
    { id: 4, name: "Rendering", products: 2, icon: "🖼️" },
    { id: 5, name: "Simulation", products: 2, icon: "⚙️" },
    { id: 6, name: "Structural Analysis", products: 1, icon: "🏗️" }
  ];

  const sampleCompanies = [
    { id: 1, name: "Autodesk", products: 4 },
    { id: 2, name: "Microsoft", products: 3 },
    { id: 3, name: "Trimble", products: 2 },
    { id: 4, name: "Adobe", products: 2 },
    { id: 5, name: "ANSYS", products: 1 }
  ];

  const sampleOrders = [
    { id: 1001, customer: "John Doe", product: "AutoCAD 2024", amount: 1999, status: "completed", date: "2024-09-10" },
    { id: 1002, customer: "Jane Smith", product: "3ds Max 2024", amount: 2399, status: "pending", date: "2024-09-09" },
    { id: 1003, customer: "Mike Johnson", product: "ANSYS Workbench", amount: 4999, status: "completed", date: "2024-09-08" },
    { id: 1004, customer: "Sarah Wilson", product: "Adobe Creative Suite", amount: 2399, status: "cancelled", date: "2024-09-07" },
    { id: 1005, customer: "Tom Brown", product: "ETABS", amount: 2999, status: "pending", date: "2024-09-06" }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'products', label: 'Products', icon: Package, path: '/products' },
    { id: 'categories', label: 'Categories', icon: Tag, path: '/categories' },
    { id: 'companies', label: 'Companies', icon: Building2, path: '/companies' },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/orders' },
    { id: 'settings', label: 'Settings', icon: settingsicon, path: '/settings' }
  ];

  // Dashboard Component
  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹12,54,300</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5%
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
              <p className="text-sm text-blue-600">10 Categories</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Registered Users</p>
              <p className="text-2xl font-bold text-gray-900">347</p>
              <p className="text-sm text-green-600">Active Today: 89</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">1,286</p>
              <p className="text-sm text-green-600">Today: 23 orders</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Categories</h3>
          <div className="space-y-3">
            {sampleCategories.slice(0, 2).map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium text-gray-900">{category.name}</span>
                </div>
                <span className="text-sm text-gray-500">{category.products} products</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Companies</h3>
          <div className="space-y-3">
            {sampleCompanies.slice(0, 3).map((company) => (
              <div key={company.id} className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{company.name}</span>
                <span className="text-sm text-gray-500">{company.products} products</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Products Component
  const Products = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            {sampleCategories.map((cat) => (
              <option key={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Price (1-year)</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Rating</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">{product.image}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.version}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{product.company}</td>
                  <td className="py-4 px-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium">₹{product.price.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-gray-500">({product.reviews})</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-green-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your e-commerce platform and monitor performance.</p>
          </div>
        </div>
        
        <div className="px-6">
          <nav className="flex space-x-8">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeMenu === item.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="px-6 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

// Main Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAuthDropdown = () => {
    setIsAuthDropdownOpen(!isAuthDropdownOpen);
  };

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
  };

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleNavigation = (href:any ) => {
    console.log('Navigate to:', href);
    
    // Show admin dashboard when admin login is clicked
    if (href === '/admin-login') {
      setShowAdminDashboard(true);
    } else if (href === '/') {
      setShowAdminDashboard(false);
    }
    
    setIsMenuOpen(false);
    setIsAuthDropdownOpen(false);
  };

  // Render the component
  if (showAdminDashboard) {
    return (
      <div>
        {/* Keep the header at the top */}
        <header className="bg-white shadow-sm border-b border-gray-200 w-full">
          {/* Top bar with legal links - Hidden on mobile */}
          <div className="bg-gray-50 border-b border-gray-200 hidden sm:block">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <div className="flex justify-start py-1 sm:py-2">
                <div className="flex flex-wrap gap-2 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                  {headerConfig.legal.map((link, index) => (
                    <React.Fragment key={link.href}>
                      <button
                        onClick={() => handleNavigation(link.href)}
                        className="hover:text-blue-600 transition-colors duration-200 whitespace-nowrap"
                      >
                        {link.label}
                      </button>
                      {index < headerConfig.legal.length - 1 && (
                        <span className="text-gray-400 hidden sm:inline">|</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main header */}
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex items-center justify-between py-2 sm:py-4">
              {/* Logo - Far Left */}
              <div className="flex items-center flex-shrink-0">
                <button
                  onClick={() => handleNavigation(headerConfig.logo.href)}
                  className="flex items-center space-x-1 sm:space-x-2"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-lg">WF</span>
                  </div>
                  <span className="text-lg sm:text-2xl font-bold">
                    <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                      {headerConfig.logo.text}
                    </span>
                  </span>
                </button>
              </div>

              {/* Center section - Admin indicator */}
              <div className="flex-1 flex items-center justify-center">
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium">Admin Panel Active</span>
                </div>
              </div>

              {/* Right side actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAdminDashboard(false)}
                  className="bg-gray-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors"
                >
                  Exit Admin
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Admin Dashboard */}
        <AdminDashboard />
      </div>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 w-full">
      {/* Top bar with legal links - Hidden on mobile */}
      <div className="bg-gray-50 border-b border-gray-200 hidden sm:block">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-start py-1 sm:py-2">
            <div className="flex flex-wrap gap-2 sm:space-x-4 text-xs sm:text-sm text-gray-600">
              {headerConfig.legal.map((link, index) => (
                <React.Fragment key={link.href}>
                  <button
                    onClick={() => handleNavigation(link.href)}
                    className="hover:text-blue-600 transition-colors duration-200 whitespace-nowrap"
                  >
                    {link.label}
                  </button>
                  {index < headerConfig.legal.length - 1 && (
                    <span className="text-gray-400 hidden sm:inline">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-4">
          {/* Logo - Far Left */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => handleNavigation(headerConfig.logo.href)}
              className="flex items-center space-x-1 sm:space-x-2"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">WF</span>
              </div>
              <span className="text-lg sm:text-2xl font-bold">
                <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                  {headerConfig.logo.text}
                </span>
              </span>
            </button>
          </div>

          {/* Center section - Navigation and Search */}
          <div className="flex-1 flex items-center justify-center px-4 lg:px-8">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 mr-4">
              {headerConfig.navigation.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Search Bar - Centered */}
            <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md xl:max-w-lg">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={headerConfig.search.placeholder}
                  className="w-full pl-3 pr-10 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right side actions - Far Right */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Contact - Responsive text */}
            <div className="hidden xl:flex items-center space-x-2 text-gray-700">
              <Phone className="w-4 h-4" />
              <span className="text-sm whitespace-nowrap">Need help? Call us:</span>
              <a
                href={headerConfig.contact.phoneHref}
                className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 whitespace-nowrap"
              >
                {headerConfig.contact.phone}
              </a>
            </div>

            {/* Simplified contact for large screens */}
            <div className="hidden lg:flex xl:hidden items-center space-x-2 text-gray-700">
              <Phone className="w-4 h-4" />
              <a
                href={headerConfig.contact.phoneHref}
                className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm"
              >
                {headerConfig.contact.phone}
              </a>
            </div>

            {/* Auth Dropdown - Desktop */}
            <div className="hidden sm:block relative">
              <button
                onClick={toggleAuthDropdown}
                className="flex items-center space-x-1 lg:space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 px-1 lg:px-2"
              >
                <User className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="text-sm lg:text-base whitespace-nowrap">Sign In</span>
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Auth Dropdown Menu */}
              {isAuthDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => handleNavigation(headerConfig.auth.customer.href)}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>{headerConfig.auth.customer.label}</span>
                  </button>
                  <button
                    onClick={() => handleNavigation(headerConfig.auth.admin.href)}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Shield className="w-4 h-4" />
                    <span>{headerConfig.auth.admin.label}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Cart - Always visible */}
            <button
              onClick={() => handleNavigation('/cart')}
              className="relative flex items-center space-x-1 lg:space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 px-1 lg:px-2"
            >
              <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="hidden sm:inline text-sm lg:text-base whitespace-nowrap">My Cart</span>
              <span className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200 ml-2"
            >
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 sm:px-4 py-2 sm:py-4 space-y-1">
            {/* Mobile search */}
            <div className="relative mb-3 sm:mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={headerConfig.search.placeholder}
                className="w-full pl-4 pr-12 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile navigation */}
            <div className="space-y-1">
              {headerConfig.navigation.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className="block w-full text-left px-3 py-2 sm:py-3 text-base text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Auth Options */}
            <div className="pt-2 border-t border-gray-200">
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigation(headerConfig.auth.customer.href)}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <UserCheck className="w-5 h-5" />
                  <span>{headerConfig.auth.customer.label}</span>
                </button>
                <button
                  onClick={() => handleNavigation(headerConfig.auth.admin.href)}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <Shield className="w-5 h-5" />
                  <span>{headerConfig.auth.admin.label}</span>
                </button>
              </div>
            </div>

            {/* Mobile contact */}
            <div className="px-3 py-2 sm:py-3 border-t border-gray-200 mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 text-gray-700">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">Need help?</span>
                </div>
                <a
                  href={headerConfig.contact.phoneHref}
                  className="font-semibold text-blue-600 hover:text-blue-800 text-sm sm:text-base"
                >
                  {headerConfig.contact.phone}
                </a>
              </div>
            </div>

            {/* Mobile legal links */}
            <div className="pt-2 border-t border-gray-200">
              <div className="flex flex-col space-y-2 sm:flex-row sm:flex-wrap sm:space-y-0 sm:space-x-4">
                {headerConfig.legal.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavigation(link.href)}
                    className="text-left px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close auth dropdown when clicking outside */}
      {isAuthDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsAuthDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;