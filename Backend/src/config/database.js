import Sequelize from 'sequelize'

const hostname = 'localhost';
const username = 'postgres';
const password = 'password';
const database = 'tiendadb';
const port = '5432';
const dialect = 'postgres';

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port: port,
    dialect: dialect
})

export default sequelize;