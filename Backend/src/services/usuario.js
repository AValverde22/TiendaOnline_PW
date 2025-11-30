// Backend/src/services/usuario.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import repository from '../repositories/usuario.js';

const SECRET_KEY = "SUPER_CLAVE_123"; 
// --------------------------------

const generarToken = (usuario) => {
    return jwt.sign(
        { id: usuario.id, username: usuario.username, rol: usuario.rol },
        SECRET_KEY,
        { expiresIn: '7d' }
    );
}

const registrar = async (datosUsuario) => {
    try {
        const { correo, username, password, nombre, apellido } = datosUsuario;

        if (!correo || !username || !password || !nombre || !apellido) {
            return { success: false, message: 'Faltan campos obligatorios.' };
        }

        const nuevoUsuario = {
            ...datosUsuario,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const usuarioCreado = await repository.create(nuevoUsuario);
        const token = generarToken(usuarioCreado);

        return {
            success: true,
            message: "Usuario creado exitosamente.",
            token,
            usuario: {
                id: usuarioCreado.id,
                username: usuarioCreado.username,
                nombre: usuarioCreado.nombre,
                rol: usuarioCreado.rol
            }
        };
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return { success: false, message: 'El correo o username ya están registrados.' };
        }
        return { success: false, message: error.message };
    }
};

const login = async ({ correo, password }) => {
    try {
        if (!correo || !password) {
            return { success: false, message: 'Usuario y/o contraseña requeridos.' };
        }

        const usr = await repository.findByEmail(correo);

        if (!usr) {
            return { success: false, message: 'Credenciales inválidas.' };
        }

        const isPasswordValid = await bcrypt.compare(password, usr.password);

        if (!isPasswordValid) {
            return { success: false, message: 'Credenciales inválidas.' };
        }

        const token = generarToken(usr);

        return {
            success: true,
            message: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usr.id,
                nombre: usr.nombre,
                apellido: usr.apellido,
                username: usr.username,
                rol: usr.rol,
                img: usr.img
            }
        };
    } catch (error) {
        return { success: false, message: "Error interno del servidor" };
    }
};

const findAll = async () => {
    try {
        return await repository.findAll();
    } catch (error) {
        throw error;
    }
};

const update = async (id, datos) => {
    try {
        const usuarioActualizado = await repository.update(id, datos);
        if (!usuarioActualizado) return { success: false, message: "Usuario no encontrado." };
        return { success: true, message: "Usuario actualizado.", usuario: usuarioActualizado };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const usuarioService = { registrar, login, findAll, update };
export default usuarioService;