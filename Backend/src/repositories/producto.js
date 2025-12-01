// 1. IMPORTAMOS DESDE LA CENTRAL DE ASOCIACIONES (CRÍTICO)
import { Producto, Categoria, Serie } from '../models/asociaciones.js';
import RepositoryBase from './RepositoryBase.js';

const repository = new RepositoryBase(Producto);

// 2. Sobrescribimos findAll para listar productos con sus "apellidos" (Categoria y Serie)
repository.findAll = async function () {
    console.log("⚡ EJECUTANDO findAll Productos (CON RELACIONES)");
    try {
        return await Producto.findAll({
            include: [
                {
                    model: Categoria,
                    as: 'categoria', // Coincide con asociaciones.js
                    attributes: ['id', 'nombre'] // Traemos solo lo necesario
                },
                {
                    model: Serie,
                    as: 'serie',
                    attributes: ['id', 'nombre']
                }
            ],
            order: [['id', 'ASC']]
        });
    } catch (error) {
        console.error('Error en findAll (Producto):', error);
        return null;
    }
};

// 3. ¡NUEVO! Sobrescribimos findById (Vital para la página de detalle)
repository.findById = async function (id) {
    try {
        return await Producto.findByPk(id, {
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['id', 'nombre']
                },
                {
                    model: Serie,
                    as: 'serie',
                    attributes: ['id', 'nombre']
                }
            ]
        });
    } catch (error) {
        console.error('Error en findById (Producto):', error);
        return null;
    }
};

// 4. Método personalizado (Mantenemos tu lógica, actualizamos el origen de los modelos)
repository.findAllByCategoryName = async function (nombreCategoria) {
    try {
        return await Producto.findAll({
            include: [{
                model: Categoria,
                as: 'categoria',
                where: { nombre: nombreCategoria } // Filtro SQL inteligente
            }],
            include: [{ model: Serie, as: 'serie' }] // También traemos la serie si quieres
        });
    } catch (error) {
        console.error('Error buscar por categoría:', error);
        return null;
    }
};

export default repository;