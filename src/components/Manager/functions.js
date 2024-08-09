import * as XLSX from "xlsx";

const url = "http://54.227.229.46:5002/config/";

const timers = {};

// Função activateChatbot que gera o objeto chatbot e envia para o endpoint
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
    const response = await fetch(url + 'createChatbot', requestOptions);
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
      result[category][item.Produto] = item;
    });

    callback(result);
  };

  reader.readAsBinaryString(file);
};

const debounce = (callback, delay) => {
  return (field, value, phoneNumber, setSyncStatus) => {
    setSyncStatus('salvando...');
    if (timers[field]) {
      clearTimeout(timers[field]);
    }
    timers[field] = setTimeout(() => {
      callback(field, value, phoneNumber, setSyncStatus);
      delete timers[field];
    }, delay);
  };
};

const sendUpdate = async (field, value, phoneNumber, setSyncStatus) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    field,
    value,
    phoneNumber: phoneNumber,
    interaction: 'update-chatbot',
    platform: 'wppconnect',
  });

  console.log(body);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + 'updateChatbot', requestOptions);
    if (response.ok) {
      setSyncStatus('salvo');
    } else {
      throw new Error('Erro de sincronização');
    }
  } catch (error) {
    setSyncStatus('erro de sincronização');
  }
};

const handleChatbotConfigChange = debounce(sendUpdate, 5000);

const handlePageConfigChange = (setPageConfig, key, value) => {
  setPageConfig((prevConfig) => ({
    ...prevConfig,
    [key]: value,
  }));
};

export {
  activateChatbot,
  formatProductList,
  handleChatbotConfigChange,
  handlePageConfigChange
};
