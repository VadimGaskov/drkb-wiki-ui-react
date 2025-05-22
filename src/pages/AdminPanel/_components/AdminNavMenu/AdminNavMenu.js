import "./AdminNavMenu.css";
import {Link} from "react-router-dom";
const AdminNavMenu = () => {
    return(
        <div className={"admin-nav"}>
            <Link to={"/admin/education"} className={"admin-nav-link"}>Образование</Link>
            <Link to={"/admin/equipments"}>Оборудование</Link>
            <Link to={"/admin/users-management"}>Управление пользователями</Link>
        </div>
    );
}

export default AdminNavMenu;