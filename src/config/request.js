import axios from "axios";
import { loadState } from "./storage";

const request = axios.create({ baseURL: "http://localhost:4000/api" });

request.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${loadState("user")?.token}`,
  };
  return config;
});

request.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return error;
  }
);

export { request };
