import React, { useState } from 'react';
import '../../styles/Manager.css';
import logoBix from '../../assets/images/Logo-Bix.png';
import Profile from './Profile';
import Products from './Products';
import Modality from './Modality';
import Groups from './Groups';
import Sales from './Sales';
import Messages from './Messages';
import Session from './Session';
import { handleChatbotConfigChange, handlePageConfigChange, handleFileUpload } from './functions';

function Manager() {
  const [pageConfig, setPageConfig] = useState({
    currentSection: 'profile',
    errors: {},
    isLoading: false,
    qrCode: null,
    qrError: null
  });

  const [chatbotConfig, setChatbotConfig] = useState({
    profile: {
      establishmentName: "Toca do Surubim",
      phoneNumber: "+55 (48) 99148-7526",
      profileImage: null
    },
    products: {
      dayCsvFile: null,
      topDayProductsId: "2,6,9,35,39,48",
      nightCsvFile: null,
      topNightProductsId: "2,6,9,24,30,86,119"
    },
    modality: {
      modality: 'Mesa',
      tableInterval: { min: 1, max: 10 },
      excludedValues: ""
    },
    groups: {
      orders: true,
      cashier: true,
      attendant: true,
      waiter: true
    },
    sales: {
      productRecommendations: true,
      recurringProductsResell: true,
      timeToOfferRecurringProducts: "00:30:00"
    },
    messages: {
      genericMessage1: "",
      genericMessage2: "",
      genericMessage3: ""
    },
    session: {
      connectionStatus: "Desconectado",
      qrCode: null
    }
  });

  const renderSection = () => {
    switch (pageConfig.currentSection) {
      case 'profile':
        return (
          <Profile
            profile={chatbotConfig.profile}
            setProfile={(key, value) => handleChatbotConfigChange(setChatbotConfig, 'profile', key, value)}
          />
        );
      case 'products':
        return (
          <Products
            products={chatbotConfig.products}
            handleFileUpload={(key, file) => handleFileUpload(setChatbotConfig, 'products', key, file)}
            setProducts={(key, value) => handleChatbotConfigChange(setChatbotConfig, 'products', key, value)}
          />
        );
      case 'modality':
        return (
          <Modality
            modality={chatbotConfig.modality.modality}
            setModality={(key, value) => handleChatbotConfigChange(setChatbotConfig, 'modality', key, value)}
            tableInterval={chatbotConfig.modality.tableInterval}
            setTableInterval={(key, value) => handleChatbotConfigChange(setChatbotConfig, 'modality', key, value)}
            excludedValues={chatbotConfig.modality.excludedValues}
            setExcludedValues={(key, value) => handleChatbotConfigChange(setChatbotConfig, 'modality', key, value)}
          />
        );
      case 'groups':
        return (
          <Groups
            groups={chatbotConfig.groups}
            setGroups={(key, value) => handleChatbotConfigChange(setChatbotConfig, 'groups', key, value)}
          />
        );
      case 'sales':
        return (
          <Sales
            sales={chatbotConfig.sales}
            setSales={(key, value) => handleChatbotConfigChange(setChatbotConfig, 'sales', key, value)}
          />
        );
      case 'messages':
        return (
          <Messages
            messages={chatbotConfig.messages}
            setMessages={(key, value) => handleChatbotConfigChange(setChatbotConfig, 'messages', key, value)}
          />
        );
      case 'session':
        return (
          <Session
            connectionStatus={chatbotConfig.session.connectionStatus}
            qrCode={chatbotConfig.session.qrCode}
            generateQRCode={() => {
              // Função para gerar QR Code aqui
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="manager">
      <div className="panel">
        <div className="panel-header">
          <img
            src={logoBix}
            alt="Logo Bix"
            className="logo"
            onClick={() => window.location.href = '/'}
            style={{ cursor: 'pointer' }}
          />
          <h1>Configuração do Chatbot</h1>
        </div>
        <div className="panel-content">
          <div className="nav-menu">
            <button
              className={`nav-button ${pageConfig.currentSection === 'profile' ? 'active' : ''}`}
              onClick={() => handlePageConfigChange(setPageConfig, 'currentSection', 'profile')}
            >
              Perfil Whats App
            </button>
            <button
              className={`nav-button ${pageConfig.currentSection === 'products' ? 'active' : ''}`}
              onClick={() => handlePageConfigChange(setPageConfig, 'currentSection', 'products')}
            >
              Produtos e Adicionais
            </button>
            <button
              className={`nav-button ${pageConfig.currentSection === 'modality' ? 'active' : ''}`}
              onClick={() => handlePageConfigChange(setPageConfig, 'currentSection', 'modality')}
            >
              Modalidade
            </button>
            <button
              className={`nav-button ${pageConfig.currentSection === 'groups' ? 'active' : ''}`}
              onClick={() => handlePageConfigChange(setPageConfig, 'currentSection', 'groups')}
            >
              Grupos
            </button>
            <button
              className={`nav-button ${pageConfig.currentSection === 'sales' ? 'active' : ''}`}
              onClick={() => handlePageConfigChange(setPageConfig, 'currentSection', 'sales')}
            >
              Vendas
            </button>
            <button
              className={`nav-button ${pageConfig.currentSection === 'messages' ? 'active' : ''}`}
              onClick={() => handlePageConfigChange(setPageConfig, 'currentSection', 'messages')}
            >
              Mensagens
            </button>
            <button
              className={`nav-button ${pageConfig.currentSection === 'session' ? 'active' : ''}`}
              onClick={() => handlePageConfigChange(setPageConfig, 'currentSection', 'session')}
            >
              Sessão Whats App
            </button>
          </div>
          <div className="form-section">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manager;