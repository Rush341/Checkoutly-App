import axios from "axios";
import NetworkUtils from "../utils/NetworkUtils";
import Toast from "react-native-toast-message";
import { logger } from "../utils/logger";

const getToken = async () => {
  try {
    // const session = await fetchCurrentAuthSession();
    // return session?.tokens?.idToken?.toString() || null;
    var cognitoTokens = (await fetchAuthSession()).tokens;

    let rawToken = cognitoTokens?.idToken?.toString();
    // let payload = cognitoTokens?.idToken?.payload;
    return rawToken;
  } catch (error) {
    logger.log("Error fetching token:", error);
    return null;
  }
  return null;
};

const apiRequest = async (method, apiEndPoint, params, token) => {
  Toast.hide();
  if (!(await NetworkUtils.isNetworkAvailable())) {
    Toast.show({
      type: "error",
      text1: "Please check your internet connection!",
    });
    return { error: true, message: "No Internet" };
  }

  try {
    // If it's not a GET request, always require a token
    const authToken = token;
   
    
    const config = authToken
      ? {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      : {};

    const url = `${apiEndPoint}`;
    logger.log(`Request URL: ${url}`, params);
    // console.log(method,url,params);
    
    const response = await axios({
      method,
      url,
      ...(method === "GET" ? { params } : { data: params }),
      ...config,
    });
    return { error: false, data: { ...response.data, success_status: true } }
  } catch (error) {
    logger.log(`Error in ${method} request:`, error);
    const { status, data } = error.response || {};
    return {
      error: true,
      data: {
        success_status: false,
        message: data?.message || "Something went wrong",
        status,
      },
    };
  }
};

// API service with token enforcement for secure requests
export const ApiService = {
  get: async (apiEndPoint, params) =>
    apiRequest("GET", apiEndPoint, params, ""),
  privateGet: async (apiEndPoint, params) =>
    apiRequest("GET", apiEndPoint, params, await getToken()),
  post: async (apiEndPoint, params) =>
    apiRequest("POST", apiEndPoint, params, await getToken()),
  patch: async (apiEndPoint, params) =>
    apiRequest("PATCH", apiEndPoint, params, await getToken()),
  put: async (apiEndPoint, params) =>
    apiRequest("PUT", apiEndPoint, params, await getToken()),
  delete: async (apiEndPoint, params) =>
    apiRequest("DELETE", apiEndPoint, params, await getToken()),
};
