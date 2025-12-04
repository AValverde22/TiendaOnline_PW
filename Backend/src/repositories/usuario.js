import {
    Usuario,
    Orden,
    ItemDeLaOrden,
    Producto,
    Categoria
} from '#models/asociaciones.js';
import RepositoryBase from './RepositoryBase.js';

const repository = new RepositoryBase(Usuario);

// Buscar usuario por email (Vital para el Login)
repository.findByEmail = async function (email) {
    try {
        return await Usuario.findOne({ where: { correo: email } });
    } catch (error) {
        console.error('Error en findByEmail:', error);
        return null; // Retornamos null para que el controller maneje el 404/401
    }
};

// Obtener todos los usuarios (Para el Admin)
repository.findAll = async function () {
    try {
        return await Usuario.findAll({
            attributes: { exclude: ['password'] }, // Nunca devolver passwords
            include: [
                {
                    model: Orden,
                    as: 'ordenes',
                    include: [
                        {
                            model: ItemDeLaOrden,
                            as: 'detalles',
                            include: [
                                { model: Producto, as: 'producto' }
                            ]
                        }
                    ]
                }
            ],
            order: [['id', 'ASC']]
        });
    } catch (error) {
        console.error('Error en findAll usuarios:', error);
        return null;
    }
};

// Obtener un usuario por ID (Para ver perfil y detalle de órdenes)
repository.findById = async function (id) {
    try {
        return await Usuario.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Orden,
                    as: 'ordenes',
                    include: [
                        {
                            model: ItemDeLaOrden,
                            as: 'detalles',
                            include: [
                                {
                                    model: Producto,
                                    as: 'producto',
                                    include: [
                                        // Esto es lo que permite mostrar la categoría en el historial
                                        { model: Categoria, as: 'categoriaProducto' }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    } catch (error) {
        console.error('Error en findById usuario:', error);
        return null;
    }
};

export default repository;