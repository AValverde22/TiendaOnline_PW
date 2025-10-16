import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Summary from "../Carrito/Summary/Summary";
import "./Checkout.css";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre:"", apellido:"", ciudad:"", departamento:"", direccion:"", codigoPostal:"", telefono:""
  });

  const handle = e => setForm({...form,[e.target.name]: e.target.value});

  const handleSubmit = e => {
    e.preventDefault();
    if(!form.nombre || !form.direccion) { alert("Completa los datos"); return; }
    navigate("/Checkout2");
  };

  return (
    <div>
    <Header />

    <div className="container">
      <div className="checkout-layout">
        <main className="checkout-left">
          <h2>Dirección de envío</h2>
          <form onSubmit={handleSubmit} className="address-form">
            <div className="row">
              <input name="nombre" value={form.nombre} onChange={handle} placeholder="Nombre" />
              <input name="apellido" value={form.apellido} onChange={handle} placeholder="Apellido" />
            </div>
            <div className="row">
              <input name="ciudad" value={form.ciudad} onChange={handle} placeholder="Ciudad" />
              <input name="departamento" value={form.departamento} onChange={handle} placeholder="Departamento" />
            </div>
            <input name="direccion" value={form.direccion} onChange={handle} placeholder="Dirección" />
            <div className="row">
              <input name="codigoPostal" value={form.codigoPostal} onChange={handle} placeholder="Código postal" />
              <input name="telefono" value={form.telefono} onChange={handle} placeholder="Teléfono" />
            </div>
            <button type="submit" className="btn-primary">Seleccionar método de pago</button>
          </form>
        </main>

        <aside className="checkout-right">
          <Summary />
        </aside>
      </div>
    </div>
    </div>
  );
};

export default CheckoutForm;
