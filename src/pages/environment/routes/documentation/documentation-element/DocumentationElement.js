import "./DocumentationElement.css";
import DocumentIcon from "../../../../../assets/icons/equipment/documents.svg";
import {Link} from "react-router-dom";
const DocumentationElement = ({title, downloadSrc}) => {
    const openDocument = () => {
        console.log(downloadSrc);
    }

    return(
        <li className="element">
            <div className="icon-wrapper">
                <img src={DocumentIcon} className="document-icon"/>
            </div>
            <Link to={downloadSrc} target="_blank" className="name-equipment-about" onClick={openDocument}>
                {title}
            </Link>
        </li>
    );
}

export default DocumentationElement;