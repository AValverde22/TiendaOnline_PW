import usuarioService from '../services/usuario.js'

const registrar = async (req, res) => {
    try {
        const {correo, username, password, nombre, apellido, rol, estado, direccion, telefono, distrito, img} = req.body;

        const response = await usuarioService.registrar({correo, username, password, nombre, apellido, rol, estado, direccion, telefono, distrito, img});

        if(response.success) return res.status(201).json(response);
        else return res.status(500).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error inesperado.", error});
    }
}

const login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const result = await usuarioService.login({ correo, password });

        if(result.success) return res.status(200).json(result);
        else return res.status(500).json(result);
    } catch (error) {console.log(error);}
}

const controller = { registrar, login };
export default controller;