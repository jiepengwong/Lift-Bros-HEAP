import { Outlet, Navigate} from 'react-router-dom';

const PrivateRoute = () => {
  const token = document.cookie;

  // Check if the token exists
  const isAuthenticated = token ? true : false;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
