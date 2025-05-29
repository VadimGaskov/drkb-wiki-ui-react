import { NavLink } from "react-router-dom";
import "./SidebarElement.css";

const SidebarElement = ({ img, path, label }) => {
    return (
        <li className="sidebar-element">
            <NavLink to={path} className="sidebar-img-wrapper">
                <img className="img-nav" src={img} alt={label} />
                <span className="sidebar-label">{label}</span>
            </NavLink>
        </li>
    );
};

export default SidebarElement;
