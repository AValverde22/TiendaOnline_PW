import React from 'react';
import './ConfirmModal.css';

function ConfirmModal({ isOpen, onClose, onConfirm, productName }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <h2>Eliminar producto</h2>
        <p>¿Estás seguro que deseas eliminar el producto "{productName}"?</p>

        <div className="modal-actions">
          <button className="btn-confirm" onClick={onConfirm}>
            Sí, eliminar
          </button>

          <button className="btn-cancel" onClick={onClose}>
            No, cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
