import React from 'react';
import '../../styles/Manager.css';

function Sales({ sales, setSales }) {
  const handleSalesChange = (field, value) => {
    setSales(prevSales => ({
      ...prevSales,
      [field]: value
    }));
  };

  return (
    <div className="form-section">
      <h2>Vendas</h2>
      <div className="form-group">
        <label>Recomendação de Produtos:</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={sales.productRecommendations}
            onChange={(e) => handleSalesChange('productRecommendations', e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
        <small className="hint">Ative ou desative a recomendação de produtos.</small>
      </div>
      <div className="form-group">
        <label>Revenda de Produtos Recorrentes:</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={sales.recurringProductsResell}
            onChange={(e) => handleSalesChange('recurringProductsResell', e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
        <small className="hint">Ative ou desative a revenda de produtos recorrentes.</small>
      </div>
      <div className="form-group">
        <label>Tempo para Oferecer Produtos Recorrentes:</label>
        <input
          type="text"
          value={sales.timeToOfferRecurringProducts}
          onChange={(e) => handleSalesChange('timeToOfferRecurringProducts', e.target.value)}
          placeholder="hh:mm:ss"
        />
        <small className="hint">Insira o tempo para oferecer produtos recorrentes.</small>
      </div>
    </div>
  );
}

export default Sales;