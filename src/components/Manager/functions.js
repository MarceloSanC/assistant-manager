import * as XLSX from "xlsx";
// import axios from "axios";

// Função activateChatbot que gera o objeto chatbot e envia para o endpoint
// functions.js
const activateChatbot = async (chatbotConfig, setQrCode, setIsLoading, setQrError) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const chatbot = JSON.stringify({
    id: "0",
    businessName: chatbotConfig.businessName,
    phoneNumber: chatbotConfig.phoneNumber.replace(/\D/g, ""),
    secretKey: chatbotConfig.secretKey,
    clientList: {},
    employeeList: {},
    productList: chatbotConfig.productList,
    config: {
      recurrentTime: chatbotConfig.config.recurrentTime,
      recurrentCategories: chatbotConfig.config.recurrentCategories,
      timeToCloseBill: chatbotConfig.config.timeToCloseBill,
      flow: chatbotConfig.config.flow,
      modality: chatbotConfig.config.modality,
      groupNames: chatbotConfig.config.groupNames,
      topProductsId: chatbotConfig.config.topProductsId,
      orderCompletionMessage: chatbotConfig.config.orderCompletionMessage,
      serviceOptions: chatbotConfig.config.serviceOptions,
      url: chatbotConfig.config.url,
    },
  });

  console.log("chatbot: ", chatbot);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: chatbot,
    redirect: "follow",
  };

  try {
    const response = await fetch("http://54.227.229.46:5002/config/createChatbot", requestOptions); //http://54.227.229.46:5002
    const result = await response.json();
    console.log('QR Code: ', result);
    setQrCode(result);
  } catch (error) {
    console.error(error);
    setQrError(true);
  } finally {
    setIsLoading(false);
  }
};

const formatProductList = async (file, callback) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const data = event.target.result;
    const workbook = XLSX.read(data, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    const result = {};

    jsonData.forEach((item) => {
      const category = item.Categoria;
      if (!result[category]) {
        result[category] = {};
      }

      if (!item.Codigo || !item.NomeProduto || !item.Valor || !category) {
        console.log("\x1b[33m", `Invalid Codigo:${item.Codigo} NomeProduto:${item.NomeProduto} Valor:${item.Valor} category:${category}`, "\x1b[0m");
      }

      result[category][item.Codigo] = {
        id: item.Codigo,
        name: item.NomeProduto,
        price: parseFloat(item.Valor.toString().replace(",", ".")),
        category: category,
      };
    });

    callback(result);
  };

  reader.readAsBinaryString(file);
};

const handleChatbotConfigChange = (setChatbotConfig, category, key, value) => {
  setChatbotConfig((prevState) => ({
    ...prevState,
    [category]: {
      ...prevState[category],
      [key]: value
    }
  }));
};

const handlePageConfigChange = (setPageConfig, key, value) => {
  setPageConfig((prevState) => ({
    ...prevState,
    [key]: value
  }));
};

const handleFileUpload = (setChatbotConfig, category, key, file) => {
  setChatbotConfig((prevState) => ({
    ...prevState,
    [category]: {
      ...prevState[category],
      [key]: file
    }
  }));
};


export { activateChatbot, formatProductList, handleChatbotConfigChange, handlePageConfigChange, handleFileUpload };
