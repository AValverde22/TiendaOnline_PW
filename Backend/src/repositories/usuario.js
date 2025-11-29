import model from '../models/usuario.js';
import RepositoryBase from './RepositoryBase.js';
// Importamos sequelize para operaciones complejas si fuera necesario
import sequelize from '../config/database.js';
import Usuario from '../models/usuario.js';
// Importamos Orden y demás DESDE asociaciones para asegurar que las relaciones estén cargadas
import { Orden, DetalleOrden, Producto } from '../models/asociaciones.js';

const repository = new RepositoryBase(model);

// Extensión del repositorio base con métodos específicos de Usuario

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
        // Mapeo: parametro 'email' busca en columna 'correo'
        return await model.findOne({ where: { correo: email } });
    } catch (error) {
        console.error('Error en findByEmail:', error);
        return null;
    }
};

// Implementación de getTotalSpent
repository.getTotalSpent = async function (idUsuario) {
    try {
        return 0; // Placeholder hasta que implementemos Órdenes
    } catch (error) {
        console.error('Error en getTotalSpent:', error);
        return 0;
    }
};

repository.findAll = async function () {
    try {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['password'] }, // Seguridad: No devolver contraseñas
            include: [
                {
                    model: Orden,
                    as: 'ordenes', // Debe coincidir con el alias de asociaciones.js
                    include: [
                        {
                            model: DetalleOrden,
                            as: 'detalles', // Debe coincidir con el alias
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
            order: [['id', 'ASC']] // Ordenar por ID
        });

        return usuarios;
    } catch (error) {
        throw error;
    }
};

export default repository;