import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import usuariosApi from '../../api/usuariosApi'

import FormCambiarPassword from './Formularios/FormCambiarPassword';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const CambiarPassword = () => {
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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("usuarioLogueado"));

        if(user && user.rol == "user") setUsuario(user);
        else{
            alert("¡No es cliente!");
            navigate("/");
        } 

    }, [])

    const navigate = useNavigate();
    const handleCancel = () => navigate("/");

    const handleSubmit = (user) => {
        for(let i = 0; i < usuarios.length; i++) {if(usuarios[i].id === user.id) usuariosApi.modify(user, i);}
        navigate("/");
    }

    return (
        <div>
            <Header/>
            <FormCambiarPassword onSubmit = { handleSubmit } user = { usuario } onCancel = { handleCancel }/>
            <Footer/>
        </div>
   

);
};

export default CambiarPassword;