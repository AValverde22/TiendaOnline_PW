import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './App.css';

// Componentes
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';
import "./componentes/Carrito/AgregarCarritoBoton/BotondeCarrito.css";

// APIs (Asegúrate de que productosApi.js esté corregido como se indicó previamente)
import seriesApi from "./api/seriesApi.js";
import productosApi from './api/productosApi.js'; 

// Contextos
import { useUser } from "./api/context/UserContext.jsx";
import { useCart } from "./api/context/CartContext.jsx";

function App() {
    const navigate = useNavigate();
    // Obtener información del usuario y el token
    const { user, token, isAuthenticated } = useUser(); 
    // Obtener la función para agregar al carrito
    const { agregarProducto } = useCart(); 

    const [currentIndex, setCurrentIndex] = useState(0);
    const [productos, setProductos] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Carga de Datos Iniciales ---
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [listaProductos, listaSeries] = await Promise.all([
                    // ⚠️ Usamos productosApi.findAll() y seriesApi.findAll()
                    productosApi.findAll(),
                    seriesApi.findAll()
                ]);

                // Asegurar que los datos sean arrays antes de setearlos
                setProductos(Array.isArray(listaProductos) ? listaProductos : []);
                setSeries(Array.isArray(listaSeries) ? listaSeries : []);
            } catch (error) {
                console.error("Error cargando datos de la tienda:", error);
                // Aquí podrías setear un estado de error si quieres mostrarlo en la UI
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, []);

    const topProducts = productos.slice(6, 12);
    const newProducts = productos.slice(0, 6);

    const irACategoria = (nombreCategoria) => {
        navigate(`/Producto/categoria/${encodeURIComponent(nombreCategoria)}`);
    };

    // --- Lógica de Agregar al Carrito (Segura) ---
    const handleAgregarCarrito = async (e, producto) => {
        e.preventDefault();
        e.stopPropagation(); // Evita que el evento click del botón active la navegación del Link

        if (!isAuthenticated || !user || !token) {
            alert("Debes iniciar sesión para agregar productos al carrito.");
            navigate("/login");
            return;
        }

        try {
            // El CartContext (useCart) internamente llamará a CarritoApi.agregarProducto
            await agregarProducto(producto, 1); 
            alert(`✅ ${producto.nombre} fue agregado al carrito.`);
            
        } catch (err) {
            console.error("Error agregando al carrito:", err);
            // Mostrar un mensaje de error más específico si es posible
            alert("❌ No se pudo agregar el producto al carrito. Verifica tu conexión.");
        }
    };

    // --- Lógica del Banner y Renderizado ---
    const banners = [
        "/src/imagenes/Banner-publicidad.png",
        "https://images.prismic.io/gamersfy/aIyAIKTt2nPbZovR_CABECERA-3-.png?auto=format,compress&rect=0,0,960,280&w=960&h=280",
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/79ce18c9-5ca4-4487-a048-320543d4cbb6.__CR0,0,970,300_PT0_SX970_V1___.jpg"
    ];

    const handleNext = () => setCurrentIndex(prev => prev === banners.length - 1 ? 0 : prev + 1);
    const handlePrev = () => setCurrentIndex(prev => prev === 0 ? banners.length - 1 : prev + 1); // Corregido: si es 0, va al último

    // Renderizado Condicional
    if (loading) return <div className="loading-screen">Cargando tienda... </div>;


    return (
        <div className="landing-container">
            <Header />
            <main className='main-content'>

                {/* Banner */}
                <div className="banner">
                    <button className="banner-arrow left" onClick={handlePrev}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="banner-content">
                        <img src={banners[currentIndex]} alt="Banner de Publicidad" className="banner-img" />
                    </div>
                    <button className="banner-arrow right" onClick={handleNext}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Categorías */}
                <h2 className="title-categoria">Categorías populares</h2>
                <div className="categoria">
                    <div className="categoria-card" onClick={() => irACategoria("Videojuegos")}>Videojuegos</div>
                    <div className="categoria-card" onClick={() => irACategoria("Consolas")}>Consolas</div>
                    <div className="categoria-card" onClick={() => irACategoria("Merch")}>Merch</div>
                </div>

                {/* Top Products */}
                <div className="top-products">
                    <h3>Videojuegos más vendidos</h3>
                    <div className="top-products-list">
                        {topProducts.map((game) => (
                            <Link key={game.id} to={`/Producto/${game.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <div className="product-card">
                                    <img src={game.img} alt={game.nombre} className="product-img" loading="lazy" />
                                    <p className="product-title">{game.nombre}</p>
                                    <p className="product-price">S/ {Number(game.precio).toFixed(2)}</p>
                                    <button className="boton-agregar" onClick={(e) => handleAgregarCarrito(e, game)}>
                                        Agregar al carrito
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Series/Sagas */}
                <div className="new-series">
                    <h3>Sagas de videojuegos</h3>
                    <div className="new-series-list">
                        {series.map((serie) => (
                            <Link key={serie.id} to={`/Serie/${serie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <div className="series-panel">
                                    <img src={serie.img} alt={serie.nombre} className="series-img" loading="lazy" />
                                    <h3>{serie.nombre}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Nuevos Productos */}
                <div className="new-products">
                    <h3>Nuevos Productos</h3>
                    <div className="new-series-list">
                        {newProducts.map((producto) => (
                            <Link key={producto.id} to={`/Producto/${producto.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <div className="product-card">
                                    <img src={producto.img} alt={producto.nombre} className="product-img" loading="lazy" />
                                    <h3>{producto.nombre}</h3>
                                    <p>S/ {Number(producto.precio).toFixed(2)}</p>
                                    <button className="boton-agregar" onClick={(e) => handleAgregarCarrito(e, producto)}>
                                        Agregar al carrito
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}

export default App;