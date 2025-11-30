import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const ItemCarrito = sequelize.define('itemCarrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
})

export default ItemCarrito;