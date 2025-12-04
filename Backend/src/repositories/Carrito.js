// Importamos los modelos
import { Carrito, ItemCarrito, Producto } from '#models/asociaciones.js';
import RepositoryBase from './RepositoryBase.js';

// Creamos la instancia del repositorio base para Carrito
const repository = new RepositoryBase(Carrito);

// Método específico: Buscar carrito por ID de usuario, incluyendo items y productos
repository.findByUserId = async function (idUsuario) {
    try {
        const carrito = await Carrito.findOne({
            where: { idUsuario },
            include: [
                {
                    model: ItemCarrito,
                    as: 'items',
                    include: [
                        { model: Producto, as: 'productoCarrito' }
                    ]
                }
            ]
        });

        if (!carrito) return null;

        // Normalizar la respuesta para el frontend
        const plain = carrito.toJSON();
        if (plain.items && Array.isArray(plain.items)) {
            plain.items = plain.items.map(it => {
                if (it.productoCarrito) {
                    it.producto = it.productoCarrito;
                    delete it.productoCarrito;
                }
                return it;
            });
        }

        return plain;
    } catch (error) {
        console.error("Error en findByUserId:", error);
        return null;
    }
};

// Método específico: Vaciar los items del carrito
repository.clearCarrito = async function (idCarrito) {
    try {
        const deleted = await ItemCarrito.destroy({
            where: { idCarrito }
        });
        return deleted > 0;
    } catch (error) {
        console.error("Error en clearCarrito:", error);
        return null;
    }
};

export default repository;
