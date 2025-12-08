const express = require("express");
const router = express.Router();
const productoController = require("../controllers/producto.controller.js");
const { authenticateToken } = require("../middleware/auth.middleware");

// Rutas públicas
router.get("/", productoController.getProductos);
router.get("/:id", productoController.getProductoById);

// Rutas protegidas (requieren autenticación)
router.post("/", authenticateToken, productoController.createProducto);
router.put("/:id", authenticateToken, productoController.updateProducto);
router.delete("/:id", authenticateToken, productoController.deleteProducto);

module.exports = router;