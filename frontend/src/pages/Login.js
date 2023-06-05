import React, { useState } from "react";

function Login() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    setPage("login");
  };

  const handleRegisterClick = () => {
    setPage("register");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (page === "login") {
      // Perform login logic here
      console.log("Logging in with:", email, password);
    } else {
      // Perform registration logic here
      console.log("Registering with:", email, password);
    }
    // Reset form inputs
    setEmail("");
    setPassword("");
  };

  return (
    <div className="App">
      <div className="content">
        <div className="form-container">
          {page === "login" ? (
            <div>
              <h2>Login</h2>
              <form onSubmit={handleFormSubmit}>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <br />
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <br />
                <button type="submit">Login</button>
                <br />
                <p>
                  Don't have an account?{" "}
                  <a href="#register" onClick={handleRegisterClick}>
                    Register here
                  </a>
                </p>
              </form>
            </div>
          ) : (
            <div>
              <h2>Register</h2>
              <form onSubmit={handleFormSubmit}>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <br />
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <br />
                <button type="submit">Register</button>
                <br />
                <p>
                  Already have an account?{" "}
                  <a href="#login" onClick={handleLoginClick}>
                    Login here
                  </a>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
