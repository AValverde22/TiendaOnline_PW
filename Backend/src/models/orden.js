import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Orden = sequelize.define('orden', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'pendiente'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    direccion_envio: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'ordenes',
    timestamps: true
});

export default Orden;