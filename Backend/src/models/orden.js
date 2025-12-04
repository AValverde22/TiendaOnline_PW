import sequelize from '#config/database.js';
import { DataTypes } from 'sequelize';

const Orden = sequelize.define('orden', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'idUsuario'
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'pendiente' // pendiente, pagado, enviado, entregado
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: { // Estaba en tu diagrama
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true // Puede ser calculado, pero el diagrama lo tiene
    },
    direccion_envio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Campos del diagrama (Opcionales según tu necesidad)
    metodo_pago: {
        type: DataTypes.STRING,
        field: 'MetodoDeEntrega' // Mapeo al nombre de tu diagrama
    },
    // Solo para fines académicos. En producción no guardar esto.
    nro_tarjeta_mask: {
        type: DataTypes.STRING,
        field: 'NroTarjeta'
    }
}, {
    tableName: 'ordenes',
    timestamps: true
});

export default Orden;