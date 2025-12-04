import repository from '../repositories/usuario.js';
import usuarioService from '../services/usuario.js';

const registrar = async (req, res) => {
    try {
        const response = await usuarioService.registrar(req.body);
        return res.status(response.success ? 201 : 400).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error inesperado en el servidor." });
    }
};

const login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const result = await usuarioService.login({ correo, password });
        return res.status(result.success ? 200 : 401).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
};

const findAll = async (req, res) => {
    try {
        const users = await repository.findAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return res.status(500).json({ success: false, message: "Error al recuperar los usuarios." });
    }
};

const findById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await repository.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error en findById:", error);
        return res.status(500).json({ success: false, message: "Error al obtener usuario." });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "ID de usuario requerido." });
        }

        // Ahora sí usa el SERVICE
        const resultado = await usuarioService.update(id, datos);

        return res.status(resultado.success ? 200 : 404).json(resultado);

    } catch (error) {
        console.error("Error en update:", error);
        return res.status(500).json({ success: false, message: "Error al actualizar usuario." });
    }
};

export default { registrar, login, update, findAll, findById };
