import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// ✅ IMPORTANTE: Las asociaciones se cargan antes que cualquier ruta
import './src/models/asociaciones.js';

// Importamos las rutas
import categoriaRouter from './src/routes/categoria.js';
import usuarioRouter from './src/routes/usuario.js';
import productoRouter from './src/routes/producto.js';
import serieRouter from './src/routes/serie.js';
import CarritoRouter from './src/routes/Carrito.js';


const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Ruta Health Check (Para ver si el servidor vive)
app.get('/', (req, resp) => {
    return resp.json({ mensaje: "API TiendaPW funcionando 🚀", code: 200 });
});

// Definición de Endpoints
app.use('/api/categorias', categoriaRouter);
app.use('/api/usuarios', usuarioRouter); // Plural (Correcto)
app.use('/api/productos', productoRouter);
app.use('/api/series', serieRouter);

// El Router de Carrito ahora maneja: ver, agregar item, quitar item, update cantidad
app.use('/api/carrito', CarritoRouter);

// ❌ ELIMINADO: app.use('/api/itemcarrito', ItemCarrito);

export default app;