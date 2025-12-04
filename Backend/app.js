import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// ✅ Cargamos asociaciones primero
import '#models/asociaciones.js';

// Importamos las rutas
import categoriaRouter from '#routes/categoria.js';
import usuarioRouter from '#routes/usuario.js';
import productoRouter from '#routes/producto.js';
import serieRouter from '#routes/serie.js';
import carritoRouter from '#routes/carrito.js';
import ordenRouter from '#routes/orden.js';
import itemDeLaOrdenRouter from '#routes/itemDeLaOrden.js';

const app = express();

// Middlewares
app.use(express.json());
// Configuración de CORS dinámica
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Si no hay FRONTEND_URL definido (dev), permitimos todo o si está en la lista
        if (!process.env.FRONTEND_URL || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

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
