const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
          required: true
        },
        nombre: {
          type: String,
          required: true
        },
        precio: {
          type: Number,
          required: true,
          min: 0
        },
        cantidad: {
          type: Number,
          required: true,
          min: 1
        },
        imagenURL: {
          type: String
        }
      }
    ],
    total: {
      type: Number,
      required: true,
      min: 0
    },
    estado: {
      type: String,
      enum: ["pendiente", "confirmado", "enviado", "entregado", "cancelado"],
      default: "pendiente"
    }
  },
  { timestamps: true }
);

const Pedido = mongoose.model("Pedido", pedidoSchema);
module.exports = Pedido;

