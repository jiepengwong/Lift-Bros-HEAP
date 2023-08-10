import axios from "axios";

// Create a base Axios instance
const baseAxios = axios.create({
  baseURL: "https://sc6ba3mvpg.ap-southeast-1.awsapprunner.com/",
  timeout: 10000, // Set a default timeout for all requests (optional)
  withCredentials: true,
  headers: {
    "Content-Type": "application/json", // Set default headers for all requests (optional)
    "ngrok-skip-browser-warning": true,
    // You can also set any other default headers you need
  },
});

// Add an interceptor to inject the authorization token
baseAxios.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("token"); // Assuming you store the token in localStorage after login
  if (authToken) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }
  return config;
});

export default baseAxios;
