import React, { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();

//   use localStorage to check if the token is expired

//   useEffect(() => {
//     const expirationTime = auth.expirationTime;

//     const checkTokenExpiration = () => {
//       if (expirationTime * 1000 < new Date().getTime()) {
//         setIsTokenExpired(true);
//       }
//     };

//     // Check token expiration initially
//     checkTokenExpiration();

//     // Set up a global event listener to track user activity
//     const activityListener = () => {
//       checkTokenExpiration();
//     };

//     // Attach the event listener to 'mousemove' and 'keydown' events
//     window.addEventListener("mousemove", activityListener);
//     window.addEventListener("keydown", activityListener);

//     // Clean up the event listener when the component unmounts
//     return () => {
//       window.removeEventListener("mousemove", activityListener);
//       window.removeEventListener("keydown", activityListener);
//     };
//   }, [auth.expirationTime]);

  if (!localStorage.getItem("token")) {
    alert("User login expired or logged out, please log in again");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
