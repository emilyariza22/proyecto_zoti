require('dotenv').config();

const config = {
  server: {
    port: process.env.PORT || 80,
    env: process.env.NODE_ENV || 'development'
  },
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  security: {
    jwtSecret: process.env.JWT_SECRET,
    bcryptRounds: 10,
    passwordResetExpiry: 60 * 60 * 1000, // 1 hora en milisegundos
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
  }
};

module.exports = config;
