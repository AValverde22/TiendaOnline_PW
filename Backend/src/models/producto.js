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
        validate: {
            notEmpty: true // Evita guardar nombres vacíos ""
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0 // No permitir stock negativo
        }
    },
    img: {
        type: DataTypes.STRING, // Guardarás la URL de la imagen
        allowNull: true
    },
    // Estado para "Borrado Lógico": Si dejas de venderlo, lo pones false en vez de borrar el registro
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    // === LLAVE FORÁNEA EXPLÍCITA ===
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false // Todo producto DEBE tener una categoría
    },
    serieId: {
        type: DataTypes.INTEGER,
        allowNull: true // No todos los productos pertenecen a una serie
    }
}, {
    tableName: 'productos',
    timestamps: true
});

export default Producto;