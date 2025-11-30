import model from "../models/producto.js";
import Categoria from "../models/categoria.js";
import RepositoryBase from "./RepositoryBase.js";

const repository = new RepositoryBase(model);

// Función personalizada para buscar por nombre de categoría
repository.findAllByCategoryName = async (nombreCategoria) => {
    try {
        const productos = await model.findAll({
            include: [{
                model: Categoria,
                // Asegúrate de que en 'src/models/asociaciones.js' definiste: 
                // Producto.belongsTo(Categoria, { as: 'categoria' ... })
                as: 'categoria', 
                where: { nombre: nombreCategoria }
            }]
        });
        return productos;
    } catch (error) {
        console.error('Error al buscar productos por categoría:', error);
        return null;
    }
};

export default repository;