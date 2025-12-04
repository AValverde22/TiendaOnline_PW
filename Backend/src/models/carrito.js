import sequelize from '#config/database.js';
import { DataTypes } from 'sequelize';

const Carrito = sequelize.define('carritos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'idUsuario'
    }
}, {
    tableName: 'carritos',
    timestamps: true
});

export default Carrito;
