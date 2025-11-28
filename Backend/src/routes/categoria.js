import express from 'express'
import controller from '../controllers/categoria.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.get('/buscar/:name', controller.findByName);


router.post('/', authMiddleware, controller.create);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.remove);

export default router;