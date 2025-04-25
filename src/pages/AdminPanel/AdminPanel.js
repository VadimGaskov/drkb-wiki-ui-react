import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarElement from "../../layouts/main-wiki-layout/components/sidebar/sidebar-element/SidebarElement";
import DrkbLogo from "../../assets/icons/layout/drkb-logo.png";
import {ROUTINGS} from "../../constants/Routings";
import HomeLogo from "../../assets/icons/layout/home.svg";
import Breadcrumbs from "../../layouts/main-wiki-layout/components/breadcrumbs/Breadcrumbs";
import {Outlet} from "react-router-dom";
import "./AdminPanel.css";
import AdminNavMenu from "./components/AdminNavMenu/AdminNavMenu";
const AdminPanel = () => {
    return(
        <div className={"layout-wrapper"}>
            <Sidebar/>
            <main id="layout-content">
                <header>
                    <Breadcrumbs />
                </header>

                <AdminNavMenu />

                <div className={"admin-content"}>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AdminPanel;