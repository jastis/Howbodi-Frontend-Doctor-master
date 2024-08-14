import axios from "axios";

export * from "./routes.constants";

export const baseURL = "https://backend.howbodi.io/api/v1";
export const socketBaseURL = "https://backend.howbodi.io";


const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json ",
    "Access-Control-Allow-Headers": "Content-Type",
  },
});

const addTokenToRequest = async (req) => {
  const token = sessionStorage.getItem("HB#221#");
  req.headers.Authorization = `Bearer ${token}`;
  return req;
};

axiosInstance.interceptors.request.use(addTokenToRequest);

export default axiosInstance;
