const ResumenCompra = ({ total, cantidad, completarOrden, cancelarCompra }) => {
  const descuento = 9.0;
  const totalFinal = Math.max(0, total - descuento);

  return (
    <div>
      <div style={{ fontWeight: 800, marginBottom: 8 }}>Resumen del carrito</div>

      <div style={{ marginBottom: 8 }}>
        <div className="small">Productos ({cantidad})</div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>S/ {total.toFixed(2)}</div>
      </div>

      <div className="small" style={{ marginBottom: 12 }}>Envío: <span style={{ fontWeight:700 }}>GRATIS</span></div>

      <div style={{ borderTop: "1px solid #eee", paddingTop: 8, marginBottom: 12 }}>
        <div style={{ display:"flex", justifyContent:"space-between" }}><div>Descuento</div><div className="small">-S/ {descuento.toFixed(2)}</div></div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, fontWeight:800 }}>Total <div>S/ {totalFinal.toFixed(2)}</div></div>
      </div>

      <div style={{ display:"grid", gap:10 }}>
        <button className="btn-green" onClick={completarOrden}>Continuar compra</button>
        <button className="btn-red" onClick={cancelarCompra}>Cancelar compra</button>
      </div>
    </div>
  );
};

export default ResumenCompra;
