import { useState, useEffect, use } from 'react'

import productosApi from '../../../api/productosApi';
import categoriasApi from '../../../api/categoriasApi';
import './FormPopUp.css'

const FormPopUp = ({ cancelar, categoria, confirmar, productos }) => {
    const [ productosOriginales, setProductosOriginales ] = useState(productos);
    const [ products, setProducts ] = useState([]);
    const [ textoBusqueda, setTextoBusqueda ] = useState("");

    let idPS = [];
    const checkONoCheck = (e) => {
        const idSeleccionado = e.target.id;
        const encontrado = idPS.find(ids => ids === idSeleccionado);

        if(encontrado === undefined) idPS.push(idSeleccionado);
        else idPS = idPS.filter((ids) => ids !== idSeleccionado)
    }

    const agregarProductosACategoria = async (e) => {
        e.preventDefault();

        await categoriasApi.create(categoria);
        const ultIDCategoria = await categoriasApi.findByName(categoria.nombre).id;

        for(let i = 0; i < idPS.length; i++){   
            let p = await productosApi.findOne(idPS[i]);
            p = {...p, ID_Categoria: ultIDCategoria};

            await productosApi.update(p);
        } 

        console.log("Categoria creada");
        confirmar();
    }

    const handleCerrarPopUp = (e) => {e.preventDefault(); cancelar();}

    useEffect(() => {
        if(textoBusqueda === "") setProducts(productosOriginales);
        else handleBuscar();            
    }, [textoBusqueda]);

    const handleBuscar = () => {
        const filtrados = productosOriginales.filter((item) => item.titulo.toLowerCase().includes(textoBusqueda.toLowerCase()));
        setProducts(filtrados);
    }

    return (
        <div class="PopUpParent">
            <div class="PopUp">
                <h1>Agregar productos a categoría</h1>
                <input type="text" placeholder="Buscar producto..." value = {textoBusqueda} 
                    onChange = {(event) => setTextoBusqueda(event.target.value)}/>

                <table>
                    <tr>
                        <th></th>
                        <th class="PPTitulo">Título</th>
                        <th class="PPImg">Imagen Referencial</th>
                    </tr>

                    {products.map((p) => {
                        return(
                            <tr>
                                <td class="PPCheckbox"><input type="checkbox" id = {p.id} name="producto" value = {p.titulo} onChange = { (e) => checkONoCheck(e) }/></td>
                                <td class="PPTitulo"><label for = {p.titulo}>{p.titulo}</label></td>
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

