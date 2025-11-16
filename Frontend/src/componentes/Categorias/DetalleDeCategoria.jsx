import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import categoriasApi from "../../api/categoriasApi";
import productosApi from '../../api/productosApi';

import GameCard from '../GameCard/GameCard';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './DetalleDeCategoria.css'

const Detalle = () => {
    const { id } = useParams();
    const [ categoria, setCategoria ] = useState(null);
    const [ administrador, setAdministrador ] = useState({});

    const [ todosLosProductos, setTodosLosProductos ] = useState([]);
    const [ productosFiltrados, setProductosFiltrados ] = useState([]);

    const handleOnLoad = async () => {
        const admin = JSON.parse(localStorage.getItem("usuarioLogueado"));

        if(!admin || admin.rol !== "admin") {
            alert("¡No es administrador!");
            navigate("/");
        } else {   
            setAdministrador(admin);

            const cat = await categoriasApi.findOne(id);
            setCategoria(cat);

            const allProducts = await productosApi.findAll();
            setTodosLosProductos(allProducts);

            const productosPorCategoria = allProducts.filter((item) => item.ID_Categoria == id);
            setProductosFiltrados(productosPorCategoria);
        }
    }

    useEffect(() => {handleOnLoad()}, []);

    const navigate = useNavigate();
    const DirigirseListarCategoria = () => navigate("/Categoria");

    const EliminarCategoria = async () => {
        await categoriasApi.remove(id);
        alert("Categoria Eliminada");

        navigate("/Categoria");
    }

    const GuardarCambios = async () => {
        await categoriasApi.update(categoria);
        alert("Categoria modificada");

        navigate("/Categoria");
    }

    return (
        <>
            {(!administrador || administrador.rol !== "admin") ? 
            (<>
                <Header />
                <><h1>No tienes permiso para ver esta página.</h1></>
                <Footer />
            </>)
            :
            (<>
                <Header/>
                <>
                    <div class="grid-container-DDC">
                        <button class="BotonExterno" onClick = {() => DirigirseListarCategoria()}>Listado de Categorias</button>
                        <div></div>
                    </div>

                    {categoria ? 
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

                                            <div>{categoria.id}</div>
                                            <textarea value = {categoria.nombre}
                                                onChange={(e) => setCategoria({...categoria, nombre: e.target.value})}/>

                                            <textarea class="descripcion" value={categoria.descripcion} 
                                                onChange={(e) => setCategoria({...categoria, descripcion: e.target.value})}/>

                                            <div>
                                                <img src={categoria.img}/>
                                                <input type="text" value={categoria.img}
                                                    onChange={(e) => setCategoria({...categoria, img: e.target.value})}/>
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
                </>     
                <Footer/>
            
            </>)}        
        </>
    );
};

export default Detalle;
