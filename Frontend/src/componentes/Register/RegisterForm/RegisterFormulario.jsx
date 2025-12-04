import { useState } from 'react'
import "./RegisterFormulario.css"

const FormularioUsuario = ({ onSubmit }) => {


    const usernuevo = {
        id: 0,
        username: '',
        password: '',
        nombre: '',
        apellido: '',
        correo: '',
        rol: 'user',
        estado: 'activo',
        img: '',
        ordenes: [],
        direccion: "",
        telefono: "",
        distrito: "",
    }

    const [user, setUsuario] = useState(usernuevo)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!user.username || !user.password || !user.correo) {
            alert('Username, contraseña y correo son obligatorios')
            return
        }
        onSubmit(user)
        setUsuario(usernuevo)
    }

    return (
        <form className="Formulario" onSubmit={handleSubmit}>
            <h2>Nuevo Usuario</h2>

            <label className="Username"> Username</label>
            <br />
            <input
                name="username"
                className="input-username"
                type="text"
                value={user.username}
                onChange={(e) => setUsuario({ ...user, username: e.target.value })}
            />
            <br />

            <label className="NombreLabel"> Nombre </label>
            <br />
            <input
                className="input-nombre"
                name="nombre"
                type="text"
                value={user.nombre}
                onChange={(e) => setUsuario({ ...user, nombre: e.target.value })}
            />
            <br />

            <label className="apellido-label"> Apellido </label>
            <br />
            <input
                className="input-apellido"
                name="apellido"
                type="text"
                value={user.apellido}
                onChange={(e) => setUsuario({ ...user, apellido: e.target.value })}
            />
            <br />

            <label className="Contraseña-label"> Contraseña </label>
            <br />
            <input
                className="input-password"
                name="password"
                type="password"
                value={user.password}
                onChange={(e) => setUsuario({ ...user, password: e.target.value })}
            />
            <br />


            <label  className="Correo-label">Correo Electronico </label>
            <br />
            <input
                className = "input-correo"
                name="correo"
                type="email"
                value={user.correo}
                onChange={(e) => setUsuario({ ...user, correo: e.target.value })}
            />
            <br />
            <label className="Direccion-label"> Direccion </label>
            <br />
            <input name="direccion"
                className="input-direccion"
                type="text"
                value={user.direccion}
                onChange={(e) => setUsuario({ ...user, direccion: e.target.value })}
            />
            <br />
            <label className="Telefono-label"> Telefono </label>
            <br />
            <input name="telefono"
                className="input-telefono"
                type="text"
                value={user.telefono}
                onChange={(e) => setUsuario({ ...user, telefono: e.target.value })}
            />
            <br />
            <label className="Distrito-label"> Distrito </label>
            <br />
            <input name="distrito"
                className="input-distrito"
                type="text"
                value={user.distrito}
                onChange={(e) => setUsuario({ ...user, distrito: e.target.value })}
            />
            <br />

            <button className="Boton-Registrar"type="submit">Registrarse</button>
        </form>
    )
}

export default FormularioUsuario