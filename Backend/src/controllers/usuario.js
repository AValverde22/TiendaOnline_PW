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

const findAll = async (req, res) => {
    try {
        const users = await usuarioService.findAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return res.status(500).json({
            success: false,
            message: "Error al recuperar los usuarios."
        });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        // Validar que el ID existe
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID de usuario requerido."
            });
        }

        // Llamar al servicio para actualizar
        const resultado = await usuarioService.update(id, datos);

        if (!resultado.success) {
            return res.status(404).json(resultado);
        }

        return res.status(200).json(resultado);
    } catch (error) {
        console.error("Error en update:", error);
        return res.status(500).json({
            success: false,
            message: "Error al actualizar usuario."
        });
    }
};

const controller = { registrar, login, update, findAll };
export default controller;