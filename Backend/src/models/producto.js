import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Producto = sequelize.define('producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    },
    // --- NUEVO CAMPO OBLIGATORIO SEGÚN TU IMAGEN ---
    marca: {
        type: DataTypes.STRING,
        allowNull: false, // Asumo que es obligatorio
        defaultValue: 'Genérico'
    },
    // -----------------------------------------------
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { min: 0 }
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { min: 0 }
    },
    // Extras necesarios para la App Web
    img: {
        type: DataTypes.STRING,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    // Mantenemos la categoría porque tu select la usa
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: true 
    }
}, {
    tableName: 'productos',
    timestamps: true
});

export default Producto;