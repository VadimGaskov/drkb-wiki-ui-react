import "./NameEnvironment.css";
import {Link} from "react-router-dom";
import {ROUTINGS} from "../../../../../constants/Routings";
import EnvironmentIcon from "../../../../../assets/icons/equipment/details2.svg";
const NameEnvironment = ({departmentId, inventoryNumber}) => {
    return(
        <>
            <li className="element">
                <div className="icon-wrapper">
                    <img src={EnvironmentIcon} className="document-icon"/>
                </div>
                <Link to="/home" target="_blank" className="name-equipment-about">
                    {inventoryNumber}
                </Link>
            </li>
        </>
    );
}

export default NameEnvironment;