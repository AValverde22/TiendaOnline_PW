import model from "../models/producto.js";
import Categoria from "../models/categoria.js";
import RepositoryBase from "./RepositoryBase.js";

const repository = new RepositoryBase(model);

// Función extra: Buscar productos filtrados por el NOMBRE de la categoría
repository.findAllByCategoryName = async (nombreCategoria) => {
    try {
        const productos = await model.findAll({
            include: [{
                model: Categoria,
                as: 'categoria', // Debe coincidir con 'as' en asociaciones.js
                where: { nombre: nombreCategoria } // Filtro mágico
            }]
        });
        return productos;
    } catch (error) {
        console.error('Error al buscar productos por categoría:', error);
        return null;
    }
};

export default repository;