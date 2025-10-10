import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import categoriasApi from "../../api/categoriasApi";
import productosApi from '../../api/productosApi';

import GameCard from '../GameCard/GameCard';
import '../gridContainer.css'


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
            <div class="grid-container2">
                <button class="BotonExterno" onClick = {() => DirigirseListarCategoria()}>Listado de Categorias</button>
                <button class="BotonExterno" onClick = {() => IrAInicio()}>Inicio</button>
            </div>

            {categoriaEsp ? 
            (
                <>
                    <aside>
                        <div class="Formulario">
                            <h2>DETALLE DE CATEGORÍA</h2>

                                <table>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Logo</th>
                                        <th>Cantidad de Productos</th>
                                    </tr>
                                    <tr>
                                        <td>{categoriaEsp.id}</td>
                                        <td>{categoriaEsp.nombre}</td>
                                        <td class="descripcion">{categoriaEsp.descripcion}</td>
                                        <td><img src={categoriaEsp.img}/></td>
                                        <td>{productosFiltrados.length}</td>
                                    </tr>
                                </table>
    
                        </div>
                    </aside>
                    <div class="ContenedorProductos">
                        {productosFiltrados.map((p) => {return (<GameCard {...p}/>)})}                    
                    </div>
                </>
            ) : (<>No se encontró la categoría.</>)}
        </>
    );
};

export default Detalle;
