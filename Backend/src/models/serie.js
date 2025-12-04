import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Serie = sequelize.define('series', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { tableName: 'series', timestamps: true });

export default Serie;