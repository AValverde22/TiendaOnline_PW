import express from 'express'
import usuarioController from '../controllers/usuario.js'

const router = express.Router();

router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login);
router.put('/', usuarioController.update);

export default router;