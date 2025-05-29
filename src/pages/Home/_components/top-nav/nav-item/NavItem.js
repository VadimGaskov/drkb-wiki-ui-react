import "./NavItem.css";
import {Link} from "react-router-dom";

const NavItem = ({text, img, src, externalSource = false}) => {
    return(
        <>
            {externalSource ?
                (
                    <a className={"nav-wrapper"} rel="noopener noreferrer" href={src} target={"_blank"} >
                        <div className="nav-item" >
                            <img src={img} />
                        </div>
                        <span className={"nav-text"}>{text}</span>
                    </a>
                ) : (
                    <Link to={src} className={"nav-wrapper"}>
                        <div className="nav-item">
                            <img src={img} />
                        </div>
                        <span className={"nav-text"}>{text}</span>
                    </Link>

                )}
        </>

    );
}

export default NavItem;
