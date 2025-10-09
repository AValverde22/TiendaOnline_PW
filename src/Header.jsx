
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
                <img src={logo} alt="Logo" className="header-logo" />
                <h2 className="header-title">GamePlay</h2>
                <div className="header-searchbar">
                  <SearchBar />
                </div>
            </div>
        </header>
    );
}
export default Header