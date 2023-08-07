import axios from "axios";

// Create a base Axios instance
const baseAxios = axios.create({
  baseURL:
    "http://backe-LoadB-JGQWMWD73WE8-482dbf4bb9646cc2.elb.ap-southeast-1.amazonaws.com:8080",
  timeout: 10000, // Set a default timeout for all requests (optional)
  withCredentials: true,
  headers: {
    "Content-Type": "application/json", // Set default headers for all requests (optional)
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

