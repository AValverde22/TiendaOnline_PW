import model from '../models/usuario.js'
import RepositoryBase from './RepositoryBase.js'

const repository = new RepositoryBase(model);

repository.findByUsername = async function (username) {
    try {
        return await model.findOne({where: {username: username}})
    } catch (error) {
        console.log('Error en findByUsername');
        console.log(error);
        return null;
    }
}   

repository.findByEmail = async function (email) {
    try {
        return await model.findOne({where: {correo: email}})
    } catch (error) {
        console.log('Error en findByEmail');
        console.log(error);
        return null;
    }
}

// falta getTotalSpent()

export default repository;