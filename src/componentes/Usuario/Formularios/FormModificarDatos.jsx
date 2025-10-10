import { useState } from 'react'
import './FormModificarDatos.css'

const FormModificarDatos = ({ onSubmit, user, onCancel }) => {
    const [ usuario, setUsuario ] = useState(user);
    const handleSubmit = (e) => {e.preventDefault(); onSubmit(usuario);}
    const handleCancel = (e) => {e.preventDefault(); onCancel();}

    return (
        <div class="ModificarDatosUsuarioParent">  
            <div class="ModificarDatosUsuario">
                <h1>Modificar Datos</h1>
            
                <form class="grid-container-MDU">
                    <div>
                        <label>Nombre</label><br></br>
                        <input type="text" value = {usuario.nombre}
                            onChange = {(e) => setUsuario({...usuario, nombre: e.target.value})}/>
                    </div>
                    <div>
                        <label>Apellido</label><br></br>
                        <input type="text" value = {usuario.apellido}
                            onChange = {(e) => setUsuario({...usuario, apellido: e.target.value})}/>
                    </div>

                    <div>
                        <label>Correo</label><br></br>
                        <input type="text" value = {usuario.correo}
                           onChange = {(e) => setUsuario({...usuario, correo: e.target.value})}/>
                    </div>
                    <div></div>
                </form>

                <div class="grid-container-MDU2">
                    <button onClick = {(e) => handleCancel(e)}>Cancelar</button>
                    <button onClick = {(e) => handleSubmit(e)}>Confirmar</button>
                </div>
                    
            </div>
            
        </div>

    );
};

export default FormModificarDatos;