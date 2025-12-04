import { Carrito, ItemCarrito, Producto } from '#models/asociaciones.js';

const repository = {};

repository.findByUser = async function (idUsuario) {
    try {
        let carrito = await Carrito.findOne({
            where: { idUsuario },
            include: [{
                model: ItemCarrito,
                include: [Producto]
            }]
        });

        if (!carrito) {
            carrito = await Carrito.create({ idUsuario });
        }

        return carrito;
    } catch (error) {
        console.error('Error en findByUser (Carrito):', error);
        throw error;
    }
};

repository.addItem = async function (idUsuario, idProducto, cantidad) {
    try {
        let carrito = await Carrito.findOne({ where: { idUsuario } });

        if (!carrito) {
            carrito = await Carrito.create({ idUsuario });
        }

        const existingItem = await ItemCarrito.findOne({
            where: { idCarrito: carrito.id, idProducto }
        });

        if (existingItem) {
            existingItem.cantidad += cantidad;
            await existingItem.save();
            return existingItem;
        } else {
            return await ItemCarrito.create({
                idCarrito: carrito.id,
                idProducto,
                cantidad
            });
        }
    } catch (error) {
        console.error('Error en addItem (Carrito):', error);
        throw error;
    }
};

repository.updateItem = async function (id, cantidad) {
    try {
        const item = await ItemCarrito.findByPk(id);

        if (!item) {
            return null;
        }

        item.cantidad = cantidad;
        await item.save();
        return item;
    } catch (error) {
        console.error('Error en updateItem (Carrito):', error);
        throw error;
    }
};

repository.removeItem = async function (id) {
    try {
        const item = await ItemCarrito.findByPk(id);

        if (!item) {
            return false;
        }

        await item.destroy();
        return true;
    } catch (error) {
        console.error('Error en removeItem (Carrito):', error);
        throw error;
    }
};

repository.clearCart = async function (idUsuario) {
    try {
        const carrito = await Carrito.findOne({ where: { idUsuario } });

        if (carrito) {
            await ItemCarrito.destroy({ where: { idCarrito: carrito.id } });
        }
    } catch (error) {
        console.error('Error en clearCart (Carrito):', error);
        throw error;
    }
};

export default repository;
