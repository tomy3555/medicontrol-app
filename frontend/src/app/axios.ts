import axios, { type AxiosRequestHeaders } from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders;
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});