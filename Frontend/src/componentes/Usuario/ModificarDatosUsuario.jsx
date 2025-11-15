import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import usuariosApi from '../../api/usuariosApi'

import FormModificarDatos from './Formularios/FormModificarDatos';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const ModificarDatosUsuario = () => {
    const usuarioPrueba = {
        id: 2,
        username: "usuario",
        password: "usuario123",
        nombre: "Nombre",
        apellido: "Apellido",
        correo: "correo@example.com",
        img: "https://ih1.redbubble.net/image.2758100916.0157/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
        rol: "user"
    };

    const usuarios = usuariosApi.get();
    const [ usuario, setUsuario ] = useState(usuarioPrueba);

   useEffect(() => {
        const user = JSON.parse(localStorage.getItem("usuarioLogueado"));
        
        if(user && user.rol == "user") {setUsuario(user);}
        else{
            alert("¡No es cliente!");
            navigate("/");
        } 

    }, [])

    const navigate = useNavigate();
    const handleCancel = () => navigate("/");

    const handleSubmit = (user) => {
        for(let i = 0; i < usuarios.length; i++) {if(usuarios[i].id == user.id) {usuariosApi.modify(user, i);}}
        localStorage.setItem('usuarioLogueado', JSON.stringify(user));
        navigate("/");
    }

    if(!usuario || usuario.rol !== "user"){
        return (
            <>
                <Header />
                <><h1>No tienes permiso para ver esta página.</h1></>
                <Footer />
            </>
        );
    }    

    return (
        <div>
            <Header/>
            {<FormModificarDatos onSubmit = { handleSubmit } user = { usuario } onCancel = { handleCancel }/>}
            <Footer/>
        </div>
    );
};

export default ModificarDatosUsuario;