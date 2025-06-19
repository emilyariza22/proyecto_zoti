const nodemailer = require('nodemailer');
const config = require('../config/config');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      auth: {
        user: config.email.user,
        pass: config.email.pass
      }
    });
  }

  async sendPasswordReset(email, resetLink) {
    try {
      await this.transporter.sendMail({
        from: '"TI360" <no-reply@ti360.com>',
        to: email,
        subject: "Restablecer contraseña",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Restablecer tu contraseña</h2>
            <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:</p>
            <a href="${resetLink}" 
               style="display: inline-block; 
                      padding: 10px 20px; 
                      background-color: #0066cc; 
                      color: white; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      margin: 15px 0;">
              Restablecer Contraseña
            </a>
            <p style="color: #666; font-size: 14px;">
              Este enlace expirará en 1 hora. Si no solicitaste restablecer tu contraseña, 
              puedes ignorar este correo.
            </p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">
              Este es un correo automático, por favor no respondas a este mensaje.
            </p>
          </div>
        `
      });
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}

module.exports = new EmailService();
