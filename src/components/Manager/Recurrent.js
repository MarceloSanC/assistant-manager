import React from 'react';

function Recurrent({ garcom, setGarcom, atendente, setAtendente, cozinha, setCozinha, caixa, setCaixa, recurrentTime, setRecurrentTime, recurrentCategories, setRecurrentCategories, timeToCloseBill, setTimeToCloseBill, faqUrl, setFaqUrl, pesquisaSatisfacao, setPesquisaSatisfacao }) {
  return (
    <div className="setup-form">
      <h1 className="setup-title">Produtos Recorrentes</h1>

      <h2>Configurações Recurrentes</h2>
      <label>Tempo para recomendação recorrente (em minutos):</label>
      <input
        className="setup-input"
        type="text"
        placeholder="Digite o tempo em minutos"
        value={recurrentTime}
        onChange={(e) => setRecurrentTime(e.target.value)}
      />
      <small>Após este tempo, o cliente será relembrado de realizar um novo pedido.</small>

      <label>Categorias Recurrentes:</label>
      <input
        className="setup-input"
        type="text"
        placeholder="Digite as categorias, separadas por vírgula"
        value={recurrentCategories}
        onChange={(e) => setRecurrentCategories(e.target.value)}
      />
      <small>Estas categorias serão oferecidas ao cliente após o tempo recorrente.</small>

      <h2>Outras Configurações</h2>
      <label>Tempo para fechar a conta (em minutos):</label>
      <input
        className="setup-input"
        type="text"
        placeholder="Digite o tempo em minutos"
        value={timeToCloseBill}
        onChange={(e) => setTimeToCloseBill(e.target.value)}
      />
      <small>Após este tempo, o cliente será convidado a fechar a conta.</small>

      <label>URL do FAQ:</label>
      <input
        className="setup-input"
        type="text"
        placeholder="Digite a URL do FAQ"
        value={faqUrl}
        onChange={(e) => setFaqUrl(e.target.value)}
      />
      <small>URL da página de perguntas frequentes do seu estabelecimento.</small>

      <label>
        <input
          type="checkbox"
          checked={pesquisaSatisfacao}
          onChange={() => setPesquisaSatisfacao(!pesquisaSatisfacao)}
        /> Ativar Pesquisa de Satisfação
      </label>
      <small>Ativar ou desativar a pesquisa de satisfação para os clientes.</small>
    </div>
  );
}

export default Recurrent;