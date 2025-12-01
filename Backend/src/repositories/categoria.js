// 1. Importamos desde la central de asociaciones para mantener la consistencia
import { Categoria } from '../models/asociaciones.js';
import RepositoryBase from './RepositoryBase.js';

const repository = new RepositoryBase(Categoria);

// Buscar categoría por nombre (Útil para validaciones o búsqueda)
repository.findByName = async function (name) {
    try {
        return await Categoria.findOne({
            where: { nombre: name }
        });
    } catch (error) {
        console.error('Error en findByName (Categoria):', error);
        return null;
    }
};

export default repository;