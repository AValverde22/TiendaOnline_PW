import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {

    const navigate = useNavigate();

    const [ password1, setPassword] = useState('');
    const [ email1, setEmail] = useState('');    


    const handleLogin =()=>{
        console.log("entro")
        const resultado = usuariosApi.get().find((u) => u.correo.toLowerCase() === email1.toLowerCase() && u.password === password1);

        if (resultado){
            localStorage.setItem('usuarioLogueado', JSON.stringify(resultado));
            navigate('/');
            }
        else 
            alert("Credenciales inválidas");
        

    };
    
    return (

        <div className="ContenedorRegistro">
            <Header />
                <main className='main-content'>
                <div className="Registro">
                    <h2>Login</h2>
                    <form>
                        <label htmlFor='email'>Correo Electrónico</label>
                        <input type="email"  id = "email" name = "email" value={email1} onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor='password'>Contraseña</label>
                        <input type="password"  id = "password" name = "password" value={password1} onChange={(e)=> setPassword(e.target.value)} />

                        <button type="button" className="btn-sumbit" onClick={() => handleLogin()}> Iniciar Sesion</button>
                        
                        <Link to="/Register">
                            <button className="NewAccount" >Crear Cuenta</button>
                        </Link>
                    </form>
                </div>
                </main>
            <Footer />
        </div>
        

    );
};

export default Login;