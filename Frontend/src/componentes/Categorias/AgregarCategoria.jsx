import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import productosApi from '../../api/productosApi';

import FormAgregarCategoria from './Formularios/FormAgregarCategoria';
import FormPopUp from './Formularios/FormPopUp';
import '../gridContainer.css'

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const AgregarCategoria = () => {
    const [ administrador, setAdministrador ] = useState({});
    const [ prods, setProductos ] = useState([]);

    const handleOnLoad = async () => {
        const admin = JSON.parse(localStorage.getItem("usuarioLogueado"));

        if(!admin || admin.rol !== "admin") {
            alert("¡No es administrador!");
            navigate("/");
        } else {
            setAdministrador(admin);

            const ps = await productosApi.findAll(admin.token);
            setProductos(ps);
        }
    }

    useEffect(() => {handleOnLoad()}, []);

    const [ cat, setCat ] = useState({});
    const handleSubmit = (categoria) => {
        if (categoria.nombre === "") alert("Debe de colocar un nombre!");
        else {setCat(categoria); abrirPopUp();}
    };

    const [ showPopUp, setShowPopUp] = useState(false);
    const abrirPopUp = () => {document.body.style.backgroundColor = 'rgba(125, 124, 124, 0.87)'; setShowPopUp(true); }
    const cerrarPopUp = () => {document.body.style.backgroundColor = 'whitesmoke'; setShowPopUp(false); }
    const crearCategoria = () => navigate("/Categoria");
    
    const navigate = useNavigate(); 
    const handleCancel = () => navigate("/Categoria");

    return (
    <>
        {(!administrador || administrador.rol !== "admin") ? 
        <>
            <Header/>
            <><h1>No tienes permiso para ver esta página.</h1></>
            <Footer/>
        </>
        :
        <>
            <Header/>
            {!showPopUp && <FormAgregarCategoria onSubmit = { handleSubmit } onCancel = { handleCancel }/>}
            {showPopUp && <FormPopUp cancelar = { cerrarPopUp } categoria = { cat } confirmar = { crearCategoria } productos = { prods }/>} 
            <Footer/>
        </>};
    
    </>);
};

export default AgregarCategoria;