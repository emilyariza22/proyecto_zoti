const pool = require("../utils/db");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const [userRows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: "Correo no encontrado." });
    }

    const resetCode = crypto.randomBytes(32).toString("hex");
    const resetCodeExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await pool.query(
      "UPDATE users SET resetCode = ?, resetCodeExpires = ? WHERE email = ?",
      [resetCode, resetCodeExpires, email]
    );

    const resetLink = `http://localhost:5173/reset-password/${resetCode}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Zoti" <no-reply@zotic.com>',
      to: email,
      subject: "Restablecer contraseña",
      html: `<p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>Este enlace expirará en 1 hora.</p>`,
    });

    res.json({ message: "Correo de recuperación enviado." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al enviar correo." });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres." });
  }

  try {
    const [users] = await pool.query(
      "SELECT * FROM users WHERE resetCode = ? AND resetCodeExpires > NOW()",
      [token]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "Token inválido o expirado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "UPDATE users SET password = ?, resetCode = NULL, resetCodeExpires = NULL WHERE id = ?",
      [hashedPassword, users[0].id]
    );

    res.status(200).json({ message: "✅ Contraseña restablecida con éxito." });

  } catch (error) {
    console.error("Error en /reset:", error);
    res.status(500).json({ message: "Error al restablecer la contraseña." });
  }
};
