import express from 'express';
import controller from '../controllers/series.js';

const router = express.Router();

// Rutas Públicas
router.get('/', controller.findAll);
router.get('/:id', controller.findById);

// Rutas Privadas (Admin) - Puedes agregar authMiddleware aquí si quieres
router.post('/', controller.create);

export default router;