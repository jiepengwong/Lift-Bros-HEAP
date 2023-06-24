import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../utils/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    // Set expiration timer to check if token is expired
    console.log("testing function run")
    const expirationTime = auth.expirationTime;
    console.log(expirationTime)
   


    if (!auth.token) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (expirationTime*1000 < new Date().getTime()) {
        return <Navigate to="/login" state={{ from: location }} />;

    }



    return <Outlet />;
}

export default RequireAuth;