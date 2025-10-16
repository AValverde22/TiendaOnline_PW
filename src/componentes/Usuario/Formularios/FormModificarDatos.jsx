import { useState, useEffect } from 'react'
import './FormModificarDatos.css'

const FormModificarDatos = ({ onSubmit, user, onCancel }) => {
    const [ user2, setUser2] = useState(user);
    const handleSubmit = (e) => {e.preventDefault(); onSubmit(user2);}
    const handleCancel = (e) => {e.preventDefault(); onCancel();}

    return (
        <div class="ModificarDatosUsuarioParent">  
            <div class="ModificarDatosUsuario">
                <h1>Modificar Datos</h1>
                
                <div class="ParentDeImagen-MDU">
                    <img src={user.img}/>
                </div>
                <form class="grid-container-MDU">
                    <div>
                        <label>Nombre</label><br></br>
                        <input type="text" value = {user.nombre}
                            onChange = {(e) => setUser2({...user, nombre: e.target.value})}/>
                    </div>
                    <div>
                        <label>Apellido</label><br></br>
                        <input type="text" value = {user.apellido}
                            onChange = {(e) => setUser2({...user, apellido: e.target.value})}/>
                    </div>

                    <div>
                        <label>Correo</label><br></br>
                        <input type="text" value = {user.correo}
                           onChange = {(e) => setUser2({...user, correo: e.target.value})}/>
                    </div>
                    <div>
                        <label>Foto de perfil</label><br></br>
                        <input type="text" value = {user.img}
                           onChange = {(e) => setUser2({...user, img: e.target.value})}/>
                    </div>
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