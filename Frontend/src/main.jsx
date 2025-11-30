import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserProvider } from './api/context/UserContext.jsx'

import App from './App.jsx'
import AgregarCategoriaPage from "./routes/AgregarCategoriaPage.jsx"
import ListarCategoriasPage from "./routes/ListarCategoriasPage.jsx"
import DetalleDeCategoriaPage from "./routes/DetalleDeCategoriaPage.jsx"
import ModificarDatosUsuarioPage from './routes/ModificarDatosUsuarioPage.jsx'
import CambiarPasswordPage from './routes/CambiarPasswordPage.jsx'
import TodosLosUsuariosPage from './routes/TodosLosUsuariosPage.jsx'
import DetallesDeOrdenPage from './routes/DetallesDeOrdenPage.jsx'
import RegistroUsuarioPage from './routes/RegistroUsuarioPage.jsx'
import LoginUsuarioPage from './routes/LoginUsuarioPage.jsx'
import DashboardAdminPage from './routes/DashboardAdmin.jsx'
import ProductoPage from "./routes/ProductoPage.jsx"
import DetalledeProducto from "./componentes/Producto/DetalledeProducto.jsx"
import Serie from "./componentes/Serie/Serie.jsx";
import ListadoProductosPage from './routes/ListadoProductosPage.jsx'
import AgregarProducto from './componentes/Producto/AgregarProducto.jsx'
import MainPage from "./componentes/Usuario/MainPage"
import CarritoPage from './routes/CarritoPage.jsx'
import CheckoutCardPaymentPage from './routes/CheckoutCardPaymentPage.jsx'
import CheckoutFormPage from './routes/CheckoutFormPage.jsx'
import CheckoutPaymentPage from './routes/CheckoutPaymentPage.jsx'
import CheckoutQRPage from './routes/CheckoutQRPage.jsx'
import CheckoutSuccessPage from './routes/CheckoutSuccessPage.jsx'
import Nosotros from "./componentes/Nosotros/Nosotros.jsx"
import MostrarCategoria from "./componentes/Categorias/MostrarCategoria.jsx";
import DetalleOrdenPage from './routes/DetalleOrdenPage.jsx';
import DetalleUsuarioPage from './routes/DetalleUsuarioPage.jsx'
import ListadoUsuariosPage from './routes/ListadoUsuariosPage.jsx'
import ListadoOrdenesPage from './routes/ListadoOrdenesPage.jsx'
import OlvidarContraseña from "./componentes/Login/OlvidarContraseña.jsx"
import RecuperarContraseña from "./componentes/Login/RecuperarContraseña.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/Login",
        element: <LoginUsuarioPage />
    },
    {
        path: "/nosotros",
        element: <Nosotros />
    },
    {
        path: "/Register",
        element: <RegistroUsuarioPage />
    },
    {
        path: "/Categoria/Agregar",
        element: <AgregarCategoriaPage />
    },
    {
        path: "/ListarCategorias",
        element: <ListarCategoriasPage />
    },
    {
        path: "/mostrarcategorias",
        element: <MostrarCategoria />
    },
    {
        path: "/Categoria/:id",
        element: <DetalleDeCategoriaPage />
    },
    {
        path: "/ModificarDatosUsuario",
        element: <ModificarDatosUsuarioPage />
    },
    {
        path: "/CambiarPassword",
        element: <CambiarPasswordPage />
    },
    {
        path: "/DetalleDeOrden",
        element: <DetallesDeOrdenPage />
    },
    {
        path: "/Todos",
        element: <TodosLosUsuariosPage />
    },
    {
        path: "/DashboardAdmin",
        element: <DashboardAdminPage />
    },
    {
        path: "/Producto",
        element: <ProductoPage />
    },
    {
        path: "/Producto/categoria/:nombreCategoria",
        element: <ProductoPage />
    },
    {
        path: "/Producto/:id",
        element: <DetalledeProducto />,
    },
    {
        path: "/serie/:id",
        element: <Serie />,
    },
    {
        path: "/ListadoProductos",
        element: <ListadoProductosPage />,
    },
    {
        path: "/Carrito",
        element: <CarritoPage />
    },
    {
        path: "/Checkout1",
        element: <CheckoutFormPage />
    },
    {
        path: "/Checkout2",
        element: <CheckoutPaymentPage />
    },
    {
        path: "/Checkout3",
        element: <CheckoutQRPage />
    },
    {
        path: "/Checkout4",
        element: <CheckoutCardPaymentPage />
    },
    {
        path: "/Checkout5",
        element: <CheckoutSuccessPage />
    },
    {
        path: "/AgregarProducto",
        element: <AgregarProducto />
    },
    {
        path: "/EditarProducto/:id",
        element: <AgregarProducto />
    },
    {
        path: "/MainPageUser",
        element: <MainPage />
    },
    {
        path: "/admin/orders/:userId/:orderId",
        element: <DetalleOrdenPage />
    },
    {
        path: "/admin/users/:userId",
        element: <DetalleUsuarioPage />
    },
    {
        path: "/ListadoUsuariosAdmin",
        element: <ListadoUsuariosPage />
    },
    {
        path: "/ListadoOrdenesAdmin",
        element: <ListadoOrdenesPage />
    },
    {
        path: "/OlvidarContraseña",
        element: <OlvidarContraseña />
    },
    {
        path: "/RecuperarContraseña",
        element: <RecuperarContraseña />
    },

]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    </StrictMode>
)