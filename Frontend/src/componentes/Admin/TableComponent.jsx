import React, { useState, useMemo, useEffect } from 'react';
import './TableComponent.css';

const TableComponent = ({
    columns,
    data,
    onRowClick,
    rowClassName,
    emptyMessage = "No hay datos para mostrar.",
    itemsPerPage = 5,
    enablePagination = true
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Reinicia a la página 1 si los datos cambian (filtro aplicado externamente, etc.)
    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    const totalPages = useMemo(() => Math.ceil((data?.length || 0) / itemsPerPage), [data, itemsPerPage]);

    const paginatedData = useMemo(() => {
        if (!enablePagination) return data;
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data ? data.slice(start, end) : [];
    }, [data, currentPage, itemsPerPage, enablePagination]);

    if (!data || data.length === 0) {
        return <div className="table-wrapper"><p style={{padding: '20px', textAlign: 'center', color: '#666'}}>{emptyMessage}</p></div>;
    }

    return (
        <div className="table-wrapper">
            <table className="user-table">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className={col.className || ''} style={col.width ? { width: col.width } : {}}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row) => {
                        const rowClass = rowClassName ? rowClassName(row) : '';
                        const isClickable = !!onRowClick;
                        return (
                            <tr
                                key={row.id}
                                className={rowClass}
                                onClick={onRowClick ? (e) => {
                                    if (e.target.tagName !== "BUTTON" && !e.target.closest("button")) onRowClick(row, e);
                                } : undefined}
                                style={isClickable ? { cursor: 'pointer' } : {}}
                            >
                                {columns.map((col, colIndex) => (
                                    <td key={`${row.id}-${colIndex}`} className={col.className || ''}>
                                        {col.render ? col.render(row) : col.accessor ? row[col.accessor] : ''}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* CAMBIO AQUÍ: Eliminamos la condición "totalPages > 1" */}
            {enablePagination && (
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={currentPage === i + 1 ? 'active' : ''}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TableComponent;