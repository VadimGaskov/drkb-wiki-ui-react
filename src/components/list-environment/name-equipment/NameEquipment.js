import {Link} from "react-router-dom";
import "./NameEquipment.css";
const NameEquipment = ({id,title}) => {
    return(
        <li className="name-equipment-element">
            <div className="symbol-plus">
                +
            </div>
            <Link to={`equipment/${id}/documentation`} className="name-equipment">{title}</Link>
        </li>
    );
}

export default NameEquipment;