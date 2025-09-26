import React, { useState } from 'react';
import { Calendar, Eye, Edit, Trash2, Plus, X, ExternalLink, Globe, Monitor, Smartphone } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  description: string;
  desktopImageUrl: string;
  mobileImageUrl: string;
  linkUrl: string;
  ctaButtonText: string;
  startDate: string;
  endDate: string;
  position: string;
  bannerType: string;
  priority: number;
  status: string;
}

const BannerManagement: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: '1',
      title: 'New Year Software Sale',
      description: 'Save up to 50% on all premium software licenses',
      desktopImageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&h=400&fit=crop',
      mobileImageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&h=600&fit=crop',
      linkUrl: 'https://example.com/sale',
      ctaButtonText: 'Shop Now',
      startDate: '2025-09-21',
      endDate: '2025-09-28',
      position: 'Home',
      bannerType: 'FESTIVAL',
      priority: 10,
      status: 'ACTIVE'
    },
    {
      id: '2',
      title: 'Flash Sale - 24 Hours Only',
      description: 'Adobe Creative Cloud at unbeatable prices',
      desktopImageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
      mobileImageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop',
      linkUrl: 'https://example.com/flash-sale',
      ctaButtonText: 'Get Deal',
      startDate: '2025-09-21',
      endDate: '2025-09-22',
      position: 'Both',
      bannerType: 'FLASH SALE',
      priority: 8,
      status: 'INACTIVE'
    },
    {
      id: '3',
      title: 'Professional CAD Software',
      description: 'AutoCAD 2025 - The industry standard for design professionals',
      desktopImageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=400&fit=crop',
      mobileImageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=600&fit=crop',
      linkUrl: 'https://example.com/cad-software',
      ctaButtonText: 'Learn More',
      startDate: '2025-09-21',
      endDate: '2025-10-05',
      position: 'Product',
      bannerType: 'NORMAL',
      priority: 5,
      status: 'ACTIVE'
    }
  ]);

  const [formData, setFormData] = useState<Partial<Banner>>({
    title: '',
    description: '',
    desktopImageUrl: '',
    mobileImageUrl: '',
    linkUrl: '',
    ctaButtonText: 'Shop Now',
    startDate: '',
    endDate: '',
    position: 'Home Page Only',
    bannerType: 'Normal',
    priority: 1,
    status: 'Active'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      desktopImageUrl: '',
      mobileImageUrl: '',
      linkUrl: '',
      ctaButtonText: 'Shop Now',
      startDate: '',
      endDate: '',
      position: 'Home Page Only',
      bannerType: 'Normal',
      priority: 1,
      status: 'Active'
    });
    setEditingBanner(null);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields (Title, Start Date, and End Date)');
      return;
    }
    
    if (editingBanner) {
      setBanners(prev => prev.map(banner => 
        banner.id === editingBanner.id 
          ? { ...banner, ...formData as Banner }
          : banner
      ));
    } else {
      const newBanner: Banner = {
        ...formData as Banner,
        id: Date.now().toString()
      };
      setBanners(prev => [...prev, newBanner]);
    }
    
    setShowCreateForm(false);
    resetForm();
  };

  const handleEdit = (banner: Banner) => {
    setFormData(banner);
    setEditingBanner(banner);
    setShowCreateForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      setBanners(prev => prev.filter(banner => banner.id !== id));
    }
  };

  const getBannerTypeColor = (type: string) => {
    switch (type.toUpperCase()) {
      case 'FESTIVAL': return 'bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold';
      case 'FLASH SALE': return 'bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold';
      case 'NORMAL': return 'bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold';
      case 'SEASONAL': return 'bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold';
      default: return 'bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-semibold';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACTIVE': return 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold border border-green-200';
      case 'INACTIVE': return 'bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold border border-red-200';
      case 'SCHEDULED': return 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold border border-gray-200';
    }
  };

  const getPositionIcon = (position: string) => {
    switch (position) {
      case 'Home':
      case 'Home Page Only': 
        return <Monitor size={14} className="inline" />;
      case 'Product':
      case 'Product Page': 
        return <Globe size={14} className="inline" />;
      case 'Both': 
        return <><Monitor size={14} className="inline mr-1" /><Globe size={14} className="inline" /></>;
      default: 
        return <Monitor size={14} className="inline" />;
    }
  };

  if (showCreateForm) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h1 className="text-3xl font-bold text-gray-900">
                {editingBanner ? 'Edit Banner' : 'Create New Banner'}
              </h1>
              <button
                onClick={() => { setShowCreateForm(false); resetForm(); }}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Banner Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleInputChange}
                      placeholder="Enter banner title"
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
                    <textarea
                      name="description"
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      placeholder="Enter banner description (optional)"
                      rows={3}
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Desktop Image URL
                    </label>
                    <input
                      type="url"
                      name="desktopImageUrl"
                      value={formData.desktopImageUrl || ''}
                      onChange={handleInputChange}
                      placeholder="https://example.com/desktop-banner.jpg"
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Mobile Image URL
                    </label>
                    <input
                      type="url"
                      name="mobileImageUrl"
                      value={formData.mobileImageUrl || ''}
                      onChange={handleInputChange}
                      placeholder="https://example.com/mobile-banner.jpg"
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Link URL</label>
                    <input
                      type="url"
                      name="linkUrl"
                      value={formData.linkUrl || ''}
                      onChange={handleInputChange}
                      placeholder="https://example.com/landing-page"
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">CTA Button Text</label>
                    <input
                      type="text"
                      name="ctaButtonText"
                      value={formData.ctaButtonText || ''}
                      onChange={handleInputChange}
                      placeholder="Shop Now"
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate || ''}
                        onChange={handleInputChange}
                        className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate || ''}
                        onChange={handleInputChange}
                        className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Position</label>
                      <select
                        name="position"
                        value={formData.position || ''}
                        onChange={handleInputChange}
                        className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none transition-colors"
                      >
                        <option value="Home Page Only">Home Page Only</option>
                        <option value="Product Page">Product Page</option>
                        <option value="Both">Both</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Banner Type</label>
                      <select
                        name="bannerType"
                        value={formData.bannerType || ''}
                        onChange={handleInputChange}
                        className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none transition-colors"
                      >
                        <option value="Normal">Normal</option>
                        <option value="Festival">Festival</option>
                        <option value="Flash Sale">Flash Sale</option>
                        <option value="Seasonal">Seasonal</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Priority (1-10)</label>
                      <input
                        type="number"
                        name="priority"
                        value={formData.priority || 1}
                        onChange={handleInputChange}
                        min="1"
                        max="10"
                        className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Status</label>
                      <select
                        name="status"
                        value={formData.status || ''}
                        onChange={handleInputChange}
                        className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none transition-colors"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Scheduled">Scheduled</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Preview Section */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <Eye size={20} />
                      Live Preview
                    </h3>
                    
                    {/* Desktop Preview */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Monitor size={16} className="text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Desktop View</span>
                      </div>
                      <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-100">
                        {formData.desktopImageUrl ? (
                          <img 
                            src={formData.desktopImageUrl} 
                            alt="Desktop preview" 
                            className="w-full h-32 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzUgNzVMMTUwIDkwTDE2NSA3NUwxODAgOTBMMTk1IDc1IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxjaXJjbGUgY3g9IjEyMCIgY3k9IjYwIiByPSI4IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K';
                            }}
                          />
                        ) : (
                          <div className="w-full h-32 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                              <Monitor size={32} className="mx-auto mb-2" />
                              <p className="text-sm">Desktop Image Preview</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mobile Preview */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Smartphone size={16} className="text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Mobile View</span>
                      </div>
                      <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-100 max-w-xs mx-auto">
                        {formData.mobileImageUrl ? (
                          <img 
                            src={formData.mobileImageUrl} 
                            alt="Mobile preview" 
                            className="w-full h-40 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NSAxNTBMMTAwIDE2NUwxMTUgMTUwTDEzMCAxNjVMMTQ1IDE1MCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8Y2lyY2xlIGN4PSI3MCIgY3k9IjEzNSIgcj0iOCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KPC9zdmc+Cg==';
                            }}
                          />
                        ) : (
                          <div className="w-full h-40 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                              <Smartphone size={32} className="mx-auto mb-2" />
                              <p className="text-sm">Mobile Image Preview</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Details Preview */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <h4 className="font-semibold text-gray-700 mb-3">Banner Details:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex">
                          <span className="font-medium w-20">Title:</span>
                          <span className="text-gray-600">{formData.title || 'Not specified'}</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium w-20">Description:</span>
                          <span className="text-gray-600 flex-1">{formData.description || 'Not specified'}</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium w-20">CTA:</span>
                          <span className="text-gray-600">{formData.ctaButtonText || 'Shop Now'}</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium w-20">Position:</span>
                          <span className="text-gray-600">{formData.position || 'Home Page Only'}</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium w-20">Type:</span>
                          <span className="text-gray-600">{formData.bannerType || 'Normal'}</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium w-20">Priority:</span>
                          <span className="text-gray-600">{formData.priority || 1}/10</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium w-20">Status:</span>
                          <span className="text-gray-600">{formData.status || 'Active'}</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium w-20">Duration:</span>
                          <span className="text-gray-600">
                            {formData.startDate && formData.endDate 
                              ? `${formData.startDate} to ${formData.endDate}` 
                              : 'Not specified'
                            }
                          </span>
                        </div>
                        {formData.linkUrl && (
                          <div className="flex">
                            <span className="font-medium w-20">Link:</span>
                            <span className="text-blue-600 break-all">{formData.linkUrl}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 mt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowCreateForm(false); resetForm(); }}
                  className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingBanner ? 'Update Banner' : 'Create Banner'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Banner Management</h1>
              <p className="text-gray-600 mt-2">Create and manage promotional banners for your store</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              <Plus size={20} />
              Add Banner
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {banners.map((banner) => (
                <div key={banner.id} className="bg-white rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Images Section */}
                    <div className="lg:col-span-1 p-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Monitor size={16} className="text-gray-600" />
                            <span className="text-sm font-medium text-gray-600">Desktop</span>
                          </div>
                          <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                            <img 
                              src={banner.desktopImageUrl} 
                              alt={`${banner.title} - Desktop`}
                              className="w-full h-24 object-cover hover:scale-105 transition-transform duration-200"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden w-full h-24 flex items-center justify-center bg-gray-100 text-gray-400">
                              <div className="text-center">
                                <Monitor size={20} className="mx-auto mb-1" />
                                <p className="text-xs">Image not found</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Smartphone size={16} className="text-gray-600" />
                            <span className="text-sm font-medium text-gray-600">Mobile</span>
                          </div>
                          <div className="border-2 border-gray-200 rounded-lg overflow-hidden w-32 mx-auto bg-gray-50">
                            <img 
                              src={banner.mobileImageUrl} 
                              alt={`${banner.title} - Mobile`}
                              className="w-full h-20 object-cover hover:scale-105 transition-transform duration-200"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden w-full h-20 flex items-center justify-center bg-gray-100 text-gray-400">
                              <div className="text-center">
                                <Smartphone size={16} className="mx-auto mb-1" />
                                <p className="text-xs">Image not found</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-2 p-6">
                      <div className="flex items-start justify-between h-full">
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                              <h3 className="text-xl font-bold text-gray-900">{banner.title}</h3>
                              <span className={getBannerTypeColor(banner.bannerType)}>
                                {banner.bannerType}
                              </span>
                              <span className={getStatusColor(banner.status)}>
                                {banner.status}
                              </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-4">{banner.description}</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-gray-500" />
                                <span className="font-medium text-gray-700">Duration:</span>
                                <span className="text-gray-600">{banner.startDate} - {banner.endDate}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {getPositionIcon(banner.position)}
                                <span className="font-medium text-gray-700">Position:</span>
                                <span className="text-gray-600">{banner.position}</span>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                </span>
                                <span className="font-medium text-gray-700">Priority:</span>
                                <span className="text-gray-600">{banner.priority}/10</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <ExternalLink size={16} className="text-gray-500" />
                                <span className="font-medium text-gray-700">CTA:</span>
                                <span className="text-gray-600">{banner.ctaButtonText}</span>
                              </div>
                            </div>
                          </div>

                          {banner.linkUrl && (
                            <div className="flex items-center gap-2 text-sm pt-2 border-t border-gray-100">
                              <Globe size={16} className="text-gray-500" />
                              <span className="font-medium text-gray-700">Link:</span>
                              <a 
                                href={banner.linkUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline truncate max-w-xs"
                              >
                                {banner.linkUrl}
                              </a>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 ml-6">
                          <button
                            onClick={() => banner.linkUrl && window.open(banner.linkUrl, '_blank')}
                            className="p-2 text-gray-500 hover:text-blue-600 transition-colors border border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            title={banner.linkUrl ? "Preview" : "No link available"}
                            disabled={!banner.linkUrl}
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleEdit(banner)}
                            className="p-2 text-gray-500 hover:text-green-600 transition-colors border border-gray-300 rounded-lg hover:border-green-300 hover:bg-green-50"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(banner.id)}
                            className="p-2 text-gray-500 hover:text-red-600 transition-colors border border-gray-300 rounded-lg hover:border-red-300 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {banners.length === 0 && (
              <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <div className="max-w-sm mx-auto">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No banners found</h3>
                  <p className="text-gray-500 mb-6">Get started by creating your first promotional banner</p>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                  >
                    Create Your First Banner
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerManagement;