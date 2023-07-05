import { useContext } from "react";
import AuthContext from "./AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth; // Ensure that useAuth is the default export
