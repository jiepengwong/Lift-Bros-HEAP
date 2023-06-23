import {Outlet, Navigate} from 'react-router-dom';

const PrivateRoute = () => {
    let auth = {'token': false}
    return(
        // Usage of outlets allows us to nest our routes
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}
export default PrivateRoute;