import axios from "axios";

const urlBase = import.meta.env.API_URL;
if (!urlBase)
    console.error("No se encontró la configuración de la API, configure la variable API_URL en el archivo /.env");
    
const axiosInstance = axios.create({
    baseURL: urlBase,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    }, 
    (error) => Promise.reject(error)
);

export default axiosInstance;