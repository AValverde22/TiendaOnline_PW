import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Login.css';
import { useUser } from '../../api/context/UserContext';

function Login() {
    const navigate = useNavigate();
    const { login } = useUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Intentando login...");
        setErrorMsg('');
        setCargando(true);

        try {
            const respuesta = await login({
                correo: email,
                password: password
            });

            if (respuesta.success) {
                console.log("Login exitoso");
                navigate('/');
            } else {
                setErrorMsg(respuesta.message || "Credenciales inválidas");
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setErrorMsg('Error de conexión con el servidor');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="ContenedorRegistro">
            <Header />
            <main className='main-content'>
                <div className="Registro">
                    <h2>Login</h2>

                    <form onSubmit={handleLogin}>
                        <label htmlFor='email'>Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor='password'>Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {errorMsg && <p style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</p>}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                            {/* Botón Principal (Submit) */}
                            <button type="submit" className="btnLogin" disabled={cargando}>
                                {cargando ? "Cargando..." : "Iniciar Sesión"}
                            </button>
                            {/* CAMBIO: Botones con onClick y navigate */}
                            <button
                                type="button"
                                className="btnLogin"
                                onClick={() => navigate('/Register')}
                            >
                                Crear Cuenta
                            </button>

                            <button
                                type="button"
                                className="btnLogin"
                                onClick={() => navigate('/OlvidarContraseña')}
                            >
                                Olvidé mi contraseña
                            </button>

                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Login;