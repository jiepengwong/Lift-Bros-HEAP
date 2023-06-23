import React, { useEffect, useState } from 'react'
import axios from 'axios'

function LoginTest() {
  // Usage of axios
  const loginSimulation = async (event) => {
    event.preventDefault();
  
    const username = "bao"
    const password = "password"
  
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      }, { withCredentials: true });
  
      const getCookieValue = (name) => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
          }
        }
        return '';
      };
    
      // Usage
      const token = getCookieValue('jwt');
      console.log(token);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const logoutSimulation = async (event) => {
    event.preventDefault();
  
    const username = "bao"
    const password = "password"
  
    try {
      const response = await axios.post('http://localhost:8080/user/logout', {
        username,
        password,
      }, { withCredentials: true });
  
      // Retrieve the token from the response headers
      console.log(response.headers)
      const token = response.headers['set-cookie'];
  
      // Store the token wherever you prefer (e.g., in state, context, or localStorage)
      // Example using state:
      console.log(token)
    } catch (error) {
      console.error('Error:', error);
    }
  };




  return (
    // Simulate login page


    <div>
      <h1>LoginTest</h1>
      <h2>testing 1 2 3</h2>
      {/* Login */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={loginSimulation}>
  Login
</button>

<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={logoutSimulation}>
  Logout
</button>
    </div>
  )
}

export default LoginTest