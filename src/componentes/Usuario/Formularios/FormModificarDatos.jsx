import { useState, useEffect } from 'react'
import './FormModificarDatos.css'

const FormModificarDatos = ({ onSubmit, user, onCancel }) => {
    const [user2, setUser2] = useState(user);
    useEffect(() => {setUser2(user);}, [user]);

    const handleSubmit = (e) => {e.preventDefault(); onSubmit(user2);}
    const handleCancel = (e) => {e.preventDefault(); onCancel();}

    return (
        <div class="ModificarDatosUsuarioParent">  
            <div class="ModificarDatosUsuario">
                <h1>Modificar Datos</h1>
                
                <div class="ParentDeImagen-MDU">
                    {(user2.img === "") ? (<img src={`https://i.pravatar.cc/150?u=${user2.id}`}/>) : (<img src={user2.img}/>)}
                </div>
                
                <form class="grid-container-MDU">
                    <div>
                        <label>Nombre</label><br></br>
                        <input type="text" value = {user2.nombre}
                            onChange = {(e) => setUser2({...user2, nombre: e.target.value})}/>
                    </div>
                    <div>
                        <label>Apellido</label><br></br>
                        <input type="text" value = {user2.apellido}
                            onChange = {(e) => setUser2({...v, apellido: e.target.value})}/>
                    </div>

                    <div>
                        <label>Correo</label><br></br>
                        <input type="text" value = {user2.correo}
                           onChange = {(e) => setUser2({...user2, correo: e.target.value})}/>
                    </div>
                    <div>
                        <label>Foto de perfil</label><br></br>
                        <input type="text" value = {user2.img}
                           onChange = {(e) => setUser2({...user2, img: e.target.value})}/>
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