import React from 'react';
import '../../styles/Manager.css';

function Products({ products, setProducts }) {
  const handleProductsChange = (field, value) => {
    setProducts(prevProducts => ({
      ...prevProducts,
      [field]: value
    }));
  };

  return (
    <div className="form-section">
      <h2>Produtos e Adicionais</h2>
      <div className="form-group">
        <label>Tabela de Cardápio Diurno:</label>
        <input
          type="file"
          onChange={(e) => handleProductsChange('dayCsvFile', e.target.files[0])}
        />
        <small className="hint">Envie um arquivo .csv ou .xlsx com o cardápio diurno.</small>
      </div>
      <div className="form-group">
        <label>Lista de IDs dos Produtos Mais Pedidos Diurno:</label>
        <input
          type="text"
          value={products.topDayProductsId}
          onChange={(e) => handleProductsChange('topDayProductsId', e.target.value)}
        />
        <small className="hint">Insira uma lista de IDs dos produtos mais pedidos durante o dia.</small>
      </div>
      <div className="form-group">
        <label>Tabela de Cardápio Noturno:</label>
        <input
          type="file"
          onChange={(e) => handleProductsChange('nightCsvFile', e.target.files[0])}
        />
        <small className="hint">Envie um arquivo .csv ou .xlsx com o cardápio noturno.</small>
      </div>
      <div className="form-group">
        <label>Lista de IDs dos Produtos Mais Pedidos Noturno:</label>
        <input
          type="text"
          value={products.topNightProductsId}
          onChange={(e) => handleProductsChange('topNightProductsId', e.target.value)}
        />
        <small className="hint">Insira uma lista de IDs dos produtos mais pedidos durante a noite.</small>
      </div>
    </div>
  );
}

export default Products;