import model from '../models/categoria.js'
import RepositoryBase from './RepositoryBase.js'

const repository = new RepositoryBase(model);

repository.findByName = async function (name) {
    try {
        return await model.findOne({where: {nombre: name}})
    } catch (error) {
        console.log('Error en findByName');
        console.log(error);
        return null;
    }
}

export default repository;