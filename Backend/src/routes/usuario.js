import express from 'express'
import usuarioController from '#controllers/usuario.js'
import { authMiddleware, verifyAdmin } from '#middleware/auth.js';

const router = express.Router();

// Registra un nuevo usuario
router.post('/registrar', usuarioController.registrar);
// Inicia sesión
router.post('/login', usuarioController.login);

// Solo admins pueden ver la lista de usuarios
router.get('/', authMiddleware, verifyAdmin, usuarioController.findAll);

// --- ESTA ES LA LÍNEA QUE TE FALTA ---
// Permite obtener un usuario por ID (necesario para ver el detalle de la orden)
router.get('/:id', authMiddleware, usuarioController.findById);
// -------------------------------------

// Solo admins pueden actualizar usuarios
router.put('/:id', authMiddleware, usuarioController.update);

export default router;