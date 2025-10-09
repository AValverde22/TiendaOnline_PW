import './App.css'
import Header from './Header';
import Footer from './Footer';
import { usuariosData } from './dataUsuarios';

function calcularTotalOrdenes() {
  return usuariosData.reduce((total, usuario) => total + usuario.orden.length, 0);
}

const totalOrdenes = calcularTotalOrdenes();

function dashboard() {
    return(
        <div className='dashboard'>

            <Header />
            <main>
                <h1>Dashboard Admin</h1>
                <ul className='contenedor-cards'>
                    <li className='card'>Órdenes {totalOrdenes}</li>
                    <li className='card'>Usuarios nuevos</li>
                    <li className='card'>Ingresos Totales</li>
                </ul>
                <section className='usuarios'>
                    <div className='usuarios-registrados'></div>
                    <div className='Detalle-usuario'></div>
                </section>
            </main>
            <Footer />
        </div>
    )
    
}

export default dashboard;