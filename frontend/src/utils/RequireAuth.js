import React, { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();

  

  if (!localStorage.getItem("token")) {
    alert("User login expired or logged out, please log in again");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
