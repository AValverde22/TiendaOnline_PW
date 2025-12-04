import ordenRepository from '../repositories/orden.js';

// Crear una nueva orden (POST /api/ordenes)
const crearOrden = async (req, res) => {
    try {
        const payload = req.body;

        // Si el usuario viene desde el token, preferimos usar ese id por seguridad
        if (req.usuario && req.usuario.id) {
            payload.usuarioId = req.usuario.id;
        }

        if (!payload.usuarioId || !payload.items || payload.items.length === 0) {
            return res.status(400).json({ message: 'Faltan datos para crear la orden (usuario o items).' });
        }

        const ordenCreada = await ordenRepository.createFullOrder(payload);

        return res.status(201).json(ordenCreada);
    } catch (error) {
        console.error('Error al crear orden:', error);
        // Si el repository lanzó un objeto con status/message, propagarlo
        if (error && error.status) {
            return res.status(error.status).json({ message: error.message, debug_info: error.debug_info || null });
        }
        return res.status(500).json({ message: 'Error al crear la orden.' });
    }
};

// Obtener una orden por ID (GET /api/ordenes/:id)
const findOne = async (req, res) => {
    try {
        const { id } = req.params;

        const orden = await ordenRepository.findById(id, {
            include: [
                {
                    association: 'detalles'
                }
            ]
        });

        if (!orden) return res.status(404).json({ message: 'Orden no encontrada.' });

        // Seguridad: si no es admin, asegurarse que la orden pertenezca al usuario
        if (req.usuario && req.usuario.rol !== 'ADMIN' && orden.idUsuario !== req.usuario.id) {
            return res.status(403).json({ message: 'Acceso denegado a esta orden.' });
        }

        return res.status(200).json(orden);
    } catch (error) {
        console.error('Error findOne orden:', error);
        return res.status(500).json({ message: 'Error al obtener la orden.' });
    }
};

const controller = { crearOrden, findOne };

export default controller;
