const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Función para probar la conexión
const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Base de datos conectada exitosamente!');
        const result = await client.query('SELECT NOW()');
        console.log('Hora del servidor:', result.rows[0].now);
        client.release();
        return true;
    } catch (err) {
        console.error('Error de conexión a la base de datos:', err.message);
        return false;
    }
};

// Ejecutar prueba de conexión inicial
testConnection();

// Exportamos el pool directamente para mantener compatibilidad con el código existente
module.exports = pool;