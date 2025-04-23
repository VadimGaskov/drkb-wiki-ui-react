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
import SidebarElement from "./components/sidebar/sidebar-element/SidebarElement";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";
import {ROUTINGS} from "../../constants/Routings";
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
                <div className="sidebar-nav">
                    <ul>
                        <SidebarElement img={DrkbLogo} path={ROUTINGS.HOME} label="Главная" />
                        <SidebarElement img={HomeLogo} path={ROUTINGS.HOME} label="Домой" />
                        {/*<SidebarElement img={Second} path={ROUTINGS.HOME} label="Корпоративная культура" />*/}
                        <SidebarElement img={Book} path={`${ROUTINGS.LIST_COURSES}`} label="Образование"/>
                        {/*<SidebarElement img={Hz} path={`${ROUTINGS.HOME}`} label="Хз чо за вкладка"/>*/}
                        {/*<SidebarElement img={SearchPeople} path={`${ROUTINGS.HOME}`} label="Поиск чего?"/>
                        <SidebarElement img={Pc} path={`${ROUTINGS.HOME}`} label="Компудахтер?"/>*/}
                        <SidebarElement img={Med} path={`${ROUTINGS.LIST_DEPARTMENTS}`} label="Мед оборудование"/>
                        <SidebarElement img={Admin} path={"/home"} label="Админ панель"/>

                    </ul>
                </div>
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