import React from 'react';
import '../../styles/Manager.css';

function Messages({ messages, setMessages }) {
  const handleMessagesChange = (field, value) => {
    setMessages(prevMessages => ({
      ...prevMessages,
      [field]: value
    }));
  };

  return (
    <div className="form-section">
      <h2>Mensagens</h2>
      <div className="form-group">
        <label>Mensagem Genérica 1:</label>
        <input
          type="text"
          value={messages.genericMessage1}
          onChange={(e) => handleMessagesChange('genericMessage1', e.target.value)}
        />
        <small className="hint">Insira a mensagem genérica 1.</small>
      </div>
      <div className="form-group">
        <label>Mensagem Genérica 2:</label>
        <input
          type="text"
          value={messages.genericMessage2}
          onChange={(e) => handleMessagesChange('genericMessage2', e.target.value)}
        />
        <small className="hint">Insira a mensagem genérica 2.</small>
      </div>
      <div className="form-group">
        <label>Mensagem Genérica 3:</label>
        <input
          type="text"
          value={messages.genericMessage3}
          onChange={(e) => handleMessagesChange('genericMessage3', e.target.value)}
        />
        <small className="hint">Insira a mensagem genérica 3.</small>
      </div>
    </div>
  );
}

export default Messages;