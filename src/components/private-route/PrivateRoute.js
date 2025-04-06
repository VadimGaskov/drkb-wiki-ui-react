import {Navigate, useLocation} from "react-router-dom";
import {ROUTINGS} from "../../constants/Routings";

const PrivateRoute = ({isAllowed,children}) => {
  /*  const isAuthenticated = () => {
        const user = localStorage.getItem('user');
        return !!user;
    };
*/
    return(
        isAllowed ? children : <Navigate to={`${ROUTINGS.NOT_ALLOWED}`} />
    );
}

export default PrivateRoute;