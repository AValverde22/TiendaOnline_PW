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
        type: DataTypes.STRING, // 'pendiente', 'pagado', 'enviado', 'entregado'
        defaultValue: 'pendiente'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2), // Usamos DECIMAL para dinero, nunca FLOAT
        allowNull: false
    },
    direccion_envio: {
        type: DataTypes.STRING,
        allowNull: true // Puede ser la misma del usuario o una nueva
    }
    // NOTA: Sequelize agregará automáticamente "usuarioId" cuando definamos la relación
}, {
    tableName: 'ordenes',
    timestamps: true
});

export default Orden;