import React from 'react';
import './DashboardAdmin.css'; // Reutilizamos los estilos existentes

/**
 * Componente de Tabla Reutilizable
 * @param {Array} columns - Definición de columnas [{ header, accessor, render, className }]
 * @param {Array} data - Datos a mostrar
 * @param {Function} onRowClick - (Opcional) Función al hacer click en una fila
 * @param {Function} rowClassName - (Opcional) Función para determinar clase de la fila
 * @param {String} emptyMessage - Mensaje cuando no hay datos
 */
const TableComponent = ({ columns, data, onRowClick, rowClassName, emptyMessage = "No hay datos para mostrar." }) => {
    if (!data || data.length === 0) {
        return (
            <div className="tabla-container">
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="tabla-container">
            <table className="user-table">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className={col.className || ''}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => {
                        const rowClass = rowClassName ? rowClassName(row) : '';
                        const isClickable = !!onRowClick;

                        return (
                            <tr
                                key={row.id || rowIndex}
                                className={rowClass}
                                onClick={onRowClick ? (e) => onRowClick(row, e) : undefined}
                                style={isClickable ? { cursor: 'pointer' } : {}}
                            >
                                {columns.map((col, colIndex) => (
                                    <td key={`${rowIndex}-${colIndex}`} className={col.className || ''}>
                                        {col.render ? col.render(row) : (col.accessor ? row[col.accessor] : '')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
