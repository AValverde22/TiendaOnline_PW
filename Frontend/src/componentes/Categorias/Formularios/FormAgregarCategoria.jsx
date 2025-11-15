import { useState } from 'react'
import './FormAgregarCategoria.css'

const FormularioCategoria = ({ onSubmit, onCancel }) => {
    const categoriaDefault = {
        id: 0,
        nombre: "",
        descripcion: "",
        img: ""
    };

    const [ categoria, setCategoria ] = useState(categoriaDefault);
    const handleCancel = (e) => {e.preventDefault(); onCancel();}
    const handleSubmit = (e) => {e.preventDefault(); onSubmit(categoria);}

    return (
        <div class="AgregarCategoriaParent">
            <div class="AgregarCategoria">
                <h1>Nueva categoría</h1>
                <br></br>

                <form>
            
                    <label>Nombre</label><br></br>
                    <input type="text" value = {categoria.nombre} placeholder="Nombre de la categoría"
                        onChange = {(e) => setCategoria({...categoria, nombre: e.target.value})}/>
                    <br></br>

                    <label>Descripción</label><br></br>
                    <textarea value = {categoria.descripcion} placeholder="Descripción de la categoría..."
                        onChange = {(e) => setCategoria({...categoria, descripcion: e.target.value})}/>

                    <br></br>

                    <label>URL de imagen</label><br></br>
                    <input type="text" value = {categoria.img} placeholder="URL del logo de la categoría..."
                        onChange = {(e) => setCategoria({...categoria, img: e.target.value})}/>
                    <br></br>   

                    <div class="grid-botones-AgregarCategoria">
                        <button onClick = {(e) => handleCancel(e)}>Cancelar</button>
                        <button onClick = {(e) => handleSubmit(e)}>Crear Categoría</button>
                    </div>
                </form>
            </div>    
        </div>
        
    );
};

export default FormularioCategoria;