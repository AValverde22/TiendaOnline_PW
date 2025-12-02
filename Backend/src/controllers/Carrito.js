import carritoRepository from "../repositories/carrito.js";
import itemRepository from "../repositories/itemCarrito.js"; // Necesitamos este para manejar los productos dentro

// 1. Ver el carrito del usuario (GET)
const verCarrito = async (req, res) => {
    try {
        // Obtenemos el ID del usuario (puede venir por URL o del token decodificado)
        const { idUsuario } = req.params;

        if (!idUsuario) {   
            return res.status(400).json({ message: "Se requiere el ID del usuario." });
        }

        // Usamos el método especializado que creamos en el repositorio
        let carrito = await carritoRepository.findByUserId(idUsuario);

        // Si no tiene carrito, devolvemos un objeto con items vacío para que el front no falle
        if (!carrito) {
            return res.status(200).json({ items: [] });
        }

        return res.status(200).json(carrito);
    } catch (error) {
        console.error("Error en verCarrito:", error);
        return res.status(500).json({ message: "Error al cargar el carrito." });
    }
};

// 2. Agregar un ítem al carrito (POST)
const agregarItem = async (req, res) => {
    try {
        const { idUsuario, idProducto, cantidad } = req.body;

        if (!idUsuario || !idProducto) {
            return res.status(400).json({ message: "Faltan datos (usuario o producto)." });
        }

        // A. Buscar si el usuario ya tiene un carrito
        let carrito = await carritoRepository.findByUserId(idUsuario);

        // B. Si no tiene carrito, lo creamos
        if (!carrito) {
            carrito = await carritoRepository.create({ idUsuario });
        }

        // C. Verificar si el producto YA existe en ese carrito
        // Nota: carrito.id es el ID de la tabla carritos
        const itemExistente = await itemRepository.obtenerItem(carrito.id, idProducto);

        if (itemExistente) {
            // CASO 1: Ya existe -> Actualizamos la cantidad (sumamos)
            const nuevaCantidad = itemExistente.cantidad + (cantidad || 1);
            await itemRepository.actualizarCantidad(itemExistente.id, nuevaCantidad);
            return res.status(200).json({ message: "Cantidad actualizada correctamente." });
        } else {
            // CASO 2: No existe -> Creamos el ítem nuevo
            await itemRepository.agregarProducto(carrito.id, idProducto, cantidad || 1);
            return res.status(201).json({ message: "Producto agregado al carrito." });
        }

    } catch (error) {
        console.error("Error en agregarItem:", error);
        return res.status(500).json({ message: "Error al agregar producto al carrito." });
    }
};

// 3. Eliminar un ítem específico del carrito (DELETE)
const eliminarItem = async (req, res) => {
    try {
        // Aquí esperamos el ID de la tabla item_carrito (no del producto)
        const { id } = req.params; 

        const resultado = await itemRepository.remove(id);

        if (resultado) {
            return res.status(200).json({ message: "Ítem eliminado del carrito." });
        } else {
            return res.status(404).json({ message: "Ítem no encontrado." });
        }
    } catch (error) {
        console.error("Error en eliminarItem:", error);
        return res.status(500).json({ message: "Error al eliminar el ítem." });
    }
};

// 4. Actualizar cantidad exacta de un ítem (PUT)
// Útil cuando el usuario cambia el número en el input manualmente (ej: de 1 a 5)
const updateCantidad = async (req, res) => {
    try {
        const { id, cantidad } = req.body; // id es el ID del ITEM (no producto), cantidad nueva

        if (!id || !cantidad) {
            return res.status(400).json({ message: "Faltan datos (id item o cantidad)." });
        }

        // Usamos el repositorio de items para actualizar directo
        const itemActualizado = await itemRepository.actualizarCantidad(id, cantidad);

        if (itemActualizado) {
            return res.status(200).json({ message: "Cantidad actualizada.", item: itemActualizado });
        } else {
            return res.status(404).json({ message: "No se encontró el ítem." });
        }
    } catch (error) {
        console.error("Error en updateCantidad:", error);
        return res.status(500).json({ message: "Error al actualizar cantidad." });
    }
};

// Exportamos las funciones específicas
const controller = { 
    verCarrito, 
    agregarItem, 
    eliminarItem,
    updateCantidad
};

export default controller;