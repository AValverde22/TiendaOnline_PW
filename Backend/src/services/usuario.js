import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Asegúrate de haber instalado: npm install bcryptjs
import repository from '../repositories/usuario.js';

const SECRET_KEY = process.env.JWT_SECRET || 'SeSuponeQueAquiDeberiaDeIrUnTokenXDDD';

const generarToken = (usuario) => {
    // Guardamos ID, Username y Rol en el token (útil para el frontend)
    return jwt.sign(
        {
            id: usuario.id,
            username: usuario.username,
            rol: usuario.rol
        },
        SECRET_KEY,
        { expiresIn: '7d' }
    );
}

const registrar = async (datosUsuario) => {
    try {
        const { correo, username, password, nombre, apellido, direccion, telefono, distrito } = datosUsuario;

        // Validación de campos mínimos obligatorios
        if (!correo || !username || !password || !nombre || !apellido) {
            return {
                success: false,
                message: 'Faltan campos obligatorios (correo, username, password, nombre, apellido).'
            };
        }

        // Preparamos el objeto.
        // NOTA: No encriptamos el password aquí porque el Hook del Modelo lo hará.
        const nuevoUsuario = {
            ...datosUsuario, // Copiamos todo (incluyendo img, rol, estado si vienen)
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const usuarioCreado = await repository.create(nuevoUsuario);

        // Generamos token para que el usuario quede logueado al registrarse
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
        console.error('Error en servicio registrar:', error);
        // Manejo de error de duplicados (SequelizeUniqueConstraintError)
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

        // 1. Buscamos el usuario
        const usr = await repository.findByEmail(correo);

        if (!usr) {
            return { success: false, message: 'Credenciales inválidas.' };
        }

        // 2. Comparamos contraseña
        // usr.password viene de la BD (encriptada)
        const isPasswordValid = await bcrypt.compare(password, usr.password);

        if (!isPasswordValid) {
            return { success: false, message: 'Credenciales inválidas.' };
        }

        // 3. Generamos Token
        const token = generarToken(usr);

        // 4. Retornamos datos limpios (sin password)
        return {
            success: true,
            message: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usr.id,
                nombre: usr.nombre,
                apellido: usr.apellido,
                username: usr.username, // CORREGIDO: antes decía usr.usuario
                rol: usr.rol,
                img: usr.img
            }
        };
    } catch (error) {
        console.error("Error en servicio login:", error);
        return { success: false, message: "Error interno del servidor" };
    }
};

const usuarioService = { registrar, login };
export default usuarioService;