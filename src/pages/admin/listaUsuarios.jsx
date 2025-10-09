import React from 'react';

const TablaUsuarios = ({ usuarios }) => {
  return (
    <div className="tabla-container">
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>Fecha de registro</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombreCompleto}</td>
              <td>{usuario.fechaRegistro}</td>
              <td>
                <span className={`estado ${usuario.estado.toLowerCase()}`}>
                  {usuario.estado}
                </span>
              </td>
              <td>
                <button className="btn-desactivar">
                  Desactivar
                </button>
                <button className="btn-ver">
                  Ver detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUsuarios;