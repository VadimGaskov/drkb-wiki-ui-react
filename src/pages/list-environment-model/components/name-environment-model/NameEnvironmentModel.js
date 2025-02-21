import {Link} from "react-router-dom";
import "./NameEnvironmentModel.css";
import {ROUTINGS} from "../../../../constants/Routings";
const NameEnvironmentModel = ({id,title}) => {
    return(
        <li className="name-environment-model-element">
            <div className="symbol-plus">
                +
            </div>
            <Link to={`${ROUTINGS.ENVIRONMENT_MODEL(id)}`} className="name-environment-model">{title}</Link>
        </li>
    );
}

export default NameEnvironmentModel;