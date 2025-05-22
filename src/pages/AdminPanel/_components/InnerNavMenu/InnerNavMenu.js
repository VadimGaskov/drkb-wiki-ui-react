import "./InnerNavMenu.css";
import {Link} from "react-router-dom";
const InnerNavMenu = ({children}) => {
    return(
        <div className={"inner-nav-menu"}>
            {children}
        </div>
    )
}

export default InnerNavMenu;