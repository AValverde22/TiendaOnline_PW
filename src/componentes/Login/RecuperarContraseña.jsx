import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./RecuperarContraseña.css";

const RecuperarContraseña = () => {

    return (
        <div>
            <Header />  
            <main className="RecuperarContraseña-Main">
                <div className="RecuperarContraseña-Container">
                    <h2>Recuperar Contraseña</h2>
                    <p>Ingrese Nueva contraseña</p>
                    <input typer="text" placeholder="Nueva Contraseña" />
                    <p>Confirme su contraseña</p> 
                    <input typer="text" placeholder="Confirmar Contraseña" />
                    <Link to="/Login">
                        <button className="RecuperarContraseña-Button">Enviar</button>
                    </Link>
                </div>
            </main>
        </div>

    )
}

export default RecuperarContraseña;
