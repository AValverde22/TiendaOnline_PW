import { useEffect, useState } from "react";
import "./Carrito.css";
import ProductoCarrito from "./ProductoCarrito";
import ProductoGuardado from "./ProductoGuardado";
import ResumenCompra from "./ResumenCompra";
import productosApi from "../api/productosApi";

const Carrito = () => {
  const [carrito, setCarrito] = useState(() => {
    const raw = localStorage.getItem("mi_carrito");
    if (raw) {
      try { return JSON.parse(raw); } catch { return productosApi.map(p => ({ ...p })); }
    }
    return productosApi.map(p => ({ ...p }));
  });

  const [guardados, setGuardados] = useState(() => {
    const raw = localStorage.getItem("guardados_para_despues");
    if (raw) {
      try { return JSON.parse(raw); } catch { return []; }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("mi_carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem("guardados_para_despues", JSON.stringify(guardados));
  }, [guardados]);

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCarrito(prev => prev.map(p => p.id === id ? { ...p, cantidad: nuevaCantidad } : p));
  };

  const eliminarDelCarrito = (id) => setCarrito(prev => prev.filter(p => p.id !== id));

  const moverAGuardados = (id) => {
    setCarrito(prev => {
      const encontrado = prev.find(p => p.id === id);
      if (!encontrado) return prev;
      setGuardados(g => (g.find(x => x.id === id) ? g : [...g, { ...encontrado }]));
      return prev.filter(p => p.id !== id);
    });
  };

  const moverAlCarrito = (id) => {
    setGuardados(prev => {
      const encontrado = prev.find(p => p.id === id);
      if (!encontrado) return prev;
      setCarrito(c => {
        const existe = c.find(x => x.id === id);
        if (existe) return c.map(x => x.id === id ? { ...x, cantidad: x.cantidad + encontrado.cantidad } : x);
        return [...c, { ...encontrado }];
      });
      return prev.filter(p => p.id !== id);
    });
  };

  const eliminarGuardado = (id) => setGuardados(prev => prev.filter(p => p.id !== id));

  const totalCarrito = carrito.reduce((s, p) => s + p.precio * p.cantidad, 0);

  const completarOrden = () => {
    if (carrito.length === 0) { alert("No hay productos en el carrito."); return; }
    const orden = { id: `ORD-${Date.now()}`, fecha: new Date().toISOString(), items: carrito, total: totalCarrito };
    const ordenesPrev = JSON.parse(localStorage.getItem("ordenes") || "[]");
    localStorage.setItem("ordenes", JSON.stringify([orden, ...ordenesPrev]));
    setCarrito([]);
    alert(`Orden creada (simulada). Nº ${orden.id}`);
  };

  return (
    <main className="container" style={{ paddingTop: 18 }}>
      <div className="page-titulo">Carrito de compras</div>

      <div className="grid-2" style={{ marginTop: 14 }}>
        <section className="card">
          {carrito.length === 0 ? (
            <div className="small">Tu carrito está vacío.</div>
          ) : (
            carrito.map(producto => (
              <ProductoCarrito
                key={producto.id}
                producto={producto}
                actualizarCantidad={actualizarCantidad}
                eliminarDelCarrito={eliminarDelCarrito}
                moverAGuardados={moverAGuardados}
              />
            ))
          )}

          <div style={{ marginTop: 20 }}>
            <h4 style={{ marginBottom: 10 }}>Guardados para después</h4>
            {guardados.length === 0 ? (
              <div className="small">No tienes ítems guardados.</div>
            ) : (
              guardados.map(p => (
                <ProductoGuardado
                  key={p.id}
                  producto={p}
                  moverAlCarrito={moverAlCarrito}
                  eliminarGuardado={eliminarGuardado}
                />
              ))
            )}
          </div>
        </section>

        <aside className="card" style={{ height: "fit-content" }}>
          <ResumenCompra
            total={totalCarrito}
            cantidad={carrito.length}
            completarOrden={completarOrden}
            cancelarCompra={() => {
              if (confirm("¿Cancelar compra y vaciar carrito?")) setCarrito([]);
            }}
          />
        </aside>
      </div>
    </main>
  );
};

export default Carrito;
