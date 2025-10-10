import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import usuariosApi from '../../api/usuariosApi'

import FormModificarDatos from './Formularios/FormModificarDatos';

const ModificarDatosUsuario = () => {
    const usuarioPrueba = {
        id: 2,
        username: "usuario",
        password: "usuario123",
        nombre: "Nombre",
        apellido: "Apellido",
        correo: "correo@example.com",
        rol: "user"
    };

    const usuarios = usuariosApi.get();
    const [ usuario, setUsuario ] = useState(usuarioPrueba);

    /* DESACTIVADO POR EL MOMENTO
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("Usuario"));

        if(!user) {
            alert("¡No ha iniciado sesión!");
            navigate("");
        } else setUsuario(user);

    }, [])
    */

    const navigate = useNavigate();
    const handleCancel = () => navigate("www.google.com");

    const handleSubmit = (user) => {
        for(let i = 0; i < usuarios.length; i++) {if(usuarios[i].id === user.id) usuariosApi.modify(user, i);}
        navigate("/Todos");
    }

    return (<FormModificarDatos onSubmit = { handleSubmit } user = { usuario } onCancel = { handleCancel }/>);
};

export default ModificarDatosUsuario;