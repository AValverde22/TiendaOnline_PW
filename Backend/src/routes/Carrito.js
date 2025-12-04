import express from 'express';
import controller from '#controllers/carrito.js';
import authMiddleware from '#middleware/auth.js';

const router = express.Router();

// Un usuario autenticado ve sus propios carritos
router.get("/:idUsuario", authMiddleware, controller.verCarrito);

router.delete("/:idUsuario", authMiddleware, controller.vaciarCarrito);

router.post("/item", authMiddleware, controller.agregarItem);

router.put("/item", authMiddleware, controller.updateCantidad);

router.delete('/item/:id', authMiddleware, controller.eliminarItem);



export default router;
