import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Setup.css";
import qrCode from "../../assets/images/qr_code_barcode.jpg";

function Setup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [modality, setModality] = useState("");
  const [garcom, setGarcom] = useState(true);
  const [atendente, setAtendente] = useState(true);

  const [establishmentName, setEstablishmentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({ establishmentName: "", phoneNumber: "" });

  const handleNext = () => {
    let formErrors = {};

    if (currentStep === 1) {
      if (!establishmentName) {
        formErrors.establishmentName = "Campo obrigatório";
      }

      const phoneNumberPattern = /^\+\d{2} \(\d{2}\) \d{5}-\d{4}$/;
      if (!phoneNumberPattern.test(phoneNumber)) {
        formErrors.phoneNumber = "Número de telefone inválido";
      }
    }

    if (Object.keys(formErrors).length === 0) {
      setCurrentStep((prevStep) => prevStep + 1);
    }

    setErrors(formErrors);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "").substring(0, 13); // Mantém até 13 dígitos
    let formattedInput = input;

    if (input.length > 2) {
      formattedInput = `+${input.substring(0, 2)}`;
      if (input.length > 4) {
        formattedInput += ` (${input.substring(2, 4)})`;
        if (input.length > 9) {
          formattedInput += ` ${input.substring(4, 9)}-${input.substring(9, 13)}`;
        } else {
          formattedInput += ` ${input.substring(4)}`;
        }
      } else {
        formattedInput += ` ${input.substring(2)}`;
      }
    } else if (input.length > 0) {
      formattedInput = `+${input}`;
    }

    setPhoneNumber(formattedInput);
  };

  const navigate = useNavigate();
  const handleHomeButton = () => {
    navigate("/");
  };

  return (
    <div className="setup-page">
      <div className="setup-box">
        <div className={`step1 ${currentStep === 1 ? "active" : ""}`}>
          <h1 className="setup-title">Configuração do Bix Assistant</h1>
          <div className="setup-form">
            <h2>Nome do Estabelecimento</h2>
            <input
              className="setup-input"
              type="text"
              placeholder="Ex.: Restaurante do João"
              value={establishmentName}
              onChange={(e) => setEstablishmentName(e.target.value)}
            />
            {errors.establishmentName && <small className="error-text">{errors.establishmentName}</small>}
            <small>Este será o nome exibido no WhatsApp para seus clientes.</small>

            <h2>Número de Telefone do Chatbot</h2>
            <input className="setup-input" type="text" placeholder="+55 (12) 91234-5678" value={phoneNumber} onChange={handlePhoneChange} />
            {errors.phoneNumber && <small className="error-text">{errors.phoneNumber}</small>}
            <small>Utilize um número de telefone exclusivo para o chatbot.</small>

            <div className="buttons-section">
              <button className="setup-button prev-button" onClick={handlePrevious} style={{ display: "none" }}>
                Voltar
              </button>
              <button className="setup-button next-button" onClick={handleNext} disabled={currentStep === 5}>
                Próximo
              </button>
            </div>
          </div>
        </div>

        <div className={`step2 ${currentStep === 2 ? "active" : ""}`}>
          <h1 className="setup-title">Lista de produtos</h1>
          <h3>Carregue a tabela de produtos:</h3>
          <input type="file" accept=".csv" className="setup-input" />
          <small>Faça o upload de um arquivo .csv contendo a tabela de produtos.</small>

          <h3>Carregue a tabela de adicionais dos produtos:</h3>
          <input type="file" accept=".csv" className="setup-input" />
          <small>Faça o upload de um arquivo .csv contendo a tabela de adicionais.</small>

          <h3>IDs dos produtos mais pedidos:</h3>
          <input className="setup-input" type="text" placeholder="Digite os IDs dos produtos mais pedidos, separados por vírgula" />
          <small>Estes produtos serão mostrados primeiro na primeira categoria do Cardápio "Mais Pedidos".</small>

          <div className="buttons-section">
            <button className="setup-button" onClick={handlePrevious} disabled={currentStep === 1}>
              Voltar
            </button>
            <button className="setup-button" onClick={handleNext} disabled={currentStep === 5}>
              Próximo
            </button>
          </div>
        </div>

        <div className={`step3 ${currentStep === 3 ? "active" : ""}`}>
          <h1 className="setup-title">Formato de Atendimento</h1>
          <h3>Selecione a modalidade de atendimento do seu estabelecimento:</h3>
          <select className="setup-input" value={modality} onChange={(e) => setModality(e.target.value)}>
            <option value="mesa">Mesa</option>
            <option value="comanda">Comanda</option>
            <option value="delivery">Delivery</option>
          </select>
          <small>Refere-se a como seus clientes e pedidos são identificados, numero da mesa, comanda, ou código de entrega.</small>

          <h3>Mensagem quando o pedido estiver pronto:</h3>
          <textarea className="setup-input" placeholder="Um garçom irá trazer seu pedido assim que estiver pronto! Por favor, aguarde."></textarea>
          <small>
            Escreva a mensagem que será enviada aos clientes quando o pedido estiver pronto. Deve instruir o cliente sobre como retirar seu pedido.
          </small>

          <div className="buttons-section">
            <button className="setup-button" onClick={handlePrevious} disabled={currentStep === 1}>
              Voltar
            </button>
            <button className="setup-button" onClick={handleNext} disabled={currentStep === 5}>
              Próximo
            </button>
          </div>
        </div>

        <div className={`step4 ${currentStep === 4 ? "active" : ""}`}>
          <h1 className="setup-title">Grupos de Gerenciamento</h1>

          <div className="checkbox-section">
            <h3>Possui garçons disponíveis para serem chamados via WhatsApp?</h3>
            <small>
              Indique se você tem garçons disponíveis para atendimento via WhatsApp. Se esta opção estiver ativa, funcionários podem ser adicionados
              ao grupo "Garçom" para serem notificados quando um cliente selecionar a opção "Chamar garçom"
            </small>
            <label>
              <input type="radio" name="garcom" value="sim" checked={garcom} onChange={() => setGarcom(true)} /> Sim
            </label>
            <label>
              <input type="radio" name="garcom" value="nao" checked={!garcom} onChange={() => setGarcom(false)} /> Não
            </label>
          </div>

          <div className="checkbox-section">
            <h3>Possui atendentes disponíveis para conversar com os clientes via WhatsApp?</h3>
            <small>
              Indique se você tem atendentes disponíveis para atendimento via WhatsApp. Se esta opção estiver ativa, o cliente pode solicitar falar
              com um funcionário (atendente) para tirar alguma dúvida, por exemplo. Ao solicitar um atendente, é enviado uma notificação ao grupo
              "Atendente" juntamente com o contato do cliente que gostaria de ser atendido.
            </small>
            <label>
              <input type="radio" name="atendente" value="sim" checked={atendente} onChange={() => setAtendente(true)} /> Sim
            </label>
            <label>
              <input type="radio" name="atendente" value="nao" checked={!atendente} onChange={() => setAtendente(false)} /> Não
            </label>
          </div>

          <h3>Selecione os grupos desejados:</h3>
          <small>Escolha os grupos de trabalho que utilizarão o chatbot.</small>
          <label>
            <input type="checkbox" name="groups" value="cozinha" /> Cozinha
          </label>
          <label>
            <input type="checkbox" name="groups" value="garcom" /> Garçom
          </label>
          <label>
            <input type="checkbox" name="groups" value="atendente" /> Atendente
          </label>
          <label>
            <input type="checkbox" name="groups" value="caixa" /> Caixa
          </label>

          <div className="buttons-section">
            <button className="setup-button" onClick={handlePrevious} disabled={currentStep === 1}>
              Voltar
            </button>
            <button className="setup-button" onClick={handleNext} disabled={currentStep === 5}>
              Próximo
            </button>
          </div>
        </div>

        <div className={`step5 ${currentStep === 5 ? "active" : ""}`}>
          <h1 className="setup-title">Produtos de revenda rápida</h1>
          <h3>Tempo para enviar mensagem de revenda rápida (em minutos):</h3>
          <input className="setup-input" type="text" placeholder="Digite a duração em minutos" />
          <small>
            Informe o tempo em minutos enviar a mensagem de revenda rápida. Este tempo deve ser o tempo médio que o cliente leva para consumir um item
            de revenda rápida, para incentiva-lo a perdir outro logo ao terminar de consumir o produto anterior. (Tempo sugerido: 30 min)
          </small>

          <h3>Categorias de produtos de revenda rápida:</h3>
          <input className="setup-input" type="text" placeholder="Bebidas, Drinks, Refrescos" />
          <small>Insira as categorias dos produtos que devem sem sugeridos para revenda rápida, separados por vírgula</small>

          <div className="buttons-section">
            <button className="setup-button" onClick={handlePrevious} disabled={currentStep === 1}>
              Voltar
            </button>
            <button className="setup-button" onClick={handleNext} disabled={currentStep === 6}>
              Próximo
            </button>
          </div>
        </div>

        <div className={`step6 ${currentStep === 6 ? "active" : ""}`}>
          <h1 className="setup-title">Pesquisa de Satisfação e FAQ</h1>

          <h3>Habilitar pesquisa de satisfação?</h3>
          <div className="checkbox-section">
            <label>
              <input type="radio" name="pesquisa" /> Sim
            </label>
            <label>
              <input type="radio" name="pesquisa" /> Não
            </label>
            <small>Escolha se deseja habilitar a pesquisa de satisfação.</small>
          </div>

          <h3>Tempo em minutos para aguardar pela resposta da pesquisa de satisfação. (max: 24h ou 1440min)</h3>
          <input className="setup-input" type="text" placeholder="Digite a duração em minutos" />
          <small>Informe o tempo em minutos para fechar a conta.</small>

          <h3>Link para a página de Perguntas Frequentes:</h3>
          <input className="setup-input" type="text" placeholder="Digite o link para a página de Perguntas Frequentes" />
          <small>Insira o link para a página de Perguntas Frequentes (FAQ).</small>

          <div className="buttons-section">
            <button className="setup-button" onClick={handlePrevious} disabled={currentStep === 1}>
              Voltar
            </button>
            <button className="setup-button" onClick={handleNext} disabled={currentStep === 5}>
              Concluir
            </button>
          </div>
        </div>

        <div className={`step7 ${currentStep === 7 ? "active" : ""}`}>
          <h1 className="setup-title">Seu Assistente foi configurado com sucesso!</h1>
          <h3 style={{textAlign: "center"}}>Escaneie o QR Code com o WhatsApp que será usado pelo Assistente para começar a usar!</h3>
          <img src={qrCode} alt="QR Code" />
          <button className="home-button" onClick={handleHomeButton} disabled={currentStep === 5}>
            Voltar a Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setup;
