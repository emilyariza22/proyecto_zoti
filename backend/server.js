const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet"); // Seguridad extra
const morgan = require("morgan"); // Logger de peticiones
const pool = require("./utils/db");
const authRoutes = require("./routes/authRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const solicitudesRoutes = require("./routes/solicitudesRoutes");
const purchaseRequestRoutes = require("./routes/purchaseRequestRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares
// Desactivar helmet temporalmente para desarrollo
// app.use(helmet()); - Comentado para evitar conflictos con CORS

// Configuración de CORS permisiva para desarrollo
app.use(cors({
  origin: true, // Permitir cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  credentials: true
}));

// Middleware adicional para asegurar que los headers CORS estén configurados correctamente
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use(morgan("dev"));

// Ruta de prueba (conexión a la BD)
app.get('/api/prueba-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users LIMIT 1');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Ruta para obtener todos los usuarios de la tabla users
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/solicitudes", solicitudesRoutes);
app.use("/api/purchase-requests", purchaseRequestRoutes);

// Ruta 404 (por si acceden a una ruta no definida)
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada." });
});

// Manejo global de errores (por si algo se cae)
app.use((err, req, res, next) => {
  console.error("Error global:", err);
  res.status(500).json({ message: "Error interno del servidor." });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});