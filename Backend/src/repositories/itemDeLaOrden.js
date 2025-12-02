import { ItemDeLaOrden } from '../models/asociaciones.js';
import RepositoryBase from './RepositoryBase.js';

const repository = new RepositoryBase(ItemDeLaOrden);

// Obtener todos los items de una orden específica
repository.findByOrderId = async function(idOrden) {
    try {
        return await ItemDeLaOrden.findAll({ where: { idOrden } });
    } catch (error) {
        console.error('Error en findByOrderId (ItemDeLaOrden):', error);
        return null;
    }
};

// Obtener un item específico de una orden
repository.findItem = async function(idOrden, idProducto) {
    try {
        return await ItemDeLaOrden.findOne({ where: { idOrden, idProducto } });
    } catch (error) {
        console.error('Error en findItem (ItemDeLaOrden):', error);
        return null;
    }
};

export default repository;
