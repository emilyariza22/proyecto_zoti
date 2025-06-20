const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json({ message: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

const verifyAdmin = (req, res, next) => {
  // MODO DE PRUEBA: Bypass de autenticación para desarrollar y probar
  // IMPORTANTE: Revertir estos cambios antes de producción
  console.log("MODO DE PRUEBA: Acceso permitido sin verificación");
  next();
  
  /* Código original comentado para pruebas
  verifyToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({
        message: "Acceso denegado. Se requiere rol de administrador."
      });
    }
  });
  */
};

module.exports = {
  verifyToken,
  verifyAdmin
};
