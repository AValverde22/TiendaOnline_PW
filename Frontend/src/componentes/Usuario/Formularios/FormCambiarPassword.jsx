import { useState } from 'react';
import './FormCambiarPassword.css';

const FormCambiarPassword = ({ onSubmit, onCancel }) => {
    // Eliminamos el estado 'usuario' completo. El formulario solo gestiona los inputs.
    const [ contra1, setContra1 ] = useState("");
    const [ contra2, setContra2 ] = useState("");
    const [ verificacion, setVerificacion ] = useState("");

    const handleContra1Change = (e) => {
        const val = e.target.value;
        setContra1(val);
        // Validación en tiempo real
        if (contra2 !== "" && val !== contra2) {
            setVerificacion("¡Las contraseñas no coinciden!");
        } else {
            setVerificacion("");
        }
    };

    const handleContra2Change = (e) => {
        const val = e.target.value;
        setContra2(val);
        // Validación en tiempo real
        if (val !== contra1) {
            setVerificacion("¡Las contraseñas no coinciden!");
        } else {
            setVerificacion("");
        }
    };

    const handleCancel = (e) => {
        e.preventDefault(); 
        onCancel();
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (contra1 === "" || contra2 === "") {
            setVerificacion("Los campos no pueden estar vacíos");
            return;
        }

        if (contra1 === contra2) {
            // Enviamos solo la nueva contraseña al componente padre
            onSubmit(contra1); 
        } else {
            setVerificacion("¡Las contraseñas tienen que coincidir!");
        }
    };

    return (
        <div className="CambiarPasswordParent">
            <div className="CambiarPassword">
                <h1>Cambiar contraseña</h1>

                <form className="grid-container-CP">
                    <div>
                        <label>Nueva contraseña</label><br/>
                        <input 
                            type="password" // CAMBIO IMPORTANTE: Ocultar caracteres
                            placeholder="Nueva Contraseña"
                            value={contra1}
                            onChange={handleContra1Change}
                        />
                    </div>
                    <div>
                        <label>Confirmar contraseña</label><br/>
                        <input 
                            type="password" // CAMBIO IMPORTANTE: Ocultar caracteres
                            placeholder="Confirmar Contraseña"
                            value={contra2}
                            onChange={handleContra2Change}
                        />
                    </div>
                </form>                       
                
                <div className="grid-container-CP2">
                    <button onClick={handleCancel}>Cancelar</button>
                    <button onClick={handleSubmit}>Confirmar</button>
                </div>

                {/* Renderizado condicional para que la alerta solo ocupe espacio si existe */}
                {verificacion && <div className="alerta">{verificacion}</div>}
            </div>        
        </div>
    );
};

export default FormCambiarPassword;