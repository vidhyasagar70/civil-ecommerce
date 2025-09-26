import React, { useEffect, useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, List, Grid3X3, X, Star, Award, Circle, CheckCircle } from 'lucide-react';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, useCategories, useCompanies } from "../../../api/productApi";
import type { Product } from '../../../api/types/productTypes.ts';
import AddProductModal from './AddProductModal';
import ProductViewModal from './ProductViewModal';
import Swal from 'sweetalert2';

const Products: React.FC = () => {
  const [viewMode, setViewMode] = useState('list');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCompany, setSelectedCompany] = useState('All Companies');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [showBestSellers, setShowBestSellers] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Build query params
  const queryParams = {
    search: debouncedSearch || undefined,
    category: selectedCategory !== 'All Categories' ? selectedCategory : undefined,
    company: selectedCompany !== 'All Companies' ? selectedCompany : undefined,
  };
  const { data: productsData, isLoading, error } = useProducts(queryParams);
  const { data: categories = [] } = useCategories();
  const { data: companies = [] } = useCompanies();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const rawProducts = productsData?.products || [];

  // Apply client-side filtering for new attributes
  const products = rawProducts.filter((product: Product) => {
    // Filter by status
    if (selectedStatus !== 'All Status') {
      const productStatus = product.status || 'active'; // Default to active if no status
      if (productStatus !== selectedStatus) return false;
    }

    // Filter by best sellers
    if (showBestSellers && !product.isBestSeller) return false;

    // Enhanced search that includes new fields
    if (searchTerm && debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      const matchesBasicFields =
        product.name.toLowerCase().includes(searchLower) ||
        product.version.toLowerCase().includes(searchLower) ||
        product.company.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        (product.brand && product.brand.toLowerCase().includes(searchLower)) ||
        (product.shortDescription && product.shortDescription.toLowerCase().includes(searchLower)) ||
        (product.description && product.description.toLowerCase().includes(searchLower));

      const matchesTags = product.tags && product.tags.some(tag =>
        tag.toLowerCase().includes(searchLower)
      );

      if (!matchesBasicFields && !matchesTags) return false;
    }

    return true;
  });

  const handleSaveProduct = (productData: any) => {
    if (editingProduct && editingProduct._id) {
      updateProductMutation.mutate({
        id: editingProduct._id,
        updatedProduct: productData
      });
    } else {
      createProductMutation.mutate(productData);
    }
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDeleteProduct = (id: string, productName: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${productName}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'px-4 py-2 rounded-lg',
        cancelButton: 'px-4 py-2 rounded-lg'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProductMutation.mutate(id);

        Swal.fire({
          title: 'Deleted!',
          text: `"${productName}" has been deleted.`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-xl'
          }
        });
      }
    });
  };


  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedCompany('All Companies');
    setSelectedStatus('All Status');
    setShowBestSellers(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-full sm:w-64 text-white placeholder-gray-400"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 w-full sm:w-48 text-white"
            >
              <option>All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 w-full sm:w-48 text-white"
            >
              <option>All Companies</option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 w-full sm:w-40 text-white"
            >
              <option>All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>

            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={showBestSellers}
                onChange={(e) => setShowBestSellers(e.target.checked)}
                className="rounded border-gray-600 bg-gray-800 text-yellow-500 focus:ring-yellow-500"
              />
              <span className="text-gray-300">Best Sellers Only</span>
            </label>

            {(searchTerm || selectedCategory !== 'All Categories' || selectedCompany !== 'All Companies' || selectedStatus !== 'All Status' || showBestSellers) && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-1 text-gray-400 hover:text-gray-200"
              >
                <X className="w-4 h-4" />
                <span>Clear filters</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center border border-gray-700 rounded-lg">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
            <button
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-yellow-600 font-medium"
              onClick={() => {
                setEditingProduct(null);
                setModalOpen(true);
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {isLoading && <div className="text-center py-8 text-gray-300">Loading products...</div>}
        {error && <div className="text-center py-8 text-red-400">Error loading products</div>}

        {!isLoading && !error && (
          <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700 border-b border-gray-600">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-white">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-white">Company</th>
                    <th className="text-left py-3 px-4 font-medium text-white">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-white">Pricing</th>
                    <th className="text-left py-3 px-4 font-medium text-white">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {products.map((product: Product) => (
                    <tr key={product._id} className="hover:bg-gray-700">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden relative">
                            <img
                              src={product.imageUrl || product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            {product.isBestSeller && (
                              <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                                <Award className="w-3 h-3 text-black" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <div className="font-medium text-white truncate">{product.name}</div>
                              {product.isBestSeller && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500 text-black">
                                  Best Seller
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-400">v{product.version}</div>
                            {product.shortDescription && (
                              <div className="text-xs text-gray-500 truncate mt-1" title={product.shortDescription}>
                                {product.shortDescription}
                              </div>
                            )}
                            {product.rating && (
                              <div className="flex items-center space-x-1 mt-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-300">{product.rating}</span>
                                {product.ratingCount && (
                                  <span className="text-xs text-gray-500">({product.ratingCount})</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white">{product.brand || product.company}</div>
                        {product.company !== product.brand && product.brand && (
                          <div className="text-xs text-gray-400">{product.company}</div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-medium">
                          {product.category}
                        </span>
                        {product.tags && product.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {product.tags.slice(0, 2).map((tag, index) => (
                              <span key={index} className="inline-block bg-gray-600 text-gray-300 text-xs px-1.5 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                            {product.tags.length > 2 && (
                              <span className="text-xs text-gray-500">+{product.tags.length - 2}</span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {/* Show subscription pricing if available, otherwise show legacy pricing */}
                          {product.subscriptionDurations && product.subscriptionDurations.length > 0 ? (
                            <div>
                              <div className="font-medium text-sm text-white">₹{product.subscriptionDurations[0].price?.toLocaleString()}</div>
                              <div className="text-xs text-gray-400">{product.subscriptionDurations[0].duration}</div>
                              {product.subscriptionDurations.length > 1 && (
                                <div className="text-xs text-yellow-400">+{product.subscriptionDurations.length - 1} more</div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <div className="font-medium text-sm text-white">₹{product.price1?.toLocaleString()}</div>
                              <div className="text-xs text-gray-400">1-year</div>
                            </div>
                          )}
                          {product.hasLifetime && product.lifetimePrice && (
                            <div className="text-xs text-green-400">Lifetime: ₹{product.lifetimePrice.toLocaleString()}</div>
                          )}
                          {product.hasMembership && product.membershipPrice && (
                            <div className="text-xs text-purple-400">Membership: ₹{product.membershipPrice.toLocaleString()}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {product.status === 'active' && (
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-xs text-green-400">Active</span>
                            </div>
                          )}
                          {product.status === 'inactive' && (
                            <div className="flex items-center space-x-1">
                              <Circle className="w-4 h-4 text-red-400" />
                              <span className="text-xs text-red-400">Inactive</span>
                            </div>
                          )}
                          {product.status === 'draft' && (
                            <div className="flex items-center space-x-1">
                              <Circle className="w-4 h-4 text-yellow-400" />
                              <span className="text-xs text-yellow-400">Draft</span>
                            </div>
                          )}
                          {!product.status && (
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-xs text-green-400">Active</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-1 text-gray-400 hover:text-yellow-400"
                            onClick={() => {
                              setViewingProduct(product);
                              setIsViewModalOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-gray-400 hover:text-green-400"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-gray-400 hover:text-red-400"
                            onClick={() => product._id && handleDeleteProduct(product._id, product.name)}
                          >
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
        )}

        <AddProductModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
          product={editingProduct}
        />

        <ProductViewModal
          product={viewingProduct}
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setViewingProduct(null);
          }}
        />
      </div>
    </div>
  );
};

export default Products;