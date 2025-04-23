import {Link, useLocation} from "react-router-dom";
import "./SidebarElement.css";
const SidebarElement = ({ img, path, label }) => {
    const location = useLocation();
    const isActive = location.pathname.includes(path);
    return (
        <li className={`sidebar-element ${isActive ? "active-element" : ""}`}>
            <Link to={path} className="sidebar-img-wrapper">
                <img className="img-nav" src={img} alt={label} />
                <span className="sidebar-label">{label}</span>
            </Link>
        </li>
    );
};

export default SidebarElement;