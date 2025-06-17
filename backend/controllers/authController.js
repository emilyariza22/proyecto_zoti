// backend/controllers/authController.js
const pool = require("../utils/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const {
    full_name,
    document_type,
    document_number,
    phone,
    email,
    password,
    role = "cliente"
  } = req.body;

  try {
    // Verificar que no exista usuario con ese email o documento
    const [exists] = await pool.query(
      "SELECT id FROM users WHERE email = ? OR document_number = ?",
      [email, document_number]
    );
    if (exists.length) {
      return res
        .status(400)
        .json({ message: "Ya existe un usuario con ese email o documento" });
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Insertar
    const [result] = await pool.query(
      `INSERT INTO users 
        (full_name, document_type, document_number, phone, email, password, role)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [full_name, document_type, document_number, phone, email, hashed, role]
    );

    res.status(201).json({
      message: "Usuario creado exitosamente",
      userId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT id, password, full_name, role FROM users WHERE email = ?",
      [email]
    );
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id, full_name: user.full_name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: user.id, full_name: user.full_name, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};
