import React from 'react';
import './Manager.css';

function Groups({ groups, setGroups }) {
  const handleGroupChange = (field, value) => {
    setGroups(prevGroups => ({
      ...prevGroups,
      [field]: value
    }));
  };

  return (
    <div className="form-section">
      <h2>Grupos</h2>
      <div className="form-group">
        <label>Pedidos:</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={groups.orders}
            onChange={(e) => handleGroupChange('orders', e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
        <small className="hint">Ative ou desative o grupo de pedidos.</small>
      </div>
      <div className="form-group">
        <label>Caixa:</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={groups.cashier}
            onChange={(e) => handleGroupChange('cashier', e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
        <small className="hint">Ative ou desative o grupo de caixa.</small>
      </div>
      <div className="form-group">
        <label>Atendente:</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={groups.attendant}
            onChange={(e) => handleGroupChange('attendant', e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
        <small className="hint">Ative ou desative o grupo de atendentes.</small>
      </div>
      <div className="form-group">
        <label>Garçom:</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={groups.waiter}
            onChange={(e) => handleGroupChange('waiter', e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
        <small className="hint">Ative ou desative o grupo de garçons.</small>
      </div>
    </div>
  );
}

export default Groups;