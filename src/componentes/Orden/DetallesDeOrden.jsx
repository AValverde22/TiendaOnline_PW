import { useEffect, useState } from "react";
import productosApi from "../../api/productosApi";
import { useNavigate } from "react-router-dom";

import '../gridContainer.css'

const DetallesDeOrden = () => { 
    const [ productos, setProductos ] = useState([]);

    useEffect(() => {
        setProductos(productosApi.get());
    }, [])

    /* DESACTIVADO POR EL MOMENTO
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("Usuario"));

        if(!user) {
            alert("¡No ha iniciado sesión!");
            navigate("");
        } 

    }, [])
    
    useEffect(() => {
        const ps = JSON.parse(localStorage.getItem("ProductosDeOrden"));
        setProductos(ps);
    }, []);

    */

    const navigate = useNavigate();

    const Regresar = () => navigate("www.google.com");
    const cancelarOrden = (e) => {
        e.preventDefault();

        localStorage.removeItem("ProductosDeOrden");
        alert("La orden ha sido cancelada.")
        navigate("www.google.com");
    }

    const pagar = () => navigate("www.google.com");

    const calcularSuma = () => {
        let total = 0;

        for(let i = 0; i < productos.length; i++) total += productos[i].precio;
        return total;        
    }
    
    return (
        <>
            <button class="BotonExterno" onClick = {() => Regresar()}>Regresar</button>
            <h2>DETALLES DE ORDEN</h2>

            <aside>
                <div class="Formulario">
                    <table>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                        </tr>
                        {
                            productos.map((p) => {
                                return (
                                    <tr>
                                        <td>{p.titulo}</td>
                                        <td>{p.descripcion}</td>
                                        <td>{p.precio}</td>
                                        <td>{p.ID_Categoria}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                    <div class="grid-container">
                        <div>Precio Total</div>
                        <div>{calcularSuma()}</div>

                        <button class="BotonExterno" onClick = {(e) => cancelarOrden(e)}>Cancelar Orden</button>
                        <button class="BotonExterno" onClick = {(e) => pagar(e)}>Pagar</button>
                    </div>
                    
                </div>
            </aside>
        </>
    );  
}

export default DetallesDeOrden;