import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import categoriasApi from "../../api/categoriasApi";
import productosApi from '../../api/productosApi';

import GameCard from '../GameCard/GameCard';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './DetalleDeCategoria.css'


const Detalle = () => {
    const [ ID_Categoria, setID_Categoria ] = useState("");
    const [ categorias, setCategorias ] = useState([]);
    const [ categoriaEsp, setCategoriaEsp ] = useState(null);
    const [ todosLosProductos, setTodosLosProductos ] = useState([]);
    const [ productosFiltrados, setProductosFiltrados ] = useState([]);

    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("usuarioLogueado"));
        if(!admin || admin.rol !== "admin") {
            alert("¡No es administrador!");
           navigate("/");
        } 

    }, [])
    

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

    const EliminarCategoria = () => {
        categoriasApi.eliminar(ID_Categoria);
        alert("Categoria Eliminada");
        navigate("/ListarCategorias");
    }

    const GuardarCambios = () => {
        categoriasApi.modificar(categoriaEsp);
        alert("Categoria modificada");
        navigate("/ListarCategorias");
    }

    return (
        <>  
            <Header/>
            <div class="grid-container-DDC">
                <button class="BotonExterno" onClick = {() => DirigirseListarCategoria()}>Listado de Categorias</button>
                <div></div>
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
                                    <textarea value = {categoriaEsp.nombre}
                                        onChange={(e) => setCategoriaEsp({...categoriaEsp, nombre: e.target.value})}/>
                                    <textarea class="descripcion" value={categoriaEsp.descripcion} 
                                        onChange={(e) => setCategoriaEsp({...categoriaEsp, descripcion: e.target.value})}/>
                                    <div>
                                        <img src={categoriaEsp.img}/>
                                        <input type="text" value={categoriaEsp.img}
                                            onChange={(e) => setCategoriaEsp({...categoriaEsp, img: e.target.value})}/>
                                    </div>
                                    
                                    <div>{productosFiltrados.length}</div>
                                </div>
                        </div>
                    </div>

                    <div class="ContenedorProductos">
                        {productosFiltrados.map((p) => {return (<GameCard {...p}/>)})}                    
                    </div>

                    <div class="grid-container-DDC">
                        <button class="BotonExterno" onClick = {() => EliminarCategoria()}>Eliminar categoria</button>
                        <button class="BotonExterno" onClick = {() => GuardarCambios()}>Guardar cambios</button>
                    </div>
                </>
            ) : (<>No se encontró la categoría.</>)}
            <Footer/>
        </>
    );
};

export default Detalle;
