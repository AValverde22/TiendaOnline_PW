import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Summary from "../Carrito/Summary/Summary";

// IMPORTANTE: Usamos los contextos, NO llamadas a API directas
import { useCart } from "../../api/context/CartContext";
import { useCheckout } from "../../api/context/CheckoutContext";
import "./Checkout.css";

const CheckoutForm = () => {
  const navigate = useNavigate();

  // 1. Obtenemos datos del carrito desde el Context (Single Source of Truth)
  const { total, count, items } = useCart();
  
  // 2. Obtenemos estado global del Checkout (para guardar/leer dirección)
  const { shippingAddress, setShippingAddress } = useCheckout();

  // 3. Estado local del formulario
  // Inicializamos con lo que haya en el Context (para persistencia si vuelven atrás)
  const [form, setForm] = useState({
    nombre: "", 
    apellido: "", 
    ciudad: "", 
    departamento: "", 
    direccion: "", 
    codigoPostal: "", 
    telefono: "",
    ...shippingAddress // Sobrescribe con datos guardados si existen
  });

  // Si el carrito está vacío, no deberían estar aquí
  useEffect(() => {
    if (items.length === 0) {
        alert("Tu carrito está vacío.");
        navigate("/carrito");
    }
  }, [items, navigate]);

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!form.nombre || !form.apellido || !form.direccion || !form.telefono) {
        alert("Por favor completa los campos obligatorios.");
        return;
    }

    // 4. GUARDAR EN EL CONTEXTO (Esto persiste en SessionStorage gracias a tu provider)
    setShippingAddress(form);

    // 5. Navegar al siguiente paso (Pago)
    navigate("/Checkout2"); 
  };

  console.log("Datos:", items);

  return (
    <div className="checkout-page">
      <Header />

      <div className="container">
        <h1 className="checkout-title">Finalizar Compra</h1>
        
        <div className="checkout-layout">
          {/* LADO IZQUIERDO: FORMULARIO */}
          <main className="checkout-left">
            <div className="checkout-card">
                <h3>📍 Dirección de envío</h3>
                <form onSubmit={handleSubmit} className="address-form">
                  <div className="form-row">
                    <input name="nombre" value={form.nombre} onChange={handle} placeholder="Nombre *" required />
                    <input name="apellido" value={form.apellido} onChange={handle} placeholder="Apellido *" required />
                  </div>
                  
                  <div className="form-row">
                    <input name="telefono" value={form.telefono} onChange={handle} placeholder="Teléfono *" required />
                    <input name="ciudad" value={form.ciudad} onChange={handle} placeholder="Ciudad *" required />
                  </div>

                  <input 
                    name="direccion" 
                    value={form.direccion} 
                    onChange={handle} 
                    placeholder="Dirección exacta (Calle, número, ref) *" 
                    className="full-width" 
                    required 
                  />

                  <div className="form-row">
                    <input name="departamento" value={form.departamento} onChange={handle} placeholder="Departamento / Estado" />
                    <input name="codigoPostal" value={form.codigoPostal} onChange={handle} placeholder="Código Postal" />
                  </div>
                  
                  <div className="form-actions">
                      <button type="button" className="btn-primary" onClick={() => navigate("/Carrito")}>
                        Volver al Carrito
                      </button>
                      <button type="submit" className="btn-primary">
                        Continuar al Pago ➝
                      </button>
                  </div>
                </form>
            </div>
          </main>

          {/* LADO DERECHO: RESUMEN (Usando datos reales del Context) */}
          <aside className="checkout-right">
             <div className="summary-card">
                <h3>Resumen de compra</h3>
                {/* Reutilizamos tu componente Summary */}
                <Summary total={total} count={count} />
                
                <div className="mini-items-list">
                    {items.map(item => (
                        <div key={item.id} className="mini-item">
                            <span>{item.cantidad}x {item.producto?.nombre || item.nombre}</span>
                            <span>S/ {((item.precio || item.producto?.precio) * item.cantidad).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;