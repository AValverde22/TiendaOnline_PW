import express from 'express';
import controller from '#controllers/series.js';
// 1. Importamos los middlewares de seguridad
import { authMiddleware, verifyAdmin } from '#middleware/auth.js';

const router = express.Router();

// --- Rutas Públicas ---
// (Cualquiera puede ver qué series/sagas existen)
router.get('/', controller.findAll);
router.get('/:id', controller.findById);

// --- Rutas Privadas (Solo Admin) ---
// 2. Agregamos los "candados":
//    - authMiddleware: Verifica que tenga token válido
//    - verifyAdmin: Verifica que el rol sea 'ADMIN'
router.post('/', authMiddleware, verifyAdmin, controller.create);

// Opcional: Si implementas update/delete en el futuro, irían aquí también protegidos
// router.put('/:id', authMiddleware, verifyAdmin, controller.update);

export default router;