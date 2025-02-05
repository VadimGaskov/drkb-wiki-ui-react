import {Link} from "react-router-dom";
import "./NameEquipment.css";
const NameEquipment = ({title}) => {
    return(
        <li className="name-equipment-element">
            <div className="symbol-plus">
                +
            </div>
            <Link to={`/home/equipment/10/documentation`} className="name-equipment">{title}</Link>
        </li>
    );
}

export default NameEquipment;