const Pedido = require("../models/pedido.js");
const Producto = require("../models/producto.js");

// Crear un nuevo pedido
exports.createPedido = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.userId; // Obtenido del middleware de autenticación

    // Validar que hay items en el pedido
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "El pedido debe contener al menos un producto" });
    }

    // Validar y preparar los items del pedido
    const pedidoItems = [];
    let total = 0;

    for (const item of items) {
      // Validar campos requeridos
      if (!item._id || !item.cantidad || item.cantidad < 1) {
        return res.status(400).json({ error: "Cada item debe tener un _id y cantidad válida" });
      }

      // Verificar que el producto existe
      const producto = await Producto.findById(item._id);
      if (!producto) {
        return res.status(404).json({ error: `Producto con id ${item._id} no encontrado` });
      }

      // Calcular subtotal
      const subtotal = producto.precio * item.cantidad;
      total += subtotal;

      // Agregar item al pedido
      pedidoItems.push({
        producto: producto._id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: item.cantidad,
        imagenURL: producto.imagenURL || ""
      });
    }

    // Crear el pedido
    const nuevoPedido = await Pedido.create({
      usuario: userId,
      items: pedidoItems,
      total: total
    });

    
    await nuevoPedido.populate("items.producto", "nombre precio imagenURL");

    res.status(201).json({
      message: "Pedido creado exitosamente",
      pedido: nuevoPedido
    });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ error: "Error al crear pedido" });
  }
};

// Obtener todos los pedidos del usuario autenticado
exports.getPedidosByUser = async (req, res) => {
  try {
    const userId = req.user.userId;  

    const pedidos = await Pedido.find({ usuario: userId })
      .populate("items.producto", "nombre precio imagenURL")
      .sort({ createdAt: -1 }); 

    res.json({
      pedidos: pedidos
    });
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
};

// Obtener un pedido específico por ID (solo si pertenece al usuario)
exports.getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const pedido = await Pedido.findOne({ _id: id, usuario: userId })
      .populate("items.producto", "nombre precio imagenURL");

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json({
      pedido: pedido
    });
  } catch (error) {
    console.error("Error al obtener pedido:", error);
    res.status(500).json({ error: "Error al obtener pedido" });
  }
};

