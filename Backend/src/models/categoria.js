import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const Categoria = sequelize.define('categorias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true // Evita strings vacíos ""
        }
    },
    descripcion: {
        type: DataTypes.TEXT, // Cambio sugerido para descripciones largas
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'categorias',
    timestamps: true
});

export default Categoria;