import repository from '../repositories/series.js';

const findAll = async (req, res) => {
    try {
        const series = await repository.findAll();
        // Si no hay series, devolvemos un array vacío [], que es un 200 OK válido
        return res.status(200).json(series || []);
    } catch (error) {
        console.error("Error en findAll series:", error);
        return res.status(500).json({ message: "Error al obtener las series." });
    }
};

const findById = async (req, res) => {
    try {
        const { id } = req.params;
        const serie = await repository.findById(id);

        if (!serie) {
            return res.status(404).json({ message: "Serie no encontrada." });
        }

        return res.status(200).json(serie);
    } catch (error) {
        console.error("Error en findById serie:", error);
        return res.status(500).json({ message: "Error al obtener la serie." });
    }
};

const create = async (req, res) => {
    try {
        const nuevaSerie = await repository.create(req.body);

        if (!nuevaSerie) {
            return res.status(400).json({ message: "No se pudo crear la serie. Verifique los datos." });
        }

        // 201 Created es el estándar correcto para creación
        return res.status(201).json(nuevaSerie);
    } catch (error) {
        console.error("Error en create serie:", error);
        return res.status(500).json({ message: "Error interno al crear la serie." });
    }
};

const controller = { findAll, findById, create };
export default controller;