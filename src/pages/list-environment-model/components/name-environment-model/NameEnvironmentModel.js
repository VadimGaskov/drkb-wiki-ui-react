import {Link} from "react-router-dom";
import "./NameEnvironmentModel.css";
const NameEnvironmentModel = ({id,title}) => {
    return(
        <li className="name-environment-model-element">
            <div className="symbol-plus">
                +
            </div>
            <Link to={`environment-model/${id}`} className="name-environment-model">{title}</Link>
        </li>
    );
}

export default NameEnvironmentModel;