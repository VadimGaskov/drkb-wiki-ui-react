import {Link} from "react-router-dom";
const AdminDepartmentCardElement = ({title, itemId}) => {
    return(
        <Link to={`${itemId}`} className="departments-card">
            <h3 className="departments-name">{title}</h3>
        </Link>
    )
}

export default AdminDepartmentCardElement;