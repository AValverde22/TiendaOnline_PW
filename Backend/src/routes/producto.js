import express from 'express';
import controller from '../controllers/producto.js';
// Importa authMiddleware si quieres proteger la creación de productos
// import authMiddleware from '../middleware/auth.js'; 

const router = express.Router();

// Rutas Públicas
router.get('/', controller.findAll);
router.get('/:id', controller.findById);
// OJO: Esta ruta coincide con lo que tu frontend necesita
router.get('/categoria/:nombreCategoria', controller.findByCategoria);

// Rutas Privadas (Admin)
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;