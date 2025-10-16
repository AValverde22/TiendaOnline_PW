import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import usuariosApi from '../../api/usuariosApi'

import './DetallesDeOrden.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const DetallesDeOrden = () => {
    const [ detalleOrden, setDetalleOrden ] = useState({})
    const [ ID, setID ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user3 = JSON.parse(localStorage.getItem("usuarioLogueado"));
        let seComproRecien = localStorage.getItem("seComproRecien");
        seComproRecien = "si";

        if(user3 && user3.rol == "user" && seComproRecien === "si"){
            const ID = user3.id;
            setID(ID);
            setDetalleOrden(usuariosApi.getLastOrder(ID));
        } 
        else{
            alert("¡No es cliente!");
            navigate("/");
        } 
    }, [])

    const cancelarOrden = () => {
        usuariosApi.deleteLastOrder(ID);
        alert("Orden cancelada");
        navigate("/");
    }
        
    return (
        <>
            <Header/>
            <div class="DetallesDeOrdenParent">
                {(detalleOrden.productos) ? (
                    <div class="DetallesDeOrden">
                    <button onClick={() => cancelarOrden()}>Cancelar orden</button>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                    <th>Total</th>                          
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    detalleOrden.productos.map((p) => {
                                        return (
                                            <tr>
                                                <td>{p.nombre}</td>
                                                <td>{p.cantidad}</td>
                                                <td>{p.total}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
            ): (<>No se ha registrado compra alguna.</>)}
            </div>
            
            <Footer/>
        </>
    );  
}

export default DetallesDeOrden;