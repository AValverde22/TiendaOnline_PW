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
        // Usamos TEXT para permitir descripciones largas (más de 255 caracteres)
        type: DataTypes.TEXT,
        allowNull: true
    },
    precio: {
        // DECIMAL es vital para dinero. (10, 2) significa 10 dígitos totales, 2 decimales.
        // Ejemplo máximo: 99999999.99
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0 // No permitir precios negativos
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
    // Aunque Sequelize la crea sola en las asociaciones, es buena práctica 
    // definirla aquí para saber que existe y poder pasarla al crear el producto.
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false // Todo producto DEBE tener una categoría
        // references: { model: 'categorias', key: 'id' } // Opcional, Sequelize lo maneja en asociaciones
    },
    serieId: {
        type: DataTypes.INTEGER,
        allowNull: true // No todos los productos pertenecen a una serie
    }
}, {
    tableName: 'productos',
    timestamps: true // Crea createdAt y updatedAt
});

export default Producto;