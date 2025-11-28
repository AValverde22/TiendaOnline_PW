import model from '../models/serie.js';
import Producto from '../models/producto.js';
import RepositoryBase from './RepositoryBase.js';

const repository = new RepositoryBase(model);

// Sobrescribimos findById para que traiga los productos asociados
repository.findById = async (id) => {
    try {
        return await model.findByPk(id, {
            include: [{
                model: Producto,
                as: 'productos' // Debe coincidir con asociaciones.js
            }]
        });
    } catch (error) {
        console.error('Error en findById (Serie):', error);
        return null;
    }
};

export default repository;