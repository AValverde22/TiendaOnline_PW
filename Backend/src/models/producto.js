import sequelize from '#config/database.js';
import { DataTypes } from 'sequelize';

// Nota: No importamos Categoria ni Serie aquí. (Modelo Puro)

const Producto = sequelize.define('productos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Genérico'
    },
    descripcion: {
        type: DataTypes.TEXT // Perfecto para descripciones largas
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2), // Perfecto para moneda
        allowNull: false
    },
    img: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    // CAMBIO SUGERIDO: Estandarización de nombres (idEntidad)
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'idCategoria' // Nombre de la columna física en la BD
    },
    idSerie: { // Asumiendo que usarás Series
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'idSerie'
    }
}, {
    tableName: 'productos',
    timestamps: true
});

export default Producto;