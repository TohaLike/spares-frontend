import axios from "axios";

export const API_URL = `${process.env.SERVER_URL}/api`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    try {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config._isRetry
      ) {
        originalRequest._isRetry = true;

        const response = await axios.post(
          `${API_URL}/refresh`,
          {},
          {
            withCredentials: true,
          }
        );

        localStorage.setItem("token", response.data.token);
        return $api.request(originalRequest);
      }
    } catch (e) {
      throw Error("Вы не авторизованы");
    }
    throw error;
  }
);

export default $api;
