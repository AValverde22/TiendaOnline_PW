// 1. IMPORTANTE: Importamos desde asociaciones.js para tener las relaciones vinculadas
import { Serie, Producto } from '#models/asociaciones.js';
import RepositoryBase from './RepositoryBase.js';

// Usamos el modelo real 'Serie' en lugar de 'model'
const repository = new RepositoryBase(Serie);

// Sobrescribimos findById para traer los productos de esa saga/serie
repository.findById = async (id) => {
    try {
        return await Serie.findByPk(id, {
            include: [{
                model: Producto,
                as: 'productos', // Coincide con asociaciones.js: Serie.hasMany(..., as: 'productos')
                // Opcional: Si quieres solo los productos activos
                // where: { activo: true } 
            }]
        });
    } catch (error) {
        console.error('Error en findById (Serie):', error);
        return null;
    }
};

export default repository;