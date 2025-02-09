import {Navigate, useLocation} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const isAuthenticated = () => {
        const user = localStorage.getItem('user');
        return !!user;
    };

    return(
        isAuthenticated() ? children : <Navigate to={"/login"} />
    );
}

export default PrivateRoute;