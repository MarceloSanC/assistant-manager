import * as XLSX from "xlsx";

const url = "http://54.227.229.46:5002/config/";

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
    const response = await fetch(url + 'createChatbot', requestOptions); //http://54.227.229.46:5002
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

let timeoutId;

const debounce = (callback, delay) => {
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const sendUpdate = async (field, value) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    field,
    value,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + 'updateChatbot', requestOptions);
    const result = await response.json();
    console.log('Update result: ', result);
  } catch (error) {
    console.error(error);
  }
};

const debouncedSendUpdate = debounce(sendUpdate, 5000);

const handleChatbotConfigChange = (category, key, value) => {
  debouncedSendUpdate(`${category}.${key}`, value);
};

const handlePageConfigChange = (setPageConfig, key, value) => {
  setPageConfig((prevConfig) => ({
    ...prevConfig,
    [key]: value,
  }));
};

const handleFileUpload = (setChatbotConfig, section, key, file) => {
  if (file) {
    formatProductList(file, (formattedList) => {
      handleChatbotConfigChange(setChatbotConfig, section, key, formattedList);
    });
  }
};

export {
  activateChatbot,
  formatProductList,
  handleChatbotConfigChange,
  handlePageConfigChange,
  handleFileUpload
};
