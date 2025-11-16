import express from 'express'
import controller from '../controllers/categoria.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router();

router.get('/', authMiddleware, controller.findAll);
router.get('/:id', controller.findOne);
router.get('/:name', controller.findByName);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', controller.remove);

export default router;