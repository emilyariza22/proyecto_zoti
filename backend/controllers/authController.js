// backend/controllers/authController.js
const { pool } = require("../utils/db"); // ✅ Importación corregida
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validatePassword } = require("../utils/passwordValidator");

// Validación de correo
const validateEmail = (email) => {
  if (!email.includes('@')) return "Incluye un signo '@' en la dirección de correo electrónico";
  if (!email.includes('.')) return "La dirección de correo debe incluir un punto (.)";
  if (email.indexOf('@') !== email.lastIndexOf('@')) return "La dirección de correo solo debe contener un signo '@'";

  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return "Formato de correo electrónico inválido";
  if (!/^[a-zA-Z0-9._-]+$/.test(localPart)) return "El correo solo puede contener letras, números, puntos, guiones y guiones bajos";

  return null;
};

// Registro de usuario
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
    // Validar formato de correo
    const emailError = validateEmail(email);
    if (emailError) {
      return res.status(400).json({ 
        field: "email",
        message: emailError 
      });
    }

    // Validar contraseña
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        field: "password",
        message: passwordValidation.errors.join(", ")
      });
    }

    // Validar número de documento
    if (!/^\d{10}$/.test(document_number)) {
      return res.status(400).json({
        field: "document_number",
        message: "El número de documento debe tener exactamente 10 dígitos numéricos."
      });
    }
    // Validar teléfono
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        field: "phone",
        message: "El número de teléfono debe tener exactamente 10 dígitos numéricos."
      });
    }

    // Verificar duplicados
    const [exists] = await pool.query(
      "SELECT id, email, document_number FROM users WHERE email = ? OR document_number = ?",
      [email, document_number]
    );

    if (exists.length) {
      const existingUser = exists[0];
      if (existingUser.email === email) {
        return res.status(400).json({
          field: "email",
          message: "Ya existe una cuenta con este correo electrónico"
        });
      } else {
        return res.status(400).json({
          field: "document_number",
          message: "Ya existe una cuenta con este número de documento"
        });
      }
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Insertar nuevo usuario
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

// Login de usuario
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

    res.json({
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};
