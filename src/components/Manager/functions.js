import * as XLSX from "xlsx";

const url = "http://localhost:5002/config/";

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
      timeToCloseBill: chatbotConfig.sales.timeToCloseBill || 30,
      flow: chatbotConfig.sales.flow || ["WhatsApp"],
      modality: [chatbotConfig.modality.modality],
      groupNames: groupNames,
      topProductsId: [chatbotConfig.products.topDayProductsId, chatbotConfig.products.topNightProductsId],
      orderCompletionMessage: chatbotConfig.messages.orderCompletionMessage || "Um garçom irá trazer o seu pedido",
      serviceOptions: {
        pedidos: chatbotConfig.groups.orders,
        caixa: chatbotConfig.groups.cashier,
        atendente: chatbotConfig.groups.attendant,
        garcom: chatbotConfig.groups.waiter,
        faq: true,
        pesquisaSatisfacao: chatbotConfig.sales.satisfactionPoll,
        "cardapio-online": chatbotConfig.onlineMenu.enabled,
      },
      tableInterval: {
        min: chatbotConfig.modality.tableInterval.min,
        max: chatbotConfig.modality.tableInterval.max,
        excludedValues: chatbotConfig.modality.tableInterval.excludedValues,
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
    console.log("QR Code: ", result);
    setSession((prevSession) => ({
      ...prevSession,
      qrCode: result,
    }));
  } catch (error) {
    console.error(error);
    setSession((prevSession) => ({
      ...prevSession,
      qrError: true,
    }));
  } finally {
    setSession((prevSession) => ({
      ...prevSession,
      isLoading: false,
    }));
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
      const valorFormatado = parseFloat(item.Valor.toString().replace(',', '.'));

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

export { activateChatbot, formatProductList, handleChatbotConfigChange, handlePageConfigChange };
