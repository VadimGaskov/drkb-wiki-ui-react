import "./DocumentationElement.css";
import DocumentIcon from "../../../../../assets/icons/equipment/documents.svg";
import {Link} from "react-router-dom";
import EditIcon from "../../../../../assets/icons/equipment/edit.svg";
import EditDocumentationModal from "./edit-documentation-modal/EditDocumentationModal";
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
            <div className="documentation-edit-icon-wrapper">
                <img src={EditIcon} alt="" className="documentation-edit-icon"/>
            </div>
        </li>
    );
}

export default DocumentationElement;