import "./Sidebar.css";
import SidebarElement from "../../layouts/MainWikiLayout/_components/Sidebar/sidebar-element/SidebarElement";
import DrkbLogo from "../../assets/icons/layout/drkb-logo.png";
import {ROUTINGS} from "../../constants/Routings";
import HomeLogo from "../../assets/icons/layout/home.svg";
import Book from "../../assets/icons/layout/book.svg";
import Med from "../../assets/icons/layout/med.svg";
import Admin from "../../assets/icons/layout/admin-icon.svg";
const Sidebar = ({children}) => {
    return(
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
                <SidebarElement img={Admin} path={"/admin"} label="Админ панель"/>
            </ul>
        </div>

    );
}

export default Sidebar;