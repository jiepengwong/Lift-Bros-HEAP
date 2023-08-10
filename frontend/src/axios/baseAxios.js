import axios from "axios";
import Swal from "sweetalert2";

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

// Add an interceptor to handle unauthorized and internal server errors
baseAxios.interceptors.response.use(
  (response) => response,
  (error) => {

    console.log(error)
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 500 || error.response.code === "ERR_NETWORK") {
        // Handle unauthorized or internal server errors
        // Example: logOutUser();
        console.log("hi i am in this block base axios ")
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }
        if (localStorage.getItem("username")) {
          localStorage.removeItem("username");
        }
        if (document.cookie) {
          document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        // You can also redirect the user to a login page or display an error message
        // Example: redirectToLoginPage();
      } else if (error.response.status === 404 || error.response.status === 400) {
        // Handle 404 errors by displaying an alert
        // Example: displayAlert("Resource not found");


      }
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!" + error.response,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
    else {
      console.log(error.code =="ERR_NETWORK", "In else clause of base axios")

      if (error.code =="ERR_NETWORK") {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }
        if (localStorage.getItem("username")) {
          localStorage.removeItem("username");
        }
        if (document.cookie) {
          document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }

        Swal.fire({
          title: "Error!",
          text: "Something went wrong! Error Message: " + error.code,
          icon: "error",
          confirmButtonText: "Cool",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login"; // Replace with the appropriate route
          }
        });



      }
    }
    return Promise.reject(error);
  }
);

export default baseAxios;
