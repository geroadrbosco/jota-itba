const express = require("express");
const cors = require("cors");
const productosRouter = require("./routes/product.Routes.js");
const authRouter = require("./routes/auth.routes.js");
const pedidosRouter = require("./routes/pedido.routes.js");
const { connectDB } = require("./database/config");
const Producto = require("./models/producto");
const productos = require("./productos.json");
const allowedOrigins = [
  'http://localhost:5173',           
  'https://jota-itba.vercel.app'     
];

require("dotenv").config();

const app = express();

// Conexión a la DB
connectDB();

// Insertar datos en MongoDB
const IniciarProductos = async () => {
  try {
    // Borrar datos anteriores por si quedaron
    console.log("Borrando todos los productos anteriores");
    await Producto.deleteMany({});
    // Insertar nuevos datos
    console.log("Insertando productos iniciales...");
    const resultados = await Producto.insertMany(
      productos.map(prod => ({
        ...prod
      }))
    );
    console.log(`${resultados.length} productos insertados correctamente.`);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
});

// Rutas
app.use("/api/auth", authRouter);
app.use("/api/productos", productosRouter);
app.use("/api/pedidos", pedidosRouter);


// Ruta no encontrada
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
  await IniciarProductos();
});