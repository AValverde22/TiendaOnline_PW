import express from 'express';
import controller from '#controllers/categoria.js';
// Importamos ambos middlewares para asegurar que solo el ADMIN toque esto
import { authMiddleware, verifyAdmin } from '#middleware/auth.js';

const router = express.Router();

// --- Rutas Públicas ---
router.get('/', controller.findAll);

// CORREGIDO: findOne -> findById (Coincide con el controlador)
router.get('/:id', controller.findById);

router.get('/buscar/:name', controller.findByName);


// --- Rutas Privadas (Solo Admin) ---
// Agregamos verifyAdmin para mayor seguridad
router.post('/', authMiddleware, verifyAdmin, controller.create);
router.put('/:id', authMiddleware, verifyAdmin, controller.update);
router.delete('/:id', authMiddleware, verifyAdmin, controller.remove);

export default router;