import { useState } from 'react';
import './FormAgregarCategoria.css';

const FormularioCategoria = ({ onSubmit, onCancel }) => {
    // Estado local del formulario
    const [categoria, setCategoria] = useState({
        nombre: "",
        descripcion: "",
        img: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria(prev => ({ ...prev, [name]: value }));
    };

    const handleCancel = (e) => {
        e.preventDefault();
        onCancel();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(categoria);
    };

    return (
        <div className="AgregarCategoriaParent">
            <div className="AgregarCategoria">
                <h1>Nueva categoría</h1>
                
                <form onSubmit={handleSubmit} className="form-grid">
                    
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text" 
                            name="nombre"
                            id="nombre"
                            value={categoria.nombre} 
                            placeholder="Ej: Acción, Estrategia..."
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea 
                            name="descripcion"
                            id="descripcion"
                            value={categoria.descripcion} 
                            placeholder="Descripción de la categoría..."
                            rows="4"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="img">URL de imagen</label>
                        <input 
                            type="text" 
                            name="img"
                            id="img"
                            value={categoria.img} 
                            placeholder="https://..."
                            onChange={handleChange}
                        />
                    </div>

                    {/* Previsualización opcional si hay imagen */}
                    {categoria.img && (
                        <div className="img-preview-mini">
                            <img src={categoria.img} alt="Vista previa" onError={(e) => e.target.style.display='none'}/>
                        </div>
                    )}

                    <div className="grid-botones-AgregarCategoria">
                        <button className="btn-cancel" onClick={handleCancel}>Cancelar</button>
                        <button className="btn-confirm" type="submit">Continuar</button>
                    </div>
                </form>
            </div>    
        </div>
    );
};

export default FormularioCategoria;