import express from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getCategories,
    getCompanies,
    getBrands
} from '../controllers/productController';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/companies', getCompanies);
router.get('/brands', getBrands);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
