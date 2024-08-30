import * as XLSX from "xlsx";

const url = "https://atende.bixs.com.br/config/"; //localhost 

const timers = {};

// Função activateChatbot que gera o objeto chatbot e envia para o endpoint
const activateChatbot = async (session, setSession, chatbotConfig) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  console.log("chatbotConfig: ", chatbotConfig);

  const groupNames = Object.keys(chatbotConfig.groups).filter((group) => chatbotConfig.groups[group]);

  const chatbot = JSON.stringify({
    id: "0",
    businessName: chatbotConfig.profile.establishmentName,
    phoneNumber: chatbotConfig.profile.countryCode + chatbotConfig.profile.phoneNumber,
    clientList: {},
    employeeList: {},
    productList: [chatbotConfig.products.dayProductsList, chatbotConfig.products.nightProductsList],
    config: {
      recurrentTime: chatbotConfig.sales.timeToOfferRecurringProducts,
      recurrentCategories: chatbotConfig.sales.recurrentCategories || [],
      timeToCloseBill: chatbotConfig.sales.timeToCloseBill || 60 * 60 * 1000,
      flow: chatbotConfig.sales.flow || ["WhatsApp"],
      modality: [chatbotConfig.modality.modality],
      groupNames: groupNames,
      topProductsId: [chatbotConfig.products.topDayProductsId.split(","), chatbotConfig.products.topNightProductsId.split(",")],
      orderCompletionMessage: chatbotConfig.messages.orderCompletionMessage || "Um garçom irá trazer o seu pedido",
      serviceOptions: {
        pedidos: chatbotConfig.groups.orders,
        caixa: chatbotConfig.groups.cashier,
        atendente: chatbotConfig.groups.attendant,
        garcom: chatbotConfig.groups.waiter,
        faq: true,
        pesquisaSatisfacao: chatbotConfig.sales.satisfactionPoll,
        onlyTopProducts: chatbotConfig.sales.onlyTopProducts,
        "cardapio-online": chatbotConfig.onlineMenu.enabled,
      },
      tableInterval: {
        min: chatbotConfig.modality.tableInterval.min,
        max: chatbotConfig.modality.tableInterval.max,
        excludedValues: chatbotConfig.modality.excludedValues.split(","),
      },
      url: {
        cardapio: chatbotConfig.onlineMenu.link,
      },
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
    const response = await fetch(url + "createChatbot", requestOptions);
    const result = await response.json();
    console.log("response: ", result);

    setSessionState(result, setSession, chatbot.phoneNumber);
  } catch (error) {
    console.error(error);
    setSession((prevSession) => ({
      ...prevSession,
      qrCode: null,
      connectionStatus: "",
      isLoading: false,
      qrError: true,
    }));
  }
};

const setSessionState = async (result, setSession, phoneNumber) => {
  try {
    if (result.status === "QRCODE") {
      setSession((prevSession) => ({
        ...prevSession,
        qrCode: result.qrcode,
        connectionStatus: "waiting-scan",
        isLoading: false,
        qrError: null,
      }));
      const intervalId = setInterval(() => {
        checkConnectionStatus(phoneNumber, setSession, intervalId);
      }, 10000);
    } else if (result.status === "CONNECTED") {
      setSession((prevSession) => ({
        syncStatus: "saved",
        connectionStatus: "online",
        isLoading: false,
        qrCode: null,
        qrError: null,
      }));
    } else if (result.status === "ERROR") {
      setSession((prevSession) => ({
        ...prevSession,
        qrCode: null,
        connectionStatus: "",
        isLoading: false,
        qrError: true,
      }));
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const checkConnectionStatus = async (phoneNumber, setSession, intervalId='') => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    phoneNumber: phoneNumber,
    platform: "wppconnect",
    interaction: "check-connection-session",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + "checkConnectionSession", requestOptions);
    const result = await response.json();

    if (result.status === true && result.message === "Connected") {
      setSession((prevSession) => ({
        syncStatus: "saved",
        connectionStatus: "online",
        isLoading: false,
        qrCode: null,
        qrError: null,
      }));

      clearInterval(intervalId);
    }
  } catch (error) {
    console.error("Erro ao verificar a conexão:", error);
  }
};

/**
 * {
    connectionStatus: "inactive", // 'inactive', 'connected', 'desconnected'
    syncStatus: "saved", // 'saved', 'saving', 'error'
    isLoading: false,
    qrCode: null,
    qrError: null,
  }
 */

const formatProductList = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = event.target.result;
    const workbook = XLSX.read(data, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // Initialize result object and error array
    const result = {};
    const errors = [];
    const requiredColumns = ["NomeProduto", "Categoria", "Codigo", "Valor"];

    // Check if required columns are present
    const missingColumns = requiredColumns.filter((col) => !jsonData[0].hasOwnProperty(col));
    if (missingColumns.length > 0) {
      errors.push(`Colunas faltando: ${missingColumns.join(", ")}`);
    }

    jsonData.forEach((item, index) => {
      const category = item.Categoria;
      const productId = item.Codigo;
      const valorFormatado = parseFloat(item.Valor.toString().replace(",", "."));

      // Validate each column's data type
      if (typeof item.NomeProduto !== "string") {
        errors.push(`"${typeof item.NomeProduto}" [L${index + 1}; NomeProduto] deve ser uma string.`);
      }
      if (typeof item.Categoria !== "string") {
        errors.push(`"${typeof item.Categoria}" [L${index + 1}; Categoria] deve ser uma string.`);
      }
      if (typeof item.Codigo !== "string" && typeof item.Codigo !== "number" && isNaN(valorFormatado)) {
        errors.push(`"${typeof item.Codigo}" [L${index + 1}; Codigo] deve ser uma string ou numero.`);
      }
      if (isNaN(valorFormatado)) {
        errors.push(`"${valorFormatado}" [L${index + 1}; Valor] deve ser um número válido.`);
      }

      // Skip invalid rows
      if (errors.length === 0) {
        if (!result[category]) {
          result[category] = {};
        }
        result[category][productId] = {
          id: productId,
          name: item.NomeProduto,
          description: item.Descrição || "",
          price: item.Valor,
          maxAddQt: item.MaxAddQt || 0,
          category: item.Categoria,
          recommendedProductId: item.RecommendedProductId || null,
          preparationTime: item.PreparationTime || 0,
          additionalList: item.AdditionalList || [],
        };
      }
    });
    if (errors.length > 3) {
      const length = errors.length;
      const more = `Mais ${length - 3} erros encontrados.`;
      errors.splice(3, length - 3, more);
    }

    callback(result, errors);
  };

  reader.readAsBinaryString(file);
};

const debounce = (callback, delay) => {
  console.log("using debounce");
  return (field, value, phoneNumber, setSyncStatus) => {
    setSyncStatus("saving");
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
    interaction: "update-chatbot",
    platform: "wppconnect",
  });

  console.log(body);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + "updateChatbot", requestOptions);
    if (response.ok) {
      setSyncStatus("saved");
    } else {
      throw new Error("Erro de sincronização");
    }
  } catch (error) {
    setSyncStatus("error");
  }
};

const handleChatbotConfigChange = debounce(sendUpdate, 5000);

const handlePageConfigChange = (setPageConfig, key, value) => {
  setPageConfig((prevConfig) => ({
    ...prevConfig,
    [key]: value,
  }));
};

export { activateChatbot, formatProductList, handleChatbotConfigChange, handlePageConfigChange, checkConnectionStatus };
