const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedido.controller.js");
const { authenticateToken } = require("../middleware/auth.middleware.js");

router.post("/", authenticateToken, pedidoController.createPedido);
router.get("/", authenticateToken, pedidoController.getPedidosByUser);
router.get("/:id", authenticateToken, pedidoController.getPedidoById);

module.exports = router;

