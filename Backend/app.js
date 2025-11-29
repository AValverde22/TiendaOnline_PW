import express from 'express'
import cors from 'cors'

import categoriaRouter from './src/routes/categoria.js'
import usuarioRouter from './src/routes/usuario.js'
import productoRouter from './src/routes/producto.js'
import serieRouter from './src/routes/serie.js'
// En index.js / app.js (al inicio)
import 'dotenv/config';

if (!process.env.JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET no está definido.");
    process.exit(1); // Detiene la app si no hay seguridad configurada
}

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, resp) => {
    return resp.json({ mensaje: "Hola Mundo :v", code: 200 });
})

app.use('/api/categorias', categoriaRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/productos', productoRouter);
app.use('/api/series', serieRouter);


export default app;