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
        unique: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'categorias',
    timestamps: true
});

export default Categoria;
