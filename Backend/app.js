import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import categoriaRouter from './src/routes/categoria.js'
import usuarioRouter from './src/routes/usuario.js'

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, resp) => {
    return resp.json({mensaje: "Hola Mundo :v", code: 200});
})

app.use('/categoria', categoriaRouter);
app.use('/usuario', usuarioRouter); 


export default app;