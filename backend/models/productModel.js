const pool = require('../utils/db');

const Product = {
    getAllProducts: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM products');
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },

    getProductsByCategory: async (category) => {
        try {
            const [rows] = await pool.query('SELECT * FROM products WHERE category = ?', [category]);
            return rows;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Product;
