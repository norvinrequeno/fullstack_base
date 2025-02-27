import axios from "axios";
const urlBase = import.meta.env.VITE_API_URL;
if (!urlBase)
  console.error(
    "No se encontró la configuración de la API, configure la variable API_URL en el archivo /.env"
  );

const axiosInstance = axios.create({
  baseURL: urlBase,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Token inválido o sesión expirada.");
        localStorage.removeItem("token");
      } else if (error.response.status === 403) {
        console.error("No tienes acceso a esta parte del sistema");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
