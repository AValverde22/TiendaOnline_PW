import repository from '../repositories/producto.js';

const findAll = async (req, res) => {
    const data = await repository.findAll();
    return sendResults(data, res, "No hay productos registrados.");
};

const findById = async (req, res) => {
    const { id } = req.params;
    const data = await repository.findById(id);
    return sendResults(data, res, "Producto no encontrado.");
};

// Esta es la función que usará tu página de 'MostrarProductos'
const findByCategoria = async (req, res) => {
    const { nombreCategoria } = req.params;
    const data = await repository.findAllByCategoryName(nombreCategoria);

    return sendResults(data, res, `No se encontraron productos en la categoría: ${nombreCategoria}`);
};

const create = async (req, res) => {
    const data = await repository.create(req.body);
    return sendResults(data, res, "Error al crear producto.");
};

// === NUEVO: UPDATE ===
const update = async (req, res) => {
    const { id } = req.params;
    const data = await repository.update(id, req.body);
    return sendResults(data, res, "Error al actualizar producto.");
};

// === NUEVO: REMOVE ===
const remove = async (req, res) => {
    const { id } = req.params;
    const data = await repository.delete(id);
    return sendResults(data, res, "Error al eliminar producto.");
};

const sendResults = (result, res, errorMsg) => {
    if (result) return res.status(200).json(result);
    else return res.status(404).json({ message: errorMsg });
};

// === IMPORTANTE: AGREGARLAS AL EXPORT ===
const controller = {
    findAll,
    findById,
    findByCategoria,
    create,
    update,
    remove
};

export default controller;