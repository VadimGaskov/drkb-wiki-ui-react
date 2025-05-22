import "./NavItem.css";
import {Link} from "react-router-dom";

const NavItem = ({text, img, src, externalSource = false}) => {
    return(
        <>
            {externalSource ?
                (
                    <a rel="noopener noreferrer" href={src} className="nav-item" target={"_blank"}>
                        <img src={img} />
                        <span>{text}</span>
                    </a>
                ) : (
                    <Link to={src} className="nav-item">
                        <img src={img} />
                        <span>{text}</span>
                    </Link>
                )}
        </>

    );
}

export default NavItem;
