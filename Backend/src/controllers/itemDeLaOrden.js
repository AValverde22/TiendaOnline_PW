import { ItemDeLaOrden, Producto } from '#models/asociaciones.js';
import RepositoryBase from '#repositories/RepositoryBase.js';

const repository = new RepositoryBase(ItemDeLaOrden);

// Obtener todos los items de una orden específica
const findByOrdenId = async (req, res) => {
    try {
        const { idOrden } = req.params;
        if (!idOrden) return res.status(400).json({ message: "Se requiere idOrden." });

        const items = await ItemDeLaOrden.findAll({
            where: { idOrden },
            include: [
                { model: Producto, as: 'producto', attributes: ['id', 'nombre', 'precio'] }
            ]
        });

        return res.status(200).json(items || []);
    } catch (error) {
        console.error("Error en findByOrdenId:", error);
        return res.status(500).json({ message: "Error al obtener los items de la orden." });
    }
};

// Obtener un item específico
const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await repository.findById(id);
        if (!item) return res.status(404).json({ message: "Item no encontrado." });

        return res.status(200).json(item);
    } catch (error) {
        console.error("Error en findOne itemDeLaOrden:", error);
        return res.status(500).json({ message: "Error al buscar el item." });
    }
};

const controller = { findByOrdenId, findOne };

export default controller;
