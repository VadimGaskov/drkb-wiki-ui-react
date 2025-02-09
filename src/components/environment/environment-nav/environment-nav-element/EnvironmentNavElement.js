import "./EnvironmentNavElement.css";
import {Link} from "react-router-dom";
const EnvironmentNavElement = ({title, id}) => {
    return(
        //<Link to={`/home/equipment/${id}/documentation`} className="list-nav-for-equipments">{title}</Link>
        <li className="environment-nav-element">
            <Link to={`documentation`} className="list-nav-for-equipments">{title}</Link>
        </li>

    );
}

export default EnvironmentNavElement;