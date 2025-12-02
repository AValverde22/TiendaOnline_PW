import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Carrito = sequelize.define('carrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
});

export default Carrito;