import { useEffect, useState } from "react";
import usuariosApi from "../../api/usuariosApi";

const TodosLosUsuarios = () => {
    const [ usuarios, setUsuarios ] = useState([]);
    useEffect(() => {setUsuarios(usuariosApi.get());}, [])

    return (
        <>
            {
                usuarios.map((u) => {
                    return (
                        <>
                            {u.id} <br></br>
                            {u.username} <br></br>
                            {u.password} <br></br>
                            {u.nombre} <br></br>
                            {u.apellido} <br></br>
                            {u.correo} <br></br>
                            {u.img}<br></br>
                            {u.rol} <br></br>
                            <br></br>
                        </>
                    )
                })
            }
        </>
    );

};

export default TodosLosUsuarios;
