import { useEffect, useState } from "react";
import usuariosApi from "../../api/usuariosApi";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import { useUser } from "../../api/context/UserContext.jsx";

const TodosLosUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const { token } = useUser();

    useEffect(() => {
        const fetchUsuarios = async () => {
            if (!token) return;
            try {
                const data = await usuariosApi.findAll(token);
                if (Array.isArray(data)) {
                    setUsuarios(data);
                }
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
            }
        };
        fetchUsuarios();
    }, [token]);

    return (
        <>
            <Header />
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
            <Footer />
        </>
    );

};

export default TodosLosUsuarios;
