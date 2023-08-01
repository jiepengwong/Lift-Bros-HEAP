import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";

function LogoutPage() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication data (jwt token, etc.)
    setAuth(null);
    // Redirect to Login page
    navigate("/login");
  }, [setAuth, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <h2 className="text-2xl font-bold">Logging out...</h2>
    </div>
  );
}

export default LogoutPage;
