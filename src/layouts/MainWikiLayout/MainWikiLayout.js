import "./MainWikiLayout.css";
import DrkbLogo from "../../assets/icons/layout/drkb-logo.png";
import HomeLogo from "../../assets/icons/layout/home.svg";
import Second from "../../assets/icons/layout/second.svg";
import Book from "../../assets/icons/layout/book.svg";
import Hz from "../../assets/icons/layout/hz.svg";
import SearchPeople from "../../assets/icons/layout/searchpeople.svg";
import Pc from "../../assets/icons/layout/pc.svg";
import Med from "../../assets/icons/layout/med.svg";
import Admin from "../../assets/icons/layout/admin-icon.svg";
import {Link, Outlet, useLocation} from "react-router-dom";
import SidebarElement from "./_components/Sidebar/sidebar-element/SidebarElement";
import Breadcrumbs from "./_components/Breadcrumbs/Breadcrumbs";
import {ROUTINGS} from "../../constants/Routings";
import Sidebar from "../../components/Sidebar/Sidebar";
const MainWikiLayout = () => {
    const location = useLocation();
    let title;

    if (location.pathname.includes(ROUTINGS.LIST_COURSES)) {
        title = "Раздел 3. Обучение и развитие";
    } else if (location.pathname.includes(ROUTINGS.LIST_DEPARTMENTS)) {
        title = "Раздел 7. Медицинское оборудование";
    } else if (location.pathname.includes(ROUTINGS.LIST_ENVIRONMENT)) {
        title = "Раздел 7. Медицинское оборудование";
    } else {
        title = "Неизвестный раздел";
    }

    return(
        <>
            <div className="layout-wrapper">
                <Sidebar />
                <main id="layout-content">
                    <header>
                        <Breadcrumbs />
                    </header>
                    <div className="wrapper-name-section">
                        <div className="name-page">
                            <h1>{title}</h1>
                        </div>
                    </div>
                    <div className="environment-content-container">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}

export default MainWikiLayout;