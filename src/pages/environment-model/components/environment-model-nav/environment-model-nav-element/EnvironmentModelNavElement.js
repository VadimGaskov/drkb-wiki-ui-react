import "./EnvironmentModelNavElement.css";
import {Link} from "react-router-dom";
const EnvironmentModelNavElement = ({title, id, url}) => {
    return(
        //<Link to={`/home/equipment/${id}/documentation`} className="list-nav-for-equipments">{title}</Link>
        <li className="environment-model-nav-element">
            <Link to={url} className="environment-model-nav-link">{title}</Link>
        </li>

    );
}

export default EnvironmentModelNavElement;