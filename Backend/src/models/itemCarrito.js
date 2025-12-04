import sequelize from '#config/database.js'
import { DataTypes } from 'sequelize'

const ItemCarrito = sequelize.define('itemCarrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 // Por defecto, si agregas algo, es al menos 1 unidad
    }
});

export default ItemCarrito;
