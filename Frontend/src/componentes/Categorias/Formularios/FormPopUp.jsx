import React from 'react';
import './FormPopUp.css';

const FormPopUp = ({ cancelar, categoria, confirmar, isProcessing }) => {
    
    // Función simple para confirmar
    const handleConfirmar = (e) => {
        e.preventDefault();
        confirmar(); // Llama a 'crearCategoria' del padre
    };

    return (
        <div className="PopUpParent">
            <div className="PopUp">
                <div className="popup-header">
                    <h2>¿Confirmar creación?</h2>
                </div>

                <div className="popup-body">
                    <p>Estás a punto de crear la siguiente categoría:</p>
                    
                    <div className="popup-summary">
                        <div className="summary-item">
                            <strong>Nombre:</strong> <span>{categoria.nombre}</span>
                        </div>
                        <div className="summary-item">
                            <strong>Descripción:</strong> 
                            <span className="desc-text">{categoria.descripcion || "Sin descripción"}</span>
                        </div>
                        {categoria.img && (
                            <div className="summary-img">
                                <img src={categoria.img} alt="Logo" />
                            </div>
                        )}
                    </div>

                    <div className="alert-info">
                        ℹ️ Podrás agregar productos a esta categoría una vez creada, desde el panel de edición.
                    </div>
                </div>

                <div className="grid-container-PopUp">
                    <button 
                        className="btn-cancel" 
                        onClick={cancelar}
                        disabled={isProcessing}
                    >
                        Corregir
                    </button>
                    <button 
                        className="btn-confirm" 
                        onClick={handleConfirmar}
                        disabled={isProcessing}
                    >
                        {isProcessing ? "Creando..." : "Confirmar y Crear"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormPopUp;