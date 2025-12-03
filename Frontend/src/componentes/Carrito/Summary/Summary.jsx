import "./Summary.css";

const Summary = ({ total, count }) => {

  
  return (
      <>
        <p>Numero de Productos: {count}</p>
        <h3>Total: S/ {(total ?? 0).toFixed(2)}</h3>
      </>
      
  );
};

export default Summary;
