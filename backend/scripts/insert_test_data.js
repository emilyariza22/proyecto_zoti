const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'zoti',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

async function createTablesIfNotExist() {
  try {
    // Crear tabla users si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Tabla users creada o ya existía');

    // Crear tabla purchase_requests si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS purchase_requests (
        id SERIAL PRIMARY KEY,
        requested_by INTEGER REFERENCES users(id),
        department VARCHAR(100),
        status VARCHAR(50) DEFAULT 'pending',
        total DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        notes TEXT
      )
    `);
    console.log('Tabla purchase_requests creada o ya existía');

    // Verificar si ya existen datos de prueba
    const result = await pool.query('SELECT COUNT(*) FROM purchase_requests');
    if (parseInt(result.rows[0].count) > 0) {
      console.log('Ya existen solicitudes de compra. No se insertarán datos de prueba.');
      return;
    }

    // Crear usuario administrador si no existe
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', ['admin@example.com']);
    let adminUserId;
    
    if (userCheck.rows.length === 0) {
      const userInsert = await pool.query(`
        INSERT INTO users (name, email, password, role) 
        VALUES ('Admin User', 'admin@example.com', '$2a$10$X7o4C5U7D1DB8MuYIjx3e.IfGKFcxVGo/DXBT5xM9V8wY9CALtAdy', 'admin')
        RETURNING id
      `);
      adminUserId = userInsert.rows[0].id;
      console.log('Usuario administrador creado con ID:', adminUserId);
    } else {
      adminUserId = userCheck.rows[0].id;
      console.log('Usuario administrador ya existe con ID:', adminUserId);
    }

    // Insertar datos de prueba
    const statuses = ['pending', 'approved', 'rejected'];
    const departments = ['IT', 'Marketing', 'Sales', 'HR', 'Finance'];
    
    for (let i = 1; i <= 15; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const department = departments[Math.floor(Math.random() * departments.length)];
      const total = (Math.random() * 10000).toFixed(2);
      
      await pool.query(`
        INSERT INTO purchase_requests 
        (requested_by, department, status, total, notes, created_at) 
        VALUES 
        ($1, $2, $3, $4, $5, $6)
      `, [
        adminUserId, 
        department, 
        status, 
        total, 
        `Purchase request #${i} for ${department} department`, 
        new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)) // Fecha aleatoria en los últimos 30 días
      ]);
    }

    console.log('Datos de prueba insertados correctamente');
  } catch (err) {
    console.error('Error al crear tablas o insertar datos:', err);
  } finally {
    pool.end();
  }
}

createTablesIfNotExist();
