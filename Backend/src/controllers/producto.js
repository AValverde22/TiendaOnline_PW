import repository from '../repositories/producto.js'

const findAll = async (req, res) => {
    const respuesta = await repository.findAll();
    return sendResults(respuesta, res, "No se han encontrado registros.");
}

// CORREGIDO: Renombrado de findOne a findById para coincidir con la ruta
const findById = async (req, res) => {
    const id = req.params.id;
    const result = await repository.findById(id); 
    return sendResults(result, res, "Producto no encontrado.");
}

// NUEVO: Agregado para coincidir con la ruta /categoria/:nombreCategoria
const findByCategoria = async (req, res) => {
    const { nombreCategoria } = req.params;
    // Llamamos a la función especial que creaste en el repositorio
    const result = await repository.findAllByCategoryName(nombreCategoria);
    
    return sendResults(result, res, "No se encontraron productos en esta categoría.");
}

const create = async (req, res) => {
    const object = req.body;
    const createObj = await repository.create(object);
    return sendResults(createObj, res, "Error al crear el objeto.");
}

const update = async (req, res) => {
    const id = req.params.id;
    const object = req.body;
    const updatedObj = await repository.update(id, object);
    return sendResults(updatedObj, res, "Error al actualizar el objeto.");
}

const remove = async (req, res) => {
    const id = req.params.id;
    // Asegúrate que tu RepositoryBase tenga el método .remove o .delete
    const result = await repository.remove(id); 
    return sendResults(result, res, "Error al eliminar el objeto.");
}

// Función auxiliar para no repetir código
const sendResults = (result, res, message) => {
    if (result) return res.status(200).json(result);
    else return res.status(500).json({ message });
}

// EXPORTACIÓN CORREGIDA: Ahora incluye findById y findByCategoria
const controller = { 
    findAll, 
    findById, 
    findByCategoria, 
    create, 
    update, 
    remove 
};

export default controller;