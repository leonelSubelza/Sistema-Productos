import React, { useState } from 'react';

export default function NumeroWhatsapp({ show, whatsappNumber, setWhatsappNumber }) {
  if (!show) return null;

  const handleInputChange = (event) => {
    setWhatsappNumber(event.target.value);
  };

  return (
    <div>
      <h2>Gestionar Número de WhatsApp</h2>
      <input
        type="text"
        value={whatsappNumber}
        onChange={handleInputChange}
        placeholder="Ingrese el número de WhatsApp"
      />
    </div>
  );
}
