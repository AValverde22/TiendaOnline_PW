import repository from '../repositories/series.js';

const findAll = async (req, res) => {
    const data = await repository.findAll();
    return sendResults(data, res, "No se encontraron series.");
};

const findById = async (req, res) => {
    const { id } = req.params;
    const data = await repository.findById(id);
    return sendResults(data, res, "Serie no encontrada.");
};

const create = async (req, res) => {
    const data = await repository.create(req.body);
    return sendResults(data, res, "Error al crear la serie.");
};

// Helper para responder
const sendResults = (result, res, errorMsg) => {
    if (result) return res.status(200).json(result);
    else return res.status(404).json({ message: errorMsg });
};

const controller = { findAll, findById, create };
export default controller;