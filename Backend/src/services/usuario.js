import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import repository from '#repositories/usuario.js';

// RECOMENDACIÓN: Mueve esto a un archivo .env en producción
const SECRET_KEY = "SUPER_CLAVE_123";

// ------------------------------
const generarToken = (usuario) => {
    return jwt.sign(
        { id: usuario.id, username: usuario.username, rol: usuario.rol },
        SECRET_KEY,
        { expiresIn: '7d' }
    );
};
// ------------------------------

const registrar = async (datosUsuario) => {
    try {
        const { correo, username, password, nombre, apellido } = datosUsuario;

        // Validaciones básicas
        if (!correo || !username || !password || !nombre || !apellido) {
            return { success: false, message: 'Faltan campos obligatorios.' };
        }

        // 1. ENCRIPTAR CONTRASEÑA (¡CRÍTICO!)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Prepara el objeto para guardar
        // Nota: No definimos createdAt/updatedAt manualmente, Sequelize lo hace solo.
        const nuevoUsuario = {
            ...datosUsuario,
            password: hashedPassword, // Guardamos la versión encriptada
            // Asegúrate de enviar valores por defecto para campos obligatorios si faltan
            rol: 'USER',
            estado: 'ACTIVO'
        };

        const usuarioCreado = await repository.create(nuevoUsuario);

        // Generamos el token inmediatamente para que el usuario quede logueado
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
        // Manejo de error de duplicados (username o correo ya existen)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return { success: false, message: 'El correo o username ya están registrados.' };
        }
        console.error("Error en servicio registrar:", error);
        return { success: false, message: error.message };
    }
};

const login = async ({ correo, password }) => {
    try {
        if (!correo || !password) {
            return { success: false, message: 'Usuario y/o contraseña requeridos.' };
        }

        const usr = await repository.findByEmail(correo);
        if (!usr) return { success: false, message: 'Credenciales inválidas.' };

        // Comparamos password plano (input) contra password hasheado (BD)
        const isPasswordValid = await bcrypt.compare(password, usr.password);

        if (!isPasswordValid) return { success: false, message: 'Credenciales inválidas.' };

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
                correo: usr.correo,
                rol: usr.rol,
                img: usr.img
            }
        };
    } catch (error) {
        console.error("Error en servicio login:", error);
        return { success: false, message: "Error interno del servidor" };
    }
};

const findAll = async () => {
    return await repository.findAll();
};

const findById = async (id) => {
    const user = await repository.findById(id);
    if (!user) return { success: false, message: "Usuario no encontrado." };
    return { success: true, data: user };
};

const update = async (id, datos) => {
    // IMPORTANTE: Si el usuario está actualizando su contraseña, debemos hashearla de nuevo
    if (datos.password) {
        const salt = await bcrypt.genSalt(10);
        datos.password = await bcrypt.hash(datos.password, salt);
    }

    const updated = await repository.update(id, datos);

    if (!updated) {
        return { success: false, message: "Usuario no encontrado o no se pudo actualizar." };
    }

    return { success: true, usuario: updated };
};

export default { registrar, login, findAll, findById, update };