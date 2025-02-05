import "./DocumentationElement.css";
import DocumentIcon from "../../../../../assets/icons/equipment/documents.svg";
import {Link} from "react-router-dom";
const DocumentationElement = ({title, downloadSrc}) => {
    return(
        <li className="element">
            <div className="icon-wrapper">
                <img src={DocumentIcon} className="document-icon"/>
            </div>
            <Link to="#" className="name-equipment-about" href="#">
                {title}
            </Link>
        </li>
    );
}

export default DocumentationElement;