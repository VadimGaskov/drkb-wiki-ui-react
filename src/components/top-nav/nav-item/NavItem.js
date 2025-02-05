import "./NavItem.css";
import {Link} from "react-router-dom";


const NavItem = ({text, img, src}) => {
    return(
        <Link to={src} className="nav-item">
            <img src={img} />
                <span>{text}</span>
        </Link>
    );
}

export default NavItem;
