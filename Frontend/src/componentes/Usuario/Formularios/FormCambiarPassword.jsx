import { useState, useEffect } from 'react'
import './FormCambiarPassword.css'

const FormCambiarPassword = ({ onSubmit, user, onCancel }) => {
    const [ usuario, setUsuario ] = useState(user);
    const [ contra1, setContra1 ] = useState("");
    const [ contra2, setContra2 ] = useState("");
    const [ verificacion, setVerificacion ] = useState("");
    useEffect(() => {setUsuario(user);}, [user]);

    const verificarDesdeContra1 = (e) => {
        const password = e.target.value;
        setContra1(password);

        if(password === contra2) {setVerificacion(""); setUsuario({...usuario, password: contra2})}
        else setVerificacion("¡Las contraseñas no coinciden!");
    }

    const verificarDesdeContra2 = (e) => {
        const password = e.target.value;
        setContra2(password);

        if(contra1 === password) {setVerificacion(""); setUsuario({...usuario, password: contra1})}
        else setVerificacion("¡Las contraseñas no coinciden!");
    }

    const handleCancel = (e) => {e.preventDefault(); onCancel();}
    const handleSubmit = (e) => {
        e.preventDefault(); 

        if(verificacion === "" && contra1 !== "") onSubmit(usuario);
        else alert("¡Las contraseñas tienen que coincidir!");
    }

    return (
        <div class="CambiarPasswordParent">
            <div class="CambiarPassword">
                <h1>Cambiar contraseña</h1>

                    <form class="grid-container-CP">
                        <div>
                            <label>Nueva contraseña</label><br></br>
                            <input type="text" placeholder = "Nueva Contraseña"
                                onChange = {(e) => verificarDesdeContra1(e)}/>
                        </div>
                        <div>
                            <label>Confirmar contraseña</label><br></br>
                            <input type="text" placeholder = "Confirmar Contraseña"
                                onChange = {(e) => verificarDesdeContra2(e)}/>
                        </div>
                    </form>                       
                    
                    <div class="grid-container-CP2">
                        <button onClick = {(e) => handleCancel(e)}>Cancelar</button>
                        <button onClick = {(e) => handleSubmit(e)}>Confirmar</button>
                    </div>

                <div class="alerta">{verificacion}</div>
            </div>        
        </div>
        
    );
};

export default FormCambiarPassword;