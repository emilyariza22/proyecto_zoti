const Product = require('../models/productModel');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.getProductById(id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
        }
    },

    getProductsByCategory: async (req, res) => {
        try {
            const { category } = req.params;
            const products = await Product.getProductsByCategory(category);
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos por categoría', error: error.message });
        }
    }
};

module.exports = productController;
