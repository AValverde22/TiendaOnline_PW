import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'
import Carrito from './Carrito.js'
import Producto from './producto.js'



const ItemCarrito = sequelize.define('itemCarrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

// FK Carrito
ItemCarrito.belongsTo(Carrito, {
    foreignKey: { name: "idCarrito", allowNull: false },
    onDelete: "CASCADE"
});

// FK Producto
ItemCarrito.belongsTo(Producto, {
    foreignKey: { name: "idProducto", allowNull: false },
    onDelete: "CASCADE"
});

export default ItemCarrito;



    
