import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Setup.css";
import { activateChatbot, formatProductList } from "./functions";
import logoBix from "../../assets/images/Logo-Bix.png";

function Setup() {
  const [currentStep, setCurrentStep] = useState(1);

  const [establishmentName, setEstablishmentName] = useState("Toca do Surubim");
  const [phoneNumber, setPhoneNumber] = useState("+55 (48) 99148-7526");
  const [secretKey, setSecretKey] = useState("BIXTOKEN");

  const [topDayProductsId, setTopDayProductsId] = useState("2,6,9,35,39,48");
  const [topNightProductsId, setTopNightProductsId] = useState("2,6,9,24,30,86,119");

  const [modality, setModality] = useState("Mesa");
  const [orderCompletionMessage, setOrderCompletionMessage] = useState(
    "Um garçom irá trazer seu pedido assim que estiver pronto! Por favor, aguarde."
  );

  const [garcom, setGarcom] = useState(true);
  const [atendente, setAtendente] = useState(true);
  const [cozinha, setCozinha] = useState(true);
  const [caixa, setCaixa] = useState(true);

  const [recurrentTime, setRecurrentTime] = useState("30 (minutos)");
  const [recurrentCategories, setRecurrentCategories] = useState("Bebidas, Drinks, Cervejas");
  const [timeToCloseBill, setTimeToCloseBill] = useState("60 (minutos)");
  const [faqUrl, setFaqUrl] = useState("https://printweb.vlks.com.br/");
  const [pesquisaSatisfacao, setPesquisaSatisfacao] = useState(true);

  const [errors, setErrors] = useState({ establishmentName: "", phoneNumber: "" });
  const [dayCsvFile, setDayCsvFile] = useState(null);
  const [nightCsvFile, setNightCsvFile] = useState(null);

  const [isLoading, setIsLoading] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [qrError, setQrError] = useState(false);

  const handleDayFileUpload = (event) => {
    setDayCsvFile(event.target.files[0]);
  };

  const handleNightFileUpload = (event) => {
    setNightCsvFile(event.target.files[0]);
  };

  const navigate = useNavigate();
  const handleHomeButton = () => {
    navigate("/");
  };

  const handleNext = () => {
    let formErrors = {};

    switch (currentStep) {
      case 1:
        {
          if (!establishmentName) formErrors.establishmentName = "Campo obrigatório";

          const phoneNumberPattern = /^\+\d{2} \(\d{2}\) \d{5}-\d{4}$/;
          if (!phoneNumberPattern.test(phoneNumber)) formErrors.phoneNumber = "Número de telefone inválido";
        }
        break;
      case 2:
        break;

      default:
        break;
    }
    if (Object.keys(formErrors).length === 0 && currentStep !== 7) {
      setCurrentStep((prevStep) => prevStep + 1);
    }

    setErrors(formErrors);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleActivate = () => {
    handleNext();

    setIsLoading(true); // Ativar estado de carregamento
    setQrError(false); // Resetar o estado de erro

    const topDayProductsIdList = topDayProductsId.split(",").map((id) => parseInt(id.trim()));
    const topNightProductsIdList = topNightProductsId.split(",").map((id) => parseInt(id.trim()));

    const createChatbotConfig = (productListDay, productListNight) => {
      return {
        id: "0",
        businessName: establishmentName,
        phoneNumber: phoneNumber.length > 12 ? phoneNumber.replace("9", "") : phoneNumber,
        secretKey: secretKey,
        productList: [productListDay, productListNight],
        config: {
          recurrentTime: parseInt(recurrentTime) * 60 * 1000,
          recurrentCategories: recurrentCategories.split(",").map((cat) => cat.trim()),
          timeToCloseBill: parseInt(timeToCloseBill) * 60 * 1000,
          flow: ["WhatsApp"],
          modality: [modality],
          groupNames: getSelectedGroups(),
          topProductsId: [topDayProductsIdList, topNightProductsIdList],
          orderCompletionMessage: orderCompletionMessage,
          serviceOptions: {
            atendente: atendente,
            garcom: garcom,
            faq: true,
            pesquisaSatisfacao: pesquisaSatisfacao,
          },
          url: {
            faq: faqUrl,
            cardapio: "https://printweb.vlks.com.br/",
          },
        },
      };
    };

    if (dayCsvFile && nightCsvFile) {
      formatProductList(dayCsvFile, (formattedProductListDay) => {
        formatProductList(nightCsvFile, (formattedProductListNight) => {
          const chatbotConfig = createChatbotConfig(formattedProductListDay, formattedProductListNight);
          activateChatbot(chatbotConfig, setQrCode, setIsLoading, setQrError);
        });
      });
    } else {
      const chatbotConfig = createChatbotConfig({}, {});
      activateChatbot(chatbotConfig, setQrCode, setIsLoading, setQrError);
    }
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

  const getSelectedGroups = () => {
    const selectedGroups = [];
    if (cozinha) selectedGroups.push("Cozinha");
    if (caixa) selectedGroups.push("Caixa");
    if (atendente) selectedGroups.push("Atendente");
    if (garcom) selectedGroups.push("Garçom");
    return selectedGroups;
  };

  return (
    <div className="setup-page">
      <a href="/" className="logo-link">
        <img src={logoBix} alt="Logo" className="logo-image" />
      </a>
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

            <h2>Chave Secreta</h2>
            <input
              className="setup-input"
              type="text"
              placeholder="Digite sua chave secreta"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
            <small>A chave secreta é utilizada para gerenciar o acesso do seu chatbot as funções internas. Não compartilhe a chave com ninguém</small>

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
          <h2>Cardápio Diurno</h2>
          <input className="setup-input" type="file" accept=".csv, .xlsx" onChange={handleDayFileUpload} />
          <small>Envie o arquivo CSV contendo o cardápio do dia.</small>

          <h3>IDs dos produtos mais pedidos do cardapio diurno:</h3>
          <input
            className="setup-input"
            type="text"
            value={topDayProductsId}
            placeholder="Digite os IDs dos produtos mais pedidos, separados por vírgula"
            onChange={(e) => setTopDayProductsId(e.target.value)}
          />
          <small>Estes produtos serão mostrados primeiro na primeira categoria do Cardápio "Mais Pedidos".</small>

          <h2>Cardápio Noturno</h2>
          <input className="setup-input" type="file" accept=".csv, .xlsx" onChange={handleNightFileUpload} />
          <small>Envie o arquivo CSV contendo o cardápio da noite.</small>

          <h3>IDs dos produtos mais pedidos do cardapio noturno:</h3>
          <input
            className="setup-input"
            type="text"
            value={topNightProductsId}
            placeholder="Digite os IDs dos produtos mais pedidos, separados por vírgula"
            onChange={(e) => setTopNightProductsId(e.target.value)}
          />
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
          <textarea
            className="setup-input"
            value={orderCompletionMessage}
            placeholder="Um garçom irá trazer seu pedido assim que estiver pronto! Por favor, aguarde."
            onChange={(e) => setOrderCompletionMessage(e.target.value)}
          ></textarea>
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

          <h3>Enviar pedido feito pelos clientes no grupo "Cozinha"?</h3>
          <small>
            Se esta opção estiver ativa, quando um cliente finalizar um pedido, o pedido será enviado ao grupo "Cozinha" juntamente com a
            identificação do cliente
          </small>
          <div className="checkbox-section">
            <label>
              <input type="radio" name="cozinha" value="sim" checked={cozinha} onChange={() => setCozinha(true)} /> Sim
            </label>
            <label>
              <input type="radio" name="cozinha" value="nao" checked={!cozinha} onChange={() => setCozinha(false)} /> Não
            </label>
          </div>

          <h3>Ativar grupo "Caixa" para gerenciar as contas dos clientes?</h3>
          <small>
            Se esta opção estiver ativa, será possivel finalizar a conta de um cliente manualmente pelo grupo "Caixa", se esta opção não estiver
            ativa, apenas os clientes podem finalizar suas próprias contas.
          </small>
          <div className="checkbox-section">
            <label>
              <input type="radio" name="caixa" value="sim" checked={caixa} onChange={() => setCaixa(true)} /> Sim
            </label>
            <label>
              <input type="radio" name="caixa" value="nao" checked={!caixa} onChange={() => setCaixa(false)} /> Não
            </label>
          </div>

          <h3>Possui atendentes disponíveis para conversar com os clientes via WhatsApp?</h3>
          <small>
            Se esta opção estiver ativa, o cliente pode solicitar falar com um funcionário(atendente), via WhatsApp, para tirar alguma dúvida, por
            exemplo. Ao solicitar um atendente, é enviado uma notificação ao grupo "Atendente" juntamente com o contato do cliente que gostaria de ser
            atendido.
          </small>
          <div className="checkbox-section">
            <label>
              <input type="radio" name="atendente" value="sim" checked={atendente} onChange={() => setAtendente(true)} /> Sim
            </label>
            <label>
              <input type="radio" name="atendente" value="nao" checked={!atendente} onChange={() => setAtendente(false)} /> Não
            </label>
          </div>

          <h3>Possui garçons disponíveis para serem chamados via WhatsApp?</h3>
          <small>
            Se esta opção estiver ativa, funcionários podem ser adicionados ao grupo "Garçom" para serem notificados quando um cliente selecionar a
            opção "Chamar garçom"
          </small>
          <div className="checkbox-section">
            <label>
              <input type="radio" name="garcom" value="sim" checked={garcom} onChange={() => setGarcom(true)} /> Sim
            </label>
            <label>
              <input type="radio" name="garcom" value="nao" checked={!garcom} onChange={() => setGarcom(false)} /> Não
            </label>
          </div>

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
          <h3>
            Tempo para enviar mensagem de revenda rápida
            <br />
            (em minutos):
          </h3>
          <input
            className="setup-input"
            type="text"
            placeholder="30 (minutos)"
            value={recurrentTime}
            onChange={(e) => setRecurrentTime(e.target.value)}
          />
          <small>
            Informe o tempo em minutos enviar a mensagem de revenda rápida. Este tempo deve ser o tempo médio que o cliente leva para consumir um item
            de revenda rápida, para incentiva-lo a perdir outro logo ao terminar de consumir o produto anterior. (Tempo sugerido: 30 min)
          </small>

          <h3>Categorias de produtos de revenda rápida:</h3>
          <input
            className="setup-input"
            type="text"
            placeholder="Bebidas, Drinks, Refrescos"
            value={recurrentCategories}
            onChange={(e) => setRecurrentCategories(e.target.value)}
          />
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
          <small>Pergunta ao cliente sua opnião sobre o atendimento (Bom, Regular, Ruim)</small>
          <div className="checkbox-section">
            <label>
              <input type="radio" name="pesquisa" value="sim" checked={pesquisaSatisfacao} onChange={() => setPesquisaSatisfacao(true)} /> Sim
            </label>
            <label>
              <input type="radio" name="pesquisa" value="nao" checked={!pesquisaSatisfacao} onChange={() => setPesquisaSatisfacao(false)} /> Não
            </label>
          </div>

          <h3>Tempo em minutos para aguardar pela resposta da pesquisa de satisfação. (max: 24h ou 1440min)</h3>
          <input
            className="setup-input"
            type="text"
            placeholder="60 (minutos)"
            value={timeToCloseBill}
            onChange={(e) => setTimeToCloseBill(e.target.value)}
          />
          <small>
            Após a conta do cliente ter sido fechada, é enviada uma mensagem para responder a pesquisa de satisfação sobre o atendimento, o tempo
            determinado nesse campo será o tempo para aguardar a resposta do cliente, após esse tempo, se o cliente não tiver respondido ainda, não
            será mais aceito uma resposta
          </small>

          <h3>Link para a página de Perguntas Frequentes:</h3>
          <input
            className="setup-input"
            type="text"
            placeholder="https://www.example.com/faq"
            value={faqUrl}
            onChange={(e) => setFaqUrl(e.target.value)}
          />
          <small>Insira o link para a página de Perguntas Frequentes (FAQ).</small>

          <div className="buttons-section">
            <button className="setup-button" onClick={handlePrevious} disabled={currentStep === 1}>
              Voltar
            </button>
            <button className="setup-button" onClick={handleActivate} disabled={currentStep === 5}>
              Ativar
            </button>
          </div>
        </div>

        <div className={`step7 ${currentStep === 7 ? "active" : ""}`}>
          <h1 className="setup-title">Seu Assistente foi configurado com sucesso!</h1>
          <h3 style={{ textAlign: "center" }}>Escaneie o QR Code com o WhatsApp que será usado pelo Assistente para começar a usar!</h3>
          {isLoading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Gerando QRCode, aguarde!</p>
            </div>
          ) : qrError ? (
            <div className="error-container">
              <div className="error-icon">X</div>
              <p>Falha ao obter QRCode</p>
            </div>
          ) : (
            qrCode && <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />
          )}
          <button className="home-button" onClick={handleHomeButton} disabled={currentStep === 5}>
            Voltar a Home
          </button>
          <button className="home-button" onClick={handleActivate} disabled={currentStep === 5}>
            Ativar Novamente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setup;
