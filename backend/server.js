const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet"); // Seguridad extra
const morgan = require("morgan"); // Logger de peticiones
const pool = require("./utils/db");
const authRoutes = require("./routes/authRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());       // Protege cabeceras HTTP
app.use(morgan("dev"));  // Muestra logs en consola

// Ruta de prueba (conexión a la BD)
app.get("/api/health", async (req, res) => {
  try {
    await pool.getConnection();
    res.json({ db: "ok", timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ db: "error", message: err.message });
  }
});

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/password", passwordRoutes);



// Ruta 404 (por si acceden a una ruta no definida)
app.use((req, res, next) => {
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
