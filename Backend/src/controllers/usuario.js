import usuarioService from '../services/usuario.js';

const registrar = async (req, res) => {
    try {
        // Pasamos todo el body al servicio
        const response = await usuarioService.registrar(req.body);

        if (response.success) {
            return res.status(201).json(response);
        } else {
            // Si falla (ej. correo duplicado o faltan datos) devolvemos 400
            return res.status(400).json(response);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error inesperado en el servidor."
        });
    }
};

const login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const result = await usuarioService.login({ correo, password });

        if (result.success) {
            return res.status(200).json(result);
        } else {
            // Error de credenciales -> 401 Unauthorized
            return res.status(401).json(result);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor."
        });
    }
};

// Asumiendo que quisieras un update básico también
const update = async (req, res) => {
    // Implementación pendiente en servicio, pero dejamos la estructura
    return res.status(501).json({ message: "No implementado aún" });
}

const controller = { registrar, login, update };
export default controller;