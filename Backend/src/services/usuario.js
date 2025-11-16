import jwt from 'jsonwebtoken'
import bcyrpt from 'bcryptjs'

import repository from '../repositories/usuario.js'
import { cp } from 'fs';

const generarToken = (nombre, usuario) => {
    return jwt.sign({nombre, usuario},
        'SeSuponeQueAquiDeberiaDeIrUnTokenXDDD',
        { expiresIn: '7d' }
    );
}

const registrar = async ({ correo, username, password, nombre, apellido, rol, estado, direccion, telefono, distrito, img }) => {
    try {
        if (!correo || !username || !password || !nombre || !apellido || !estado || !direccion || !telefono || !distrito || !img) {
            return {
                success: false, 
                message: 'Proporcione los campos requeridos.'
            }
        }

        const salt = await bcyrpt.genSalt(10);
        const hashedPassword = await bcyrpt.hash(password, salt);

        const nuevoUsuario = {
            correo,
            username,
            password,
            nombre, 
            apellido,
            rol, 
            direccion,
            telefono, 
            distrito,
            img,
            createdAt: new Date()
        }

        console.log(nuevoUsuario);

        const usuarioCreado = await repository.create(nuevoUsuario);
        const token = generarToken(nombre, username);

        return {
            success: true,
            message: "Usuario creado exitosamente.",
            token,
            usuario: usuarioCreado 
        }
    } catch (error) {
        console.log('Error al registrar usuario.');
        console.debug(error);
        return null;
    }
};

const login = async ({correo, password}) => {
    console.log({correo, password});

    if(!correo || !password) {
        return {
            success: false,
            message: 'Usuario y/o contraseña incorrectos.'
        }
    }

    const usr = await repository.findByEmail(correo);
    console.log('USR: ');
    console.log(usr);
    if(!usr) {
        return {
            success: false,
            message: 'Usuario y/o contraseña incorrectos.'
        }
    }

    console.log({password, op: usr.password});
    const isPasswordValid = await bcyrpt.compare(password, usr.password);
    console.log(isPasswordValid);

    if(!isPasswordValid) {
        return {
            success: false,
            message: 'Usuario y/o contraseña incorrectos.'
        }
    }

    const token = generarToken(usr.nombre, usr.usuario);

    return {
        success: true,
        message: 'Inicio de sesión exitoso',
        token,
        usuario: {...usr}
    }
};

const usuarioService = { registrar, login };
export default usuarioService;