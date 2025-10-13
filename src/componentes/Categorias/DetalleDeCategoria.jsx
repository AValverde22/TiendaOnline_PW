import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import categoriasApi from "../../api/categoriasApi";
import productosApi from '../../api/productosApi';

import GameCard from '../GameCard/GameCard';
import './DetalleDeCategoria.css'


const Detalle = () => {
    const [ ID_Categoria, setID_Categoria ] = useState("");
    const [ categorias, setCategorias ] = useState([]);
    const [ categoriaEsp, setCategoriaEsp ] = useState(null);
    const [ todosLosProductos, setTodosLosProductos ] = useState([]);
    const [ productosFiltrados, setProductosFiltrados ] = useState([]);

   /* DESACTIVADO POR EL MOMENTO
    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("Usuario"));

        if(!admin || admin.rol !== "admin") {
            alert("¡No es administrador!");
            navigate("/");
        } 

    }, [])
    */

    useEffect(() => {
        const ID = localStorage.getItem("ID_Categoria");
        setID_Categoria(ID);

        const categoriasUE = categoriasApi.get();
        setCategorias(categoriasUE);

        const categoriaUE = categoriasUE.find((item) => item.id == ID);
        setCategoriaEsp(categoriaUE);

        const allProducts = productosApi.get();
        setTodosLosProductos(allProducts);

        const productosPorCategoria = allProducts.filter((item) => item.ID_Categoria == ID);
        setProductosFiltrados(productosPorCategoria);
    }, []);

    const navigate = useNavigate();
    const DirigirseListarCategoria = () => {navigate("/ListarCategorias"); localStorage.removeItem("ID_Categoria");}
    const IrAInicio = () => navigate("www.google.com");

    return (
        <>  
            <div class="grid-container-DDC">
                <button class="BotonExterno" onClick = {() => DirigirseListarCategoria()}>Listado de Categorias</button>
                <button class="BotonExterno" onClick = {() => IrAInicio()}>Inicio</button>
            </div>

            {categoriaEsp ? 
            (
                <>
                    <div class="DetalleDeCategoriaParent">
                        <div class="DetalleDeCategoria">
                            <h1>Detalle de categoría</h1>
                                <div class="grid-container2-DDC">
                                    <h3>ID</h3>
                                    <h3>Nombre</h3>
                                    <h3>Descripción</h3>
                                    <h3>Logo</h3>
                                    <h3>Cantidad de Productos</h3>

                                    <div>{categoriaEsp.id}</div>
                                    <div>{categoriaEsp.nombre}</div>
                                    <div class="descripcion">{categoriaEsp.descripcion}</div>
                                    <div><img src={categoriaEsp.img}/></div>
                                    <div>{productosFiltrados.length}</div>
                                </div>
                        </div>
                    </div>
                    
                    <div class="ContenedorProductos">
                        {productosFiltrados.map((p) => {return (<GameCard {...p}/>)})}                    
                    </div>
                </>
            ) : (<>No se encontró la categoría.</>)}
        </>
    );
};

export default Detalle;
