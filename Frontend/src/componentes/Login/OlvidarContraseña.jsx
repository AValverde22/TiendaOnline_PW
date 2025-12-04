import {useState} from "react"
import { Link } from "react-router-dom"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi';
import './OlvidarContraseña.css'

const OlvidarContraseña = () => {
    const [email, setEmail] = useState("")

    return (
        <div clasName="Principal">
            <Header />
            <main>
            <div className="ContenedorPrincipal">
                <h1>Recuperar Contraseña</h1>
                <p>Se enviará un correo electrónico con instrucciones para restablecer su contraseña.</p>
                <br />
                <p>Correo</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingrese su correo electrónico" />
                <br />

                <Link to={"/RecuperarContraseña"}>
                <button className="EnviarEmail">Enviar</button>

                </Link>
            </div>

            </main>

            <Footer />
        </div>


    )
}
export default OlvidarContraseña;