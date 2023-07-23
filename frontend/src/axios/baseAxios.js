import axios from 'axios';

// Create a base Axios instance
const baseAxios = axios.create({
  baseURL: 'https://localhost:8080', 
  timeout: 10000, // Set a default timeout for all requests (optional)
  headers: {
    'Content-Type': 'application/json', // Set default headers for all requests (optional)
    // You can also set any other default headers you need
    'withCredentials': true
  },
});

export default baseAxios;