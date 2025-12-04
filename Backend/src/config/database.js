import Sequelize from 'sequelize';
import config from './config.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Crear la instancia de Sequelize usando la configuración separada
const sequelize = new Sequelize(dbConfig.url, {
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    logging: dbConfig.logging
});

export default sequelize;