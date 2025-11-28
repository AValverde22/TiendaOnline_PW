import model from '../models/usuario.js';
import RepositoryBase from './RepositoryBase.js';
// Importamos sequelize para operaciones complejas si fuera necesario
import sequelize from '../config/database.js';

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
// NOTA: Esto requiere que existan tablas 'ordenes' o 'pedidos' relacionadas.
// Por ahora, retornamos 0 para que no rompa el código si lo llamas.
repository.getTotalSpent = async function (idUsuario) {
    try {
        // EJEMPLO DE CÓMO SERÍA CON SEQUELIZE RAW QUERY (PostgreSQL):
        /*
        const [results] = await sequelize.query(`
            SELECT SUM(total) as total_gastado 
            FROM ordenes 
            WHERE "usuarioId" = :id
        `, { replacements: { id: idUsuario } });
        
        return results[0].total_gastado || 0;
        */

        return 0; // Placeholder hasta que implementemos Órdenes
    } catch (error) {
        console.error('Error en getTotalSpent:', error);
        return 0;
    }
};

export default repository;