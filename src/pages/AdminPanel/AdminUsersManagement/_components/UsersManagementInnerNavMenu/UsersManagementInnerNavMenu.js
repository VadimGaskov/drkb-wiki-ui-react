import InnerNavMenu from "../../../_components/InnerNavMenu/InnerNavMenu";
import {Link} from "react-router-dom";

const UsersManagementInnerNavMenu = () => {
    return(
        <InnerNavMenu>
            <Link to={"/admin/users-management/admin-departments"} className={"admin-nav-link"}>Отделения</Link>
            <Link to={"/admin/users-management/admin-roles"}>Роли</Link>
            <Link to={"/admin/users-management/admin-users"}>Пользователи</Link>
        </InnerNavMenu>
    )
}

export default UsersManagementInnerNavMenu;