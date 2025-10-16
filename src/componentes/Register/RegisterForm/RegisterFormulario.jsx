import { useState } from 'react'

const FormularioUsuario = ({onSumbit}) => {

    /*
        Definimos la estructura de un usuario    
    */ 
    const usernuevo = {
        
        id:0,
        username:"",
        password:"",
        nombre:"",
        apellido:"",
        correo:"",
        rol:"",
        ordenes: []
    }

    const [user, setUsuario ] = useState(usernuevo)

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(user)
    }

    return (

        <form>
            <h2>Nuevo Usuario</h2>
            <label> Username</label>
            <br></br>
            <input type="text" value={user.username}
                            onChange={(e) => setProducto({...user, username: e.target.value})}/>
            <br></br>
            <label> Nombre </label>
            <br></br>
            <input type="text" value={user.nombre}
                            onChange={(e) => setProducto({...user, nombre: e.target.value})}/>
            <br></br>
            <label> Apellido </label>
            <input type="text" value={user.apellido}
                            onChange={(e) => setProducto({...user, apellido: e.target.value})}/>
            <br></br>
            <label> Contraseña </label>
            <input type="text" value={user.password}
                            onChange={(e) => setProducto({...user, password: e.target.value})}/>
            <br></br>
            <label>Correo Electronico </label>
            <input type="text" value={user.correo}
                            onChange={(e) => setProducto({...user, correo: e.target.value})}/>
            <br></br>

            <button onClick={(e) => handleSubmit(e)}>Registrarse</button>
        </form>
    )

}

export default FormularioUsuario