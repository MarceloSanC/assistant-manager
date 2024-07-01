import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MainContent.css";
import restaurantCellphone from "../../assets/images/restaurant-cellphone.jpg";
import icons from "../../assets/images/icons.jpg";
import ErrorBoundary from "../../js/ErrorBoundary";

function MainContent() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/setup");
  };

  return (
    <main className="main-content">
      <div className="first-section">
        <h1 className="main-title">Transforme o atendimento do seu restaurante com o Bix Assistant</h1>
        <p className="main-text">
          Traga a modernidade para seu restaurante.
          <br /> Com o Bix Assistant, você agiliza o atendimento em seu restaurante, gerencia os pedidos, fluxo de caixa. Tudo sem sair do Whats App!
        </p>
        <img className="main-image" src={restaurantCellphone} alt="Restaurant Cellphone" />
      </div>
      <div className="second-section">
        <div className="second-text">
          <h2 className="sub-title">Funcionalidades</h2>
          <p className="sub-text">
            Atendimento automatizado
            <br />
            Produtos com adicionais e observações
            <br />
            Chamar garçom na mesa
            <br />
            Falar com atendendente via Whats App
            <br />
            Recomendação de produtos
            <br />
            Pedir bebidas novamente com rapidez
            <br />E muito mais!
          </p>
        </div>
        <div className="second-image">
          <img className="side-image" src={icons} alt="Functionalities" />
        </div>
      </div>
      <div className="third-section">
        <h1 className="main-title">Ative agora seu Bix Assistant!</h1>
        <ErrorBoundary>
          <button className="main-button" onClick={handleButtonClick}>
            Ativar Bix Assistant
          </button>
        </ErrorBoundary>
      </div>
    </main>
  );
}

export default MainContent;
