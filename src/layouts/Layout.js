import "./Layout.css";
import DrkbLogo from "../../src/assets/icons/layout/drkb-logo.png";
import HomeLogo from "../../src/assets/icons/layout/home.svg";
import Second from "../../src/assets/icons/layout/second.svg";
import Book from "../../src/assets/icons/layout/book.svg";
import Hz from "../../src/assets/icons/layout/hz.svg";
import SearchPeople from "../../src/assets/icons/layout/searchpeople.svg";
import Pc from "../../src/assets/icons/layout/pc.svg";
import Med from "../../src/assets/icons/layout/med.svg";
import {Link, Outlet} from "react-router-dom";
import SidebarElement from "../components/layout/sidebar/sidebar-element/SidebarElement";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
const Layout = () => {
    return(
        <>
            <div className="layout-wrapper">
                <div className="sidebar-nav">
                    <ul>
                        <SidebarElement img={DrkbLogo} path={"/"}/>
                        <SidebarElement img={HomeLogo} path={"/"}/>
                        <SidebarElement img={Second} path={"/"}/>
                        <SidebarElement img={Book} path={"/"}/>
                        <SidebarElement img={Hz} path={"/"}/>
                        <SidebarElement img={SearchPeople} path={"/"}/>
                        <SidebarElement img={Pc} path={"/"}/>
                        <SidebarElement img={Med} path={"/"}/>
                    </ul>
                </div>
                <main id="layout-content">
                    <header>
                        <Breadcrumbs />
                    </header>
                    <div className="wrapper-name-section">
                        <div className="name-page">
                            <h1>Раздел 7.</h1>
                            <h1>Медицинское оборудование.</h1>
                        </div>
                    </div>
                    <div className="equipments">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}

export default Layout;

{/*<div className="crumbs">
                        TODO Сделать программно навигацию
                        <a href="#">Главная - </a>
                        <a href="#"> Медицинское оборудование - </a>
                        <a href="#"> Список оборудование - </a>
                        <a href="#"> Дефибриллятор -  </a>
                        <a href="#"> Документация </a>
                        </div>*/}