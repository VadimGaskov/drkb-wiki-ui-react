import {Link} from "react-router-dom";
import "./SidebarElement.css";
const SidebarElement = ({img, path}) => {
    return (
        <li className="sidebar-element">
            <Link to={path} className="sidebar-img-wrapper">
                <img className="img-nav" src={img} alt=""/>
            </Link>
        </li>
    );
}

export default SidebarElement;