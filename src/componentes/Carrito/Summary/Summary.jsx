import React from "react";
import "./Summary.css";

const Summary = ({ total, count }) => {

  
  return (
    <div className="summary-card">
      <h2>Resumen de compra</h2>
      <p>Tipos de Productos: {count}</p>
      <h3>Total: S/ {(total ?? 0).toFixed(2)}</h3>
      
    </div>
  );
};

export default Summary;
