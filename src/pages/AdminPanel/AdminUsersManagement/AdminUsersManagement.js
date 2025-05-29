import "./AdminUsersManagement.css";
import InnerNavMenu from "../_components/InnerNavMenu/InnerNavMenu";
import UsersManagementInnerNavMenu from "./_components/UsersManagementInnerNavMenu/UsersManagementInnerNavMenu";
import {Outlet, useParams} from "react-router-dom";
const AdminUsersManagement = () => {
    return(
        <>
            <UsersManagementInnerNavMenu/>

            <Outlet/>
        </>
    )
}

export default AdminUsersManagement;