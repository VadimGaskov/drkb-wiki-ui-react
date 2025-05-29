import { NavLink } from "react-router-dom";
import "./AdminNavMenu.css";

const AdminNavMenu = () => {
    return (
        <div className="admin-nav">
            <NavLink to="/admin/education" className="admin-nav-link">Образование</NavLink>
            <NavLink to="/admin/equipments" className="admin-nav-link">Оборудование</NavLink>
            <NavLink to="/admin/users-management" className="admin-nav-link">Управление пользователями</NavLink>
        </div>
    );
};

export default AdminNavMenu;
