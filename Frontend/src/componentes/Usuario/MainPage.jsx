import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import usuariosApi from "../../api/usuariosApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./MainPage.css"; 

const MainPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [ordenes, setOrdenes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    if (usuarioGuardado) {
      const user = JSON.parse(usuarioGuardado);
      const userData = {
        ...user,
        ordenes: user.ordenes || [],
        direccion: user.direccion || 'No especificada',
        distrito: user.distrito || 'No especificado',
        telefono: user.telefono || 'No especificado',
      };
      setUsuario(userData);
      setOrdenes(userData.ordenes);
    }
  }, []);

  if (!usuario) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <div className="main-page">
      <Header />

      <h1>Bienvenido, {usuario.nombre}!</h1>
      <div className="content-container"> 
        <div className="left-panel"> 
          <div className="Imagen-usuario">
            <img
              src={usuario.img || `https://i.pravatar.cc/150?u=${usuario.id}`}
              alt="Imagen de usuario"
            />
            <div className="Numero-Ordenes-montoAhorrado">
              <p>Número de órdenes: {usuario.ordenes.length}</p>
              <p>Total gastado: S/ {usuariosApi.getTotalSpent ? usuariosApi.getTotalSpent(usuario).toFixed(2) : '0.00'}</p> 
              <button className="Boton1" onClick={() => navigate("/ModificarDatosUsuario")}>Editar Perfil</button>
              <button className="Boton2" onClick={() => navigate("/CambiarPassword")}>Cambiar Contraseña</button>
            </div>
          </div>
          
          <div className="Datos-usuario">
            <h2>Tu información</h2>
            <p>Nombre: {usuario.nombre}</p>
            <p>Email: {usuario.email}</p>
          </div>

          <div className="Direccion-de-envio">
            <h2>Dirección de envío</h2>
            <p>{usuario.direccion}</p>
            <p>{usuario.distrito}</p>
            <p>Teléfono: {usuario.telefono}</p>
          </div>

        </div> 

        <div className="Ordenes">
          <h2>Tus órdenes</h2>
          {ordenes.length === 0 ? (
            <div className="tabla-container">
              <p>No hay órdenes para mostrar.</p>
            </div>
          ) : (
            <div className="tabla-container">
              <table>
                <thead>
                  <tr>
                    <th>#ID Orden</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {usuario.ordenes.map((orden) => {
                    const totalOrden = orden.productos.reduce(
                      (acum, prod) => acum + prod.total,
                      0
                    );

                    return (
                      <tr key={orden.id}>
                        <td>{orden.id}</td>
                        <td>{orden.fecha}</td>
                        <td>S/. {totalOrden.toFixed(2)}</td>
                        <td>{orden.estado}</td>
                        <td>
                          <button
                            onClick={() => {
                              localStorage.setItem("ordenSeleccionada", JSON.stringify(orden));
                              navigate("/DetalleDeOrden");
                            }}
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;