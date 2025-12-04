import repository from '../repositories/producto.js'

const findAll = async (req, res) => {
    try {
        const respuesta = await repository.findAll();
        // Si no hay productos, devolvemos array vacío [] con status 200 (Es correcto)
        return res.status(200).json(respuesta || []);
    } catch (error) {
        console.error("Error en findAll productos:", error);
        return res.status(500).json({ message: "Error al recuperar el catálogo." });
    }
}

const findById = async (req, res) => {
    try {
        const { id } = req.params; // Destructuring es más limpio
        const result = await repository.findById(id);

        if (!result) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error en findById producto:", error);
        return res.status(500).json({ message: "Error al buscar el producto." });
    }
}

const findByCategoria = async (req, res) => {
    try {
        const { nombreCategoria } = req.params;
        const result = await repository.findAllByCategoryName(nombreCategoria);

        // Si la categoría existe pero no tiene productos, devuelve array vacío (200 OK)
        return res.status(200).json(result || []);
    } catch (error) {
        console.error("Error en findByCategoria:", error);
        return res.status(500).json({ message: "Error al filtrar por categoría." });
    }
}

const create = async (req, res) => {
    try {
        // Validar datos básicos aquí si es necesario
        const createObj = await repository.create(req.body);

        if (!createObj) {
            return res.status(400).json({ message: "No se pudo crear el producto. Verifique los datos." });
        }

        return res.status(201).json(createObj); // 201 = Created
    } catch (error) {
        console.error("Error en create producto:", error);
        return res.status(500).json({ message: "Error interno al crear producto." });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedObj = await repository.update(id, req.body);

        if (!updatedObj) {
            return res.status(404).json({ message: "Producto no encontrado o no se pudo actualizar." });
        }

        return res.status(200).json(updatedObj);
    } catch (error) {
        console.error("Error en update producto:", error);
        return res.status(500).json({ message: "Error al actualizar producto." });
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await repository.remove(id);

        if (deleted) {
            return res.status(200).json({ message: "Producto eliminado correctamente", id });
        } else {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (err) {
        console.error("Error en remove producto:", err);
        return res.status(500).json({ message: "Error al eliminar el producto", debug_info: err.message });
    }
};

// Exportación
export default {
    findAll,
    findById,
    findByCategoria,
    create,
    update,
    remove
};