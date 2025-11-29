import express from 'express'
import usuarioController from '../controllers/usuario.js'
import { authMiddleware, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login);
// Solo admins pueden ver la lista de usuarios
router.get('/', authMiddleware, verifyAdmin, usuarioController.findAll);
//  Solo admins pueden actualizar usuarios
router.put('/:id', authMiddleware, verifyAdmin, usuarioController.update);

export default router;