import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const DetalleOrden = sequelize.define('detalle_orden', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'detalle_orden',
    timestamps: false
});

export default DetalleOrden;