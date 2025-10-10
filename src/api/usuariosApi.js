const usuarios = [{
    id: 1,
    username: "admin",
    password: "admin123",
    nombre: "",
    apellido: "",
    correo: "",
    rol: "admin"
}, 
{
    id: 2,
    username: "usuario",
    password: "usuario123",
    nombre: "Nombre",
    apellido: "Apellido",
    correo: "correo@example.com",
    rol: "user"
}]

const get = () => usuarios;
const modify = (newUser, pos) => usuarios[pos] = newUser;

const usuariosApi = { get, modify }


export default usuariosApi;