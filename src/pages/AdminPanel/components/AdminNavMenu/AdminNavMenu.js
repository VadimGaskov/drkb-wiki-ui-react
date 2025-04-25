import "./AdminNavMenu.css";
import {Link} from "react-router-dom";
const AdminNavMenu = () => {
    return(
        <div className={"admin-nav"}>
            <Link to={"/admin/education"} className={"admin-nav-link"}>Образование</Link>
            <Link to={"/"}>Оборудование</Link>
            <Link to={"/"}>asdas</Link>
            <Link to={"/"}>asdas</Link>
            <Link to={"/"}>asdas</Link>
            <Link to={"/"}>asdas</Link>
        </div>
    );
}

export default AdminNavMenu;