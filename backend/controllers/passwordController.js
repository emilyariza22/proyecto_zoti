const { pool } = require("../utils/db");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const config = require("../config/config");
const { validatePassword } = require("../utils/passwordValidator");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ 
      message: "Por favor, ingresa tu correo electrónico." 
    });
  }

  try {
    // Verificar si el usuario existe
    const [userRows] = await pool.query(
      "SELECT * FROM users WHERE email = ?", 
      [email]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ 
        message: "No existe una cuenta con este correo electrónico." 
      });
    }

    // Generar código de reseteo
    const resetCode = crypto.randomBytes(32).toString("hex");
    const resetCodeExpires = new Date(
      Date.now() + config.security.passwordResetExpiry
    );

    // Actualizar usuario con el código
    await pool.query(
      "UPDATE users SET resetCode = ?, resetCodeExpires = ? WHERE email = ?",
      [resetCode, resetCodeExpires, email]
    );

    const resetLink = `${config.cors.origin}/reset-password/${resetCode}`;

    // Configurar el transportador de correo
    const transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
      tls: {
        rejectUnauthorized: false // Solo para desarrollo
      }
    });

    // Verificar la conexión
    try {
      await transporter.verify();
    } catch (error) {
      console.error("Error al verificar el transportador de correo:", error);
      return res.status(500).json({ 
        message: "Error en la configuración del servidor de correo." 
      });
    }

    // Enviar el correo
    try {
      await transporter.sendMail({
        from: `"Zoti" <${config.email.user}>`,
        to: email,
        subject: "Recuperación de Contraseña - Zoti",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #243E69;">Recuperación de Contraseña</h2>
            <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #243E69; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">
              Restablecer Contraseña
            </a>
            <p><strong>Este enlace expirará en 1 hora.</strong></p>
            <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">Este es un correo automático, por favor no respondas a este mensaje.</p>
          </div>
        `
      });

      res.json({ 
        message: "Te hemos enviado un correo con las instrucciones para restablecer tu contraseña." 
      });

    } catch (error) {
      console.error("Error al enviar el correo:", error);
      return res.status(500).json({ 
        message: "Error al enviar el correo de recuperación. Por favor, intenta nuevamente." 
      });
    }

  } catch (error) {
    console.error("Error en el proceso de recuperación:", error);
    res.status(500).json({ 
      message: "Error al procesar la solicitud. Por favor, intenta nuevamente." 
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { resetCode, newPassword } = req.body;

  if (!resetCode || !newPassword) {
    return res.status(400).json({ message: "Faltan datos requeridos." });
  }

  try {
    // Verificar que el código existe y no ha expirado
    const [userRows] = await pool.query(
      "SELECT * FROM users WHERE resetCode = ? AND resetCodeExpires > NOW()",
      [resetCode]
    );

    if (userRows.length === 0) {
      return res.status(400).json({ message: "Código inválido o expirado." });
    }

    const user = userRows[0];

    // Validar la nueva contraseña
    const validationResult = validatePassword(newPassword);
    if (!validationResult.isValid) {
      return res.status(400).json({
        message: "La contraseña no cumple con los requisitos",
        errors: validationResult.errors
      });
    }

    // Verificar que no sea la misma contraseña actual
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        message: "La nueva contraseña no puede ser igual a la anterior"
      });
    }

    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña y limpiar el código de reseteo
    await pool.query(
      "UPDATE users SET password = ?, resetCode = NULL, resetCodeExpires = NULL WHERE id = ?",
      [hashedPassword, user.id]
    );

    res.json({ message: "Contraseña actualizada con éxito." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al cambiar la contraseña." });
  }
};
