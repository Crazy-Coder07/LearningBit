import axios from "axios";
import { renewAccessToken } from "../RenewAccessToken/RenewAccessToken";
const baseURL = "http://localhost:8080";

const getData = async (url,customHeaders = {}) => {
  try {
    let accessToken = localStorage.getItem("accessToken");
    const headers = {
      ...customHeaders,
      "x-access-user-token": accessToken,
    };

    const response = await axios.get(`${baseURL}/${url}`, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 401) {
      let newaccessToken = await renewAccessToken();
      localStorage.setItem("accessToken", newaccessToken);
      return getData(url, customHeaders);
    }
    return error;
  }
};

const getDataRenew = async (url,customHeaders = {}) => {
  try {

    let refreshToken = localStorage.getItem("refreshToken");
    const headers = {
      ...customHeaders,
      "x-refresh-token": refreshToken,
    };
    const response = await axios.get(`${baseURL}/${url}`, {
        headers: headers,
    });
    return response;
  } catch (error) {
    console.log(error);
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.assign("/");
    }
  }
};

const deleteData = async (url, body ,customHeaders = {}) => {
  try {
    let accessToken = localStorage.getItem("accessToken");
    const headers = {
      ...customHeaders,
      "x-access-token": accessToken,
    };
    const response = await axios.delete(`${baseURL}/${url}`, {
      data: body, // Include the request body here
      headers: headers,
    });
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    if (error.response?.status === 401) {
      renewAccessToken();
      // let newaccessToken = await renewAccessToken();
      // localStorage.setItem("accessToken", newaccessToken);
      // deleteData(url, body, customHeaders);
    }
    return error.response;
    throw error;
  }
};


const postData = async (url, body, customHeaders = {}) => {
  try {
    let accessToken = localStorage.getItem("accessToken");
    const headers = {
      ...customHeaders,
      "x-access-token": accessToken
    };

    if (body instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    }else{
      headers["Content-Type"] = "application/json";
    }

    console.log("this is headers",headers);

    const response = await axios.post(`${baseURL}/${url}`, body, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.log(error?.response?.data);
    if (error?.response?.status === 401) {
        let newaccessToken = await renewAccessToken();
        localStorage.setItem("accessToken", newaccessToken);
        return postData(url,body,customHeaders);
    }
    return error;
  }
};

const patchData = async (url, body, customHeaders = {}) => {
  try {
    let accessToken = localStorage.getItem("accessToken");
    const headers = {
      ...customHeaders,
      "x-access-token": accessToken,
    };
    const response = await axios.patch(`${baseURL}/${url}`, body, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.log(error);
    if (error.response?.status === 401) {
      let newaccessToken = await renewAccessToken();
      localStorage.setItem("accessToken", newaccessToken);
      patchData(url, body, customHeaders);
    }
    return error;
  }
};


export {
  getData,
  postData,
  patchData,
  deleteData,
  getDataRenew,
  baseURL,
};