import sequelize from '#config/database.js';
import { DataTypes } from 'sequelize';

const ItemDeLaOrden = sequelize.define('items_de_la_orden', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Definimos explícitamente las FK para validar que no sean nulas
    idOrden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'idOrden' // Para asegurar que en la BD se llame igual
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'idProducto'
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    // ¡Muy bien hecho! Guardar el precio y subtotal aquí es CRUCIAL.
    // Esto congela el precio al momento de la compra, por si el producto sube de precio después.
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'items_de_la_orden', // Nombre de la tabla en plural y snake_case es estándar en PG
    timestamps: false
});

export default ItemDeLaOrden;