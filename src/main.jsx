import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Login/Register.jsx'
import Admin from './pages/admin/dashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",  
    element: <App />
  },
  {
    path: "Login",
    element: <Login />  
  },
  {
    path: "/Register",
    element: <Register/>

  },
  {
    path: "Admin",
    element: <Admin />
  },
  
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
