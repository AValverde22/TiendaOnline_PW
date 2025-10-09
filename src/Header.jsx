import { Link } from "react-router-dom";
import logo from './imagenes/Logo-generico-2.jpg';
import SearchBar from './barrabuscar';
import './Header.css';

function Header(){    
    
    const handleSearch = (event) => {
        event.preventDefault();
        const query = event.target.elements.busqueda.value;
        alert(`Buscando: ${query}`);
    };

    return (
        <header>
            <div className="header-container">
                <div>
                    <Link to="/">
                        <img src={logo} alt="Logo" className="header-logo"/>
                    </Link>
                </div>
                
                <h2 className="header-title">GamePlay</h2>
                <div className="header-searchbar">
                  <SearchBar />
                </div>
                <div className='btn-carrito'>
                    
                </div>
                <div className='btn-login'>
                    <Link to="Login">
                        <button className='btn-login-style'>Login</button>
                    </Link>

   
                </div>

                <div className='btn-admin'>
                    <Link to="Admin">
                        <button className='btn-login-style'>user</button>
                    </Link>

   
                </div>
            </div>
        </header>
    );
}
export default Header;