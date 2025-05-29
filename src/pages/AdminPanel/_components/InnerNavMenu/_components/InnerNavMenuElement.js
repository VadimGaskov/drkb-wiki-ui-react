import {Link, NavLink} from "react-router-dom";
import "./InnerNavMenuElement.css";
const InnerNavMenuElement = ({url, title}) => {
    return(
        <NavLink to={url} className={"admin-inner-nav-link"}>{title}</NavLink>
    )
}

export default InnerNavMenuElement;