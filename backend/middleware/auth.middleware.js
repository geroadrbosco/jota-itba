const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware para verificar JWT
const authenticateToken = (req, res, next) => {
  // Obtener el token del header Authorization
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ error: "Token de acceso requerido" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Agregar información del usuario al request
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expirado" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token inválido" });
    }
    return res.status(500).json({ error: "Error al verificar token" });
  }
};

module.exports = { authenticateToken };
