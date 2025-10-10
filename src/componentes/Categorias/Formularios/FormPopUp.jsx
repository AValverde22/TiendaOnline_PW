import { useState, useEffect, use } from 'react'

import productosApi from '../../../api/productosApi';
import categoriasApi from '../../../api/categoriasApi';

import '../../gridContainer.css'

const FormPopUp = ({ cancelar, categoria }) => {
    const [ productos, setProductos ] = useState([]);
    useEffect(() => {setProductos(productosApi.get());}, []);

    const handleCerrarPopUp = (e) => {e.preventDefault(); cancelar();}
    const agregarProductosACategoria = (e) => {e.preventDefault(); categoriasApi.insert(categoria); document.body.style.backgroundColor = 'whitesmoke';}

    return (
        <aside>
            <div class="Formulario">
                <h2>AGREGAR PRODUCTOS A CATEGORÍA</h2>

                <form class="grid-container">

                    {productos.map((p) => {
                        return(
                            <>  
                                <input type="checkbox" id = {p.titulo} name="producto" value = {p.titulo}/>
                                <label for = {p.titulo}>{p.titulo}</label>
                            </>            
                        );
                    })}

                    <button onClick = {(e) => handleCerrarPopUp(e)}>Cancelar</button>
                    <button onClick = {(e) => agregarProductosACategoria(e)}>Agregar a Categoria</button>
                </form>
            </div>
            
        </aside>


       
    );
};

export default FormPopUp;
