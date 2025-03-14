import {Link} from "react-router-dom";
//import "./NameEnvironmentModel.css";
import {ROUTINGS} from "../../../../constants/Routings";
const NameDepartment = ({departmentId,title}) => {
    return(
        <li className="name-environment-model-element">
            <div className="symbol-plus">
                +
            </div>
            <Link to={`${ROUTINGS.LIST_ENVIRONMENT_MODEL(departmentId)}`} className="name-environment-model">{title}</Link>
        </li>
    );
}

export default NameDepartment;