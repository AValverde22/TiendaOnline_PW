import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import categoriasApi from "../../api/categoriasApi"

import './ListarCategorias.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Categorias = () => {
    const categoriasOriginales = categoriasApi.get();

    const [ categorias, setCategorias ] = useState(categoriasOriginales);
    const [ textoBusqueda, setTextoBusqueda ] = useState("");
    const [ administrador, setAdministrador ] = useState({});

    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("usuarioLogueado"));

        if(!admin || admin.rol !== "admin") {
            alert("¡No es administrador!");
            navigate("/");
        } else setAdministrador(admin);
    }, [])
    
    useEffect(() => {
        if(textoBusqueda === "") setCategorias(categoriasOriginales);
        else handleBuscar();            
    }, [textoBusqueda]);

    const handleBuscar = () => {
        const filtrados = categoriasOriginales.filter(
            (item) => 
                item.id == textoBusqueda || 
                item.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
                item.descripcion.toLowerCase().includes(textoBusqueda.toLowerCase())
            );

        setCategorias(filtrados);
    }

    const navigate = useNavigate();
    const DirigirseAgregarCategoria = () => navigate("/AgregarCategoria");

    const DirigirseDetalleCategoria = (id) => {
        localStorage.setItem("ID_Categoria", id);
        navigate("/DetalleDeCategoria");
    }

    const EliminarCategoria = (id) => {
        categoriasApi.eliminar(id);
        setCategorias(categoriasApi.get()); 
    }

    if(!administrador || administrador.rol !== "admin"){
        return (
            <>
                <Header />
                <><h1>No tienes permiso para ver esta página.</h1></>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header/>
                 <div class="ListarCategoria">
                    <h1>Listado de categorías</h1>

                    <div class="grid-container-ListarCategoria">
                        <input type="text" placeholder='Buscar categoría' value = {textoBusqueda} 
                            onChange = {(event) => setTextoBusqueda(event.target.value)}/>
                        <button class="BotonExterno" onClick = {() => DirigirseAgregarCategoria()}>Agregar Categoría</button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th class="LCId">ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>   
                                <th class="LCAcciones">Acciones</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categorias.map((c) => {
                                    return (
                                        <tr>
                                            <td class="LCId">{c.id}</td>
                                            <td>{c.nombre}</td>
                                            <td class="descripcion">{c.descripcion}</td>
                                            <td class="LCAcciones">
                                                <div class="grid-container-td-ListarCategorias">
                                                    <img 
                                                        onClick = {() => DirigirseDetalleCategoria(c.id)} 
                                                        src="https://www.supercoloring.com/sites/default/files/styles/coloring_thumbnail/public/cif/2022/01/1257-pencil-emoji-coloring-page.png" 
                                                    />
                                                    <img 
                                                        onClick = {() => EliminarCategoria(c.id)} 
                                                        src="https://media.istockphoto.com/id/928418914/es/vector/bote-de-basura-basurero-icono-de-la-papelera.jpg?s=612x612&w=0&k=20&c=rBQCvIJdlIUOaYlpEK_86WD3i7wsyLIQ6C1tjYxrTTQ="
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>      
            <Footer/>  
        </>    
    );
};

export default Categorias;
