import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../utils/useAuth";
import { useEffect } from "react";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    // Set expiration timer to check if token is expired
    console.log("testing function run")
    const expirationTime = auth.expirationTime;
    console.log(expirationTime)

    // UseEffect to check document.cookie for token
    // If token is not found, redirect to login page
    // If token is found, check if token is expired
    // If token is expired, redirect to login page
    // If token is not expired, redirect to home page

 
   


    if (!document.cookie) {
        alert("Cookie deleted or expired, please log in again")
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (expirationTime*1000 < new Date().getTime()) {
        return <Navigate to="/login" state={{ from: location }} />;

    }



    return <Outlet />;
}

export default RequireAuth;