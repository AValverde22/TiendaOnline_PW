import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormAgregarCategoria from './Formularios/FormAgregarCategoria';
import FormPopUp from './Formularios/FormPopUp';
import '../gridContainer.css'

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const AgregarCategoria = () => {

    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("usuarioLogueado"));

        if(!admin || admin.rol !== "admin") {
            alert("¡No es administrador!");
            navigate("/");
        } 

    }, [])


    useEffect(() => {localStorage.removeItem("ID_Categoria");}, [])

    const [ cat, setCat ] = useState({});
    const handleSubmit = (categoria) => {
        if (categoria.nombre === "") alert("Debe de colocar un nombre!");
        else {setCat(categoria); abrirPopUp();}
    };

    const [ showPopUp, setShowPopUp] = useState(false);
    const abrirPopUp = () => {document.body.style.backgroundColor = 'rgba(125, 124, 124, 0.87)'; setShowPopUp(true); }
    const cerrarPopUp = () => {document.body.style.backgroundColor = 'whitesmoke'; setShowPopUp(false); }
    const crearCategoria = () => navigate("/ListarCategorias");
    
    const navigate = useNavigate(); 
    const handleCancel = () => navigate("/ListarCategorias");
    

    return (
        <>
            <Header/>
            {!showPopUp && <FormAgregarCategoria onSubmit = { handleSubmit } onCancel = { handleCancel }/>}
            {showPopUp && <FormPopUp cancelar = { cerrarPopUp } categoria = { cat } confirmar = { crearCategoria }/>}
            <Footer/>
        </>
    );
};

export default AgregarCategoria;