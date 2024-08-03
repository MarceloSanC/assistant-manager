import React from 'react';
import '../../styles/Manager.css';

function Session({ connectionStatus, qrCode, generateQRCode }) {
  return (
    <div className="form-section">
      <h2>Sessão Whats App</h2>
      <div className="form-group">
        <label>Status da Conexão:</label>
        <p>{connectionStatus}</p>
        <small className="hint">Exibe o status da conexão com o WhatsApp.</small>
      </div>
      <div className="form-group qr-code-container">
        {qrCode ? (
          <img src={qrCode} alt="QR Code" />
        ) : (
          <p>Nenhum QR Code disponível.</p>
        )}
        <small className="hint">Mostra o QR Code quando disponível.</small>
      </div>
      <button className="activate-button" onClick={generateQRCode}>
        Gerar QR Code
      </button>
    </div>
  );
}

export default Session;