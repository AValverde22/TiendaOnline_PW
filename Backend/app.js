import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// ✅ Cargamos asociaciones primero
import './src/models/asociaciones.js';

// Importamos las rutas
import categoriaRouter from './src/routes/categoria.js';
import usuarioRouter from './src/routes/usuario.js';
import productoRouter from './src/routes/producto.js';
import serieRouter from './src/routes/serie.js'; // corregido: debe ser 'series.js'
import carritoRouter from './src/routes/carrito.js';
import ordenRouter from './src/routes/orden.js';
import itemDeLaOrdenRouter from './src/routes/itemDeLaOrden.js'; // nuevo

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Health check
app.get('/', (req, res) => {
    return res.json({ mensaje: "API TiendaPW funcionando 🚀", code: 200 });
});

// Rutas públicas y privadas
app.use('/api/categorias', categoriaRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/productos', productoRouter);
app.use('/api/series', serieRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/ordenes', ordenRouter);
app.use('/api/items-orden', itemDeLaOrdenRouter);

export default app;
