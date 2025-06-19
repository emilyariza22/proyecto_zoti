const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Obtener un producto por ID
router.get('/:id', productController.getProductById);

// Obtener productos por categoría
router.get('/category/:category', productController.getProductsByCategory);

module.exports = router;
