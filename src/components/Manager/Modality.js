import React from 'react';
import './Manager.css';

function Modality({ modality, setModality, tableInterval, setTableInterval, excludedValues, setExcludedValues }) {
  return (
    <div className="form-section">
      <h2>Modalidade</h2>
      <div className="form-group">
        <label>Modalidade de Atendimento:</label>
        <select value={modality} onChange={(e) => setModality(e.target.value)}>
          <option value="Mesa">Mesa</option>
          <option value="Comanda">Comanda</option>
          <option value="Delivery">Delivery</option>
        </select>
        <small className="hint">Escolha a modalidade de atendimento.</small>
      </div>
      <div className="form-group">
        <label>Intervalo de Mesas Disponíveis:</label>
        <div>
          <input
            type="number"
            placeholder="Mínimo"
            value={tableInterval.min}
            onChange={(e) => setTableInterval(prev => ({ ...prev, min: e.target.value }))}
          />
          <input
            type="number"
            placeholder="Máximo"
            value={tableInterval.max}
            onChange={(e) => setTableInterval(prev => ({ ...prev, max: e.target.value }))}
          />
        </div>
        <small className="hint">Insira o intervalo de mesas disponíveis.</small>
      </div>
      <div className="form-group">
        <label>Excluir Valores:</label>
        <input
          type="text"
          value={excludedValues}
          onChange={(e) => setExcludedValues(e.target.value)}
        />
        <small className="hint">Insira uma lista de valores a serem excluídos.</small>
      </div>
    </div>
  );
}

export default Modality;