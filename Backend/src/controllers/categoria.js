import repository from '#repositories/categoria.js';

const findAll = async (req, res) => {
    try {
        const respuesta = await repository.findAll();
        // Devolvemos 200 y array vacío si no hay datos, es lo estándar
        return res.status(200).json(respuesta || []);
    } catch (error) {
        console.error("Error en findAll categorías:", error);
        return res.status(500).json({ message: "Error al recuperar categorías." });
    }
};

const findById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await repository.findById(id);

        if (!result) {
            return res.status(404).json({ message: "Categoría no encontrada." });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error en findById categoría:", error);
        return res.status(500).json({ message: "Error al buscar la categoría." });
    }
};

const findByName = async (req, res) => {
    try {
        const { name } = req.params;
        const result = await repository.findByName(name);

        if (!result) {
            return res.status(404).json({ message: "No existe una categoría con ese nombre." });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error en findByName:", error);
        return res.status(500).json({ message: "Error al buscar por nombre." });
    }
};

const create = async (req, res) => {
    try {
        const object = req.body;
        const createObj = await repository.create(object);

        if (!createObj) {
            return res.status(400).json({ message: "No se pudo crear la categoría." });
        }

        return res.status(201).json(createObj); // 201 Created
    } catch (error) {
        console.error("Error en create categoría:", error);
        return res.status(500).json({ message: "Error interno al crear categoría." });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedObj = await repository.update(id, req.body);

        if (!updatedObj) {
            return res.status(404).json({ message: "Categoría no encontrada para actualizar." });
        }

        return res.status(200).json(updatedObj);
    } catch (error) {
        console.error("Error en update categoría:", error);
        return res.status(500).json({ message: "Error al actualizar categoría." });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        // CORREGIDO: Usamos .remove() porque así se llama en tu RepositoryBase
        const result = await repository.remove(id);

        if (result) {
            return res.status(200).json({ message: "Categoría eliminada correctamente." });
        } else {
            return res.status(404).json({ message: "Categoría no encontrada." });
        }
    } catch (error) {
        console.error("Error en remove categoría:", error);
        return res.status(500).json({ message: "Error al eliminar categoría." });
    }
};

const controller = {
    findAll,
    findById, // Renombrado de findOne a findById para consistencia
    findByName,
    create,
    update,
    remove
};

export default controller;