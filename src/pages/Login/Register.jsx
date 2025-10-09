import { Link } from 'react-router-dom';
import Header from '../../Header';
import Footer from '../../Footer';
import './Register.css';

function Register() {

    return (
        
        <div className="ContenedorRegistro">
            <Header />
            <div className="Registro">
                <h2>Registro</h2>
                <form>
                    <label htmlFor='email'>Correo Electrónico</label>
                    <input type="email"  id = "email" name = "email"/>
                    <label htmlFor='password'>Contraseña</label>
                    <input type="password"  id = "password" name = "password"/>
                    <input type="submit" value="Iniciar Sesión"/>
                    <Link to="App">
                        <button classname="NewAccount" >NuevaCuenta</button>
                    </Link>
                </form>
            </div>


            <Footer />

        </div>

    );
};

export default Register;