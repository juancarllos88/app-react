import axios from "axios";
import { getToken } from "./auth";

export const api = axios.create({
  baseURL: "http://localhost:8010"
});

export const mock = axios.create({
  baseURL: "http://www.mocky.io/v2"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => {
    console.tron.log("response-success", response);
    return response;
  },
  error => {
    console.tron.log("response-error", error.response);
    return Promise.reject(error);
  }
);
