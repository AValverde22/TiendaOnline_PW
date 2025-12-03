import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// 1. Importamos el contexto y la API (igual que en DetalleUsuario)
import { useUser } from '../../api/context/UserContext.jsx';
import usuariosApi from "../../api/usuariosApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import TableComponent from "../Admin/TableComponent";
import "./MainPage.css";

const MainPage = () => {
  // Obtenemos el usuario básico y el token de la sesión actual
  const { user: contextUser, token, loading: contextLoading } = useUser();

  // Estado para guardar la información COMPLETA y FRESCA traída de la base de datos
  const [userData, setUserData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  const navigate = useNavigate();

  // 2. EFECTO: Cargar datos frescos (Igual que en DetalleUsuario, pero usando contextUser.id)
  useEffect(() => {
    // Si el contexto aún carga, esperamos
    if (contextLoading) return;

    // Si no hay usuario logueado, redirigir
    if (!contextUser || !token) {
      navigate('/login');
      return;
    }

    const fetchFullProfile = async () => {
      try {
        setLoadingData(true);
        // Llamamos a la API usando el ID que tenemos en memoria
        const response = await usuariosApi.findById(contextUser.id, token);

        // Ajuste por si tu API devuelve { data: ... } o el objeto directo
        const dataFresca = response.data || response;

        if (dataFresca) {
          setUserData(dataFresca);
        }
      } catch (error) {
        console.error("Error al refrescar perfil:", error);
        // Si falla, nos quedamos con los datos viejos del contexto para no mostrar nada roto
        setUserData(contextUser);
      } finally {
        setLoadingData(false);
      }
    };

    fetchFullProfile();
  }, [contextUser, token, contextLoading, navigate]);

  // 3. Preparar datos (Calculamos totales igual que en tu referencia)
  const userToDisplay = userData || contextUser;
  const listaOrdenes = userToDisplay?.ordenes || [];

  // Calcular total gastado histórico
  const totalGastado = useMemo(() => {
    return listaOrdenes.reduce((acc, orden) => {
      // Sumamos el total de la orden (si existe) o sumamos sus detalles
      const totalOrden = Number(orden.total) ||
        orden.detalles?.reduce((sum, d) => sum + (Number(d.total) || 0), 0) || 0;
      return acc + totalOrden;
    }, 0);
  }, [listaOrdenes]);

  // 4. Configuración de columnas para TableComponent
  const orderColumns = [
    {
      header: '#ID',
      accessor: 'id',
      render: (orden) => <span className="order-id">#{orden.id.toString().padStart(4, '0')}</span>
    },
    {
      header: 'Fecha',
      render: (orden) => new Date(orden.fecha || Date.now()).toLocaleDateString()
    },
    {
      header: 'Total',
      render: (orden) => {
        const total = Number(orden.total) ||
          orden.detalles?.reduce((sum, d) => sum + (Number(d.total) || 0), 0) || 0;
        return <span className="order-total">S/ {total.toFixed(2)}</span>;
      }
    },
    {
      header: 'Estado',
      accessor: 'estado',
      render: (orden) => (
        <span className={`status-badge ${orden.estado?.toLowerCase() === 'entregado' ? 'status-ok' : 'status-pending'}`}>
          {orden.estado || 'Pendiente'}
        </span>
      )
    },
    {
      header: 'Acción',
      render: (orden) => (
        <button
          className="btn-ver-orden"
          onClick={() => {
            // Guardamos orden seleccionada para la vista de detalle
            localStorage.setItem("ordenSeleccionada", JSON.stringify(orden));
            navigate("/DetalleDeOrden");
          }}
        >
          Ver Detalle
        </button>
      )
    }
  ];

  // 5. Renderizado de carga
  if (contextLoading || loadingData) {
    return (
      <div className="main-page-loading">
        <Header />
        <div className="loading-container">
          <p>Cargando tu perfil...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="main-page">
      <Header />

      <div className="main-content-wrapper">
        <h1>Bienvenido, <span className="highlight">{userToDisplay?.nombre}</span>!</h1>

        <div className="content-container">

          {/* --- PANEL IZQUIERDO (Info) --- */}
          <div className="left-panel">

            {/* Tarjeta de Perfil */}
            <div className="Imagen-usuario">
              <img
                src={userToDisplay?.img || `https://i.pravatar.cc/150?u=${userToDisplay?.id}`}
                alt="Perfil"
              />
              <div className="Numero-Ordenes-montoAhorrado">
                <p>Órdenes realizadas: {listaOrdenes.length}</p>
                <p>Total invertido: S/ {totalGastado.toFixed(2)}</p>

                <button className="Boton1" onClick={() => navigate("/ModificarDatosUsuario")}>
                  Editar Perfil
                </button>
                <button className="Boton2" onClick={() => navigate("/CambiarPassword")}>
                  Cambiar Contraseña
                </button>
              </div>
            </div>

            {/* Datos Personales */}
            <div className="Datos-usuario">
              <h2>Tu Información</h2>
              <p><strong>Nombre: </strong>{userToDisplay?.nombre + " " + userToDisplay?.apellido}</p>
              <p><strong>Email:</strong> {userToDisplay?.email || userToDisplay?.correo}</p>
              <p><strong>Usuario:</strong> @{userToDisplay?.username}</p>
              <p><strong>Teléfono:</strong> {userToDisplay?.telefono || 'No registrado'}</p>
            </div>

            {/* Dirección */}
            <div className="Direccion-de-envio">
              <h2>Datos de Envío</h2>
              <p><strong>Dirección:</strong> {userToDisplay?.direccion || 'Dirección no especificada'}</p>
              <p><strong>Distrito:</strong> {userToDisplay?.distrito || 'Distrito no especificado'}</p>
            </div>
          </div>

          {/* --- PANEL DERECHO (Tabla) --- */}
          <div className="Ordenes">
            <h2>Historial de Órdenes</h2>
            <div className="orders-table-container">
              <TableComponent
                columns={orderColumns}
                data={listaOrdenes}
                emptyMessage="Aún no has realizado compras. ¡Explora nuestro catálogo!"
                itemsPerPage={5}
              />
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;