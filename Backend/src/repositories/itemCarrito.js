// 1. IMPORTACIÓN CENTRALIZADA (Importante: ItemCarrito con mayúscula)
import { ItemCarrito } from '../models/asociaciones.js';
import RepositoryBase from './RepositoryBase.js';

// 2. Instanciamos la base
const repository = new RepositoryBase(ItemCarrito);

// 3. Métodos Específicos

// Obtener todos los ítems de un carrito específico
repository.obtenerItems = async function (idCarrito) {
    try {
        return await ItemCarrito.findAll({
            where: { idCarrito: idCarrito } // CORREGIDO: carritoId -> idCarrito
        });
    } catch (error) {
        console.error("Error en obtenerItems:", error);
        return null;
    }
};

// Buscar si un producto ya existe en el carrito (para sumar cantidad en vez de duplicar fila)
repository.obtenerItem = async function (idCarrito, idProducto) {
    try {
        return await ItemCarrito.findOne({
            where: {
                idCarrito: idCarrito,   // CORREGIDO: carritoId -> idCarrito
                idProducto: idProducto  // CORREGIDO: productoId -> idProducto
            }
        });
    } catch (error) {
        console.error("Error en obtenerItem:", error);
        return null;
    }
};

// Agregar un ítem nuevo
repository.agregarProducto = async function (idCarrito, idProducto, cantidad = 1) {
    try {
        return await ItemCarrito.create({
            idCarrito: idCarrito,
            idProducto: idProducto,
            cantidad: cantidad
        });
    } catch (error) {
        console.error("Error en agregarProducto:", error);
        return null;
    }
};

// Actualizar cantidad (ej: usuario cambia de 1 a 5 en el input)
repository.actualizarCantidad = async function (id, cantidad) {
    try {
        // Usamos el método update de tu RepositoryBase, que ya maneja la lógica de retorno
        return await this.update(id, { cantidad });
    } catch (error) {
        console.error("Error en actualizarCantidad:", error);
        return null;
    }
};

export default repository;