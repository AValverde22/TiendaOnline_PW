import { useState, useEffect, use } from 'react'

import productosApi from '../../../api/productosApi';
import categoriasApi from '../../../api/categoriasApi';
import './FormPopUp.css'

const FormPopUp = ({ cancelar, categoria, confirmar }) => {
    const [ productos, setProductos ] = useState([]);
    useEffect(() => {setProductos(productosApi.get());}, []);

    let idPS = [];
    const checkONoCheck = (e) => {
        const idSeleccionado = e.target.id;
        const encontrado = idPS.find(ids => ids === idSeleccionado);

        if(encontrado === undefined) idPS.push(idSeleccionado);
        else idPS = idPS.filter((ids) => ids !== idSeleccionado)
    }

    const agregarProductosACategoria = (e) => {
        e.preventDefault();
        categoriasApi.insert(categoria);
        const ultIDCategorias = categoriasApi.getContador();
        for(let i = 0; i < idPS.length; i++) productosApi.modificarID_Categoria(idPS[i], ultIDCategorias);
        confirmar();
    }
    const handleCerrarPopUp = (e) => {e.preventDefault(); cancelar();}

    return (
        <div class="PopUpParent">
            <div class="PopUp">
                <h1>Agregar productos a categoría</h1>


                <table>
                    <tr>
                        <th></th>
                        <th class="PPTitulo">Título</th>
                        <th class="PPCat">Categoría actual</th>
                        <th class="PPImg">Imagen Referencial</th>
                    </tr>

                    {productos.map((p) => {
                        return(
                            <tr>
                                <td class="PPCheckbox"><input type="checkbox" id = {p.id} name="producto" value = {p.titulo} onChange = { (e) => checkONoCheck(e) }/></td>
                                <td class="PPTitulo"><label for = {p.titulo}>{p.titulo}</label></td>
                                <td class="PPCat"><p>{categoriasApi.getNombre(p.ID_Categoria)}</p></td>
                                <td class="PPImg"><img src = {p.img}/></td>
                            </tr>
                        );
                    })}
                </table>

                <div class="grid-container-PopUp">
                    <button onClick = {(e) => handleCerrarPopUp(e)}>Cancelar</button>
                    <button onClick = {(e) => agregarProductosACategoria(e)}>Agregar a Categoria</button>
                </div>
            </div>
            
        </div>


       
    );
};

export default FormPopUp;

