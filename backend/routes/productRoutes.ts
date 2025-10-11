import express from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getCategories,
    getCompanies,
    getBrands,
    getProductsByName,
    getProductsByCategory,
    getProductsByCompany,
    getProductsWithFilters,
    getCategoriesWithCount,
    getCompaniesWithCount
} from '../controllers/productController';

const router = express.Router();

// CRUD operations
router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// Filter lists (should come before parameterized routes)
router.get('/filters/categories', getCategories);
router.get('/filters/companies', getCompanies);
router.get('/filters/brands', getBrands);
router.get('/filters/categories-count', getCategoriesWithCount);
router.get('/filters/companies-count', getCompaniesWithCount);

// Filtered product queries
router.get('/filter/name', getProductsByName);
router.get('/filter/category/:category', getProductsByCategory);
router.get('/filter/company/:company', getProductsByCompany);
router.get('/filter/advanced', getProductsWithFilters);

export default router;