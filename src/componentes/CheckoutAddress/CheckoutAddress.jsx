import React, { useState } from "react";
import "./CheckoutAddress.css";

const CheckoutAddress = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    ciudad: "",
    departamento: "",
    direccion: "",
    codigoPostal: "",
    telefono: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de envío:", formData);
  };

  return (
    <form className="shipping-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del usuario"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            placeholder="Apellido del usuario"
            value={formData.apellido}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ciudad</label>
          <input
            type="text"
            name="ciudad"
            placeholder="Nombre de la ciudad"
            value={formData.ciudad}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Departamento</label>
          <input
            type="text"
            name="departamento"
            placeholder="Nombre de la ciudad"
            value={formData.departamento}
            onChange={handleChange}
          />
        </div>

        <div className="form-group form-wide">
          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            placeholder="Av. la molina 1233..."
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Código postal</label>
          <input
            type="text"
            name="codigoPostal"
            placeholder="Código postal"
            value={formData.codigoPostal}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Teléfono de contacto</label>
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono de contacto"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default CheckoutAddress;
