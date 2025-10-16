import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
import ListadoProductos from "./componentes/Producto/ListadoProductos.jsx"

const router = createBrowserRouter([
    {
        path: "/",  
        element: <App />
      },
    {
        path: "/Login",
        element: <LoginUsuarioPage/>
    },
    {
        path: "/Register",
        element: <RegistroUsuarioPage/>
    },
    {
        path: "/AgregarCategoria",
        element: <AgregarCategoriaPage/>
    },
    {
        path: "/ListarCategorias",
        element: <ListarCategoriasPage/>
    },
    {
        path: "/DetalleDeCategoria",
        element: <DetalleDeCategoriaPage/>
    },
    {
        path: "/ModificarDatosUsuario",
        element: <ModificarDatosUsuarioPage/>
    },
    {
        path: "/CambiarPassword",
        element: <CambiarPasswordPage/>
    },
    {
        path: "/DetalleDeOrden",
        element: <DetallesDeOrdenPage/>
    },
    {
        path: "/Todos",
        element: <TodosLosUsuariosPage/>
    },
    {
        path: "/DashboardAdmin",
        element: <DashboardAdminPage/>
    },
    {
        path: "/Producto",
        element: <ProductoPage/>
    },
     {   path: "/Producto/:id", 
        element: <DetalledeProducto/>,
    },
    {
        path: "/serie/:id",
        element: <Serie />,
    },
    {
        path: "/ListadoProductos",
        element: <ListadoProductos/>,
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
)