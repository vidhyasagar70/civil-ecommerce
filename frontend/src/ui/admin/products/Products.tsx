import React, { useEffect, useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, List, Grid3X3, X } from 'lucide-react';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, useCategories, useCompanies } from "../../../api/productApi";
import type { Product } from '../../../types/index';
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

  const products = productsData?.products || [];
  
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
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
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
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
          >
            <option>All Companies</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>

          {(searchTerm || selectedCategory !== 'All Categories' || selectedCompany !== 'All Companies') && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
              <span>Clear filters</span>
            </button>
          )}
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
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
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

      {isLoading && <div className="text-center py-8">Loading products...</div>}
      {error && <div className="text-center py-8 text-red-500">Error loading products</div>}

      {!isLoading && !error && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Price (1-year)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product: Product) => ( // ✅ Added explicit type here
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="w-full h-full flex items-center justify-center hidden">
                            <span className="text-lg">🎨</span>
                          </div>
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
                    <td className="py-4 px-4 font-medium">₹{product.price1.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1 text-gray-500 hover:text-blue-600"
                          onClick={() => {
                            setViewingProduct(product);
                            setIsViewModalOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-500 hover:text-green-600"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-500 hover:text-red-600"
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
  );
};

export default Products;