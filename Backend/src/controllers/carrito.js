import repository from '#repositories/carrito.js';

const findByUser = async (req, res) => {
    try {
        const idUsuario = req.userId;
        const carrito = await repository.findByUser(idUsuario);
        return res.status(200).json(carrito || { items: [] });
    } catch (error) {
        console.error("Error en findByUser carrito:", error);
        return res.status(500).json({ message: "Error al recuperar carrito." });
    }
};

const addItem = async (req, res) => {
    try {
        const idUsuario = req.userId;
        const { idProducto, cantidad } = req.body;
        const result = await repository.addItem(idUsuario, idProducto, cantidad);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error en addItem:", error);
        return res.status(500).json({ message: "Error al agregar producto." });
    }
};

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        const result = await repository.updateItem(id, cantidad);

        if (!result) {
            return res.status(404).json({ message: "Item no encontrado." });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error en updateItem:", error);
        return res.status(500).json({ message: "Error al actualizar item." });
    }
};

const removeItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await repository.removeItem(id);

        if (result) {
            return res.status(200).json({ message: "Item eliminado correctamente." });
        } else {
            return res.status(404).json({ message: "Item no encontrado." });
        }
    } catch (error) {
        console.error("Error en removeItem:", error);
        return res.status(500).json({ message: "Error al eliminar item." });
    }
};

const clearCart = async (req, res) => {
    try {
        const idUsuario = req.userId;
        await repository.clearCart(idUsuario);
        return res.status(200).json({ message: "Carrito vaciado correctamente." });
    } catch (error) {
        console.error("Error en clearCart:", error);
        return res.status(500).json({ message: "Error al vaciar carrito." });
    }
};

const controller = {
    findByUser,
    addItem,
    updateItem,
    removeItem,
    clearCart
};

export default controller;
