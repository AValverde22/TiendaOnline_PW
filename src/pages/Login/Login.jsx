import { Link } from 'react-router-dom';
import Header from '../../Header';
import Footer from '../../Footer';
import './Login.css';

const Login = () => {
    return (
        <div className="loginContenedor">
            <Header />
            <div className="loginFormulario">
                <h2>Login</h2>
                <form>
                    <label htmlFor='fname'>Primer Nombre</label>
                    <input type="text"  id = "fname" name = "fname"/>
                    <label htmlFor='lname'>Apellido</label>
                    <input type="text"  id = "lname" name = "lname"/>
                    <label htmlFor='email'>Correo Electrónico</label>
                    <input type="email"  id = "email" name = "email"/>
                    <label htmlFor='password'>Contraseña</label>
                    <input type="password"  id = "password" name = "password"/>
                    <input type="submit" value="Iniciar Sesión"/>
                    <Link to="/">
                        <button classname="Back" >Volver</button>
                    </Link>
                    <Link to ="/Register">
                        <button classname="Register" >Registrarse</button>
                    </Link>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Login;