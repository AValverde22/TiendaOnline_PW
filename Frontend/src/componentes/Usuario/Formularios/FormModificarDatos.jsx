import { useState, useEffect } from 'react';
import './FormModificarDatos.css';

const FormModificarDatos = ({ onSubmit, user, onCancel }) => {
    // Estado seguro
    const [user2, setUser2] = useState(user || { nombre: '', apellido: '', correo: '', img: '' });

    useEffect(() => {
        if (user) setUser2(user);
    }, [user]);

    // Manejadores de eventos para evitar recarga de página
    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit(user2);
    }

    const handleCancel = (e) => {
        e.preventDefault(); 
        onCancel();
    }

    // Evitar render si no hay datos
    if (!user2) return null;

    return (
        <div className="ModificarDatosUsuarioParent">  
            <div className="ModificarDatosUsuario">
                <h1>Modificar Datos</h1>
                
                <div className="ParentDeImagen-MDU">
                    {(!user2.img || user2.img === "") ? (
                        <img src={`https://ui-avatars.com/api/?name=${user2.nombre}+${user2.apellido}`} alt="Avatar Default"/>
                    ) : (
                        <img src={user2.img} alt="Avatar" onError={(e) => e.target.src = "https://via.placeholder.com/150"}/>
                    )}
                </div>
                
                <form className="grid-container-MDU">
                    <div>
                        <label>Nombre</label><br/>
                        <input 
                            type="text" 
                            value={user2.nombre || ''}
                            onChange={(e) => setUser2({...user2, nombre: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Apellido</label><br/>
                        <input 
                            type="text" 
                            value={user2.apellido || ''}
                            // CORREGIDO: "v" cambiado por "user2" (Esto causaba error al escribir)
                            onChange={(e) => setUser2({...user2, apellido: e.target.value})}
                        />
                    </div>

                    <div>
                        <label>Correo</label><br/>
                        <input 
                            type="text" 
                            value={user2.correo || ''}
                            onChange={(e) => setUser2({...user2, correo: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Foto de perfil (URL)</label><br/>
                        <input 
                            type="text" 
                            value={user2.img || ''}
                            onChange={(e) => setUser2({...user2, img: e.target.value})}
                        />
                    </div>
                </form>

                <div className="grid-container-MDU2">
                    <button onClick={handleCancel}>Cancelar</button>
                    {/* El onClick aquí es redundante si el form no tiene onSubmit, 
                        pero lo dejamos así para asegurar que llame a tu función */}
                    <button onClick={handleSubmit}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default FormModificarDatos;