import model from '../models/usuario.js';
import RepositoryBase from './RepositoryBase.js';
import sequelize from '../config/database.js';
import Usuario from '../models/usuario.js';
import { Orden, DetalleOrden, Producto } from '../models/asociaciones.js';

const repository = new RepositoryBase(model);

repository.findByUsername = async function (username) {
    try {
        return await model.findOne({ where: { username: username } });
    } catch (error) {
        console.error('Error en findByUsername:', error);
        return null;
    }
};

repository.findByEmail = async function (email) {
    try {
        return await model.findOne({ where: { correo: email } });
    } catch (error) {
        console.error('Error en findByEmail:', error);
        return null;
    }
};

repository.getTotalSpent = async function (idUsuario) {
    try {
        return 0;
    } catch (error) {
        console.error('Error en getTotalSpent:', error);
        return 0;
    }
};

repository.findAll = async function () {
    try {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Orden,
                    as: 'ordenes',
                    include: [
                        {
                            model: DetalleOrden,
                            as: 'detalles',
                            include: [
                                {
                                    model: Producto,
                                    as: 'producto'
                                }
                            ]
                        }
                    ]
                }
            ],
            order: [['id', 'ASC']]
        });

        return usuarios;
    } catch (error) {
        throw error;
    }
};

repository.update = async function (id, datos) {
    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return null;
        }

        await usuario.update(datos);

        const usuarioActualizado = await Usuario.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        return usuarioActualizado;
    } catch (error) {
        console.error('Error en update:', error);
        throw error;
    }
};

export default repository;