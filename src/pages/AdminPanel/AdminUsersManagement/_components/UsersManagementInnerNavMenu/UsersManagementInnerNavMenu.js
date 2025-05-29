import InnerNavMenu from "../../../_components/InnerNavMenu/InnerNavMenu";
import {Link} from "react-router-dom";
import InnerNavMenuElement from "../../../_components/InnerNavMenu/_components/InnerNavMenuElement";

const UsersManagementInnerNavMenu = () => {
    return(
        <InnerNavMenu>
            <InnerNavMenuElement url={"/admin/users-management/admin-departments"} title={"Отделения"} />
            <InnerNavMenuElement url={"/admin/users-management/admin-users"} title={"Пользователи"} />
        </InnerNavMenu>
    )
}

export default UsersManagementInnerNavMenu;