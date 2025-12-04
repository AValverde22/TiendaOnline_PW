import Sequelize from 'sequelize';
import 'dotenv/config'; // Importante: Carga las variables del .env

// Usamos la variable de entorno DATABASE_URL que definimos en el .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Necesario para que funcione en Neon/AWS
        }
    },
    logging: false // Opcional: ponlo en true si quieres ver las consultas SQL en la consola
});

export default sequelize;