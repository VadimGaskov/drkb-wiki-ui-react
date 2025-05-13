import "./InnerNavMenu.css";
import {Link} from "react-router-dom";
const InnerNavMenu = () => {
    return(
        <div className={"inner-nav-menu"}>
            <Link to={"/admin/education/courses"} className={"admin-nav-link"}>Курсы</Link>
            <Link to={"/admin/education/articles"}>Статьи</Link>
            <Link to={"/"}>Тесты</Link>
        </div>
    )
}

export default InnerNavMenu;