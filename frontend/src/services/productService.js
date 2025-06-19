const API_URL = 'http://localhost:80/api';

export const productService = {
    // Obtener todos los productos
    getAllProducts: async () => {
        try {
            const response = await fetch(`${API_URL}/products`);
            if (!response.ok) throw new Error('Error al obtener productos');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // Obtener producto por ID
    getProductById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/products/${id}`);
            if (!response.ok) throw new Error('Error al obtener el producto');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // Obtener productos por categoría
    getProductsByCategory: async (category) => {
        try {
            const response = await fetch(`${API_URL}/products/category/${category}`);
            if (!response.ok) throw new Error('Error al obtener productos por categoría');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
};
