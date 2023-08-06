import axios from 'axios';

// Create a base Axios instance
const baseAxios = axios.create({
  baseURL: 'backe-LoadB-JAKS2OQHCEQE-9e78a5db6d3187e4.elb.ap-southeast-1.amazonaws.com:8080', 
  timeout: 10000, // Set a default timeout for all requests (optional)
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json', // Set default headers for all requests (optional)
    // You can also set any other default headers you need
  },
});

export default baseAxios;