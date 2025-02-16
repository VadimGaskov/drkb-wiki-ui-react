import "./MainWikiLayout.css";
import DrkbLogo from "../../assets/icons/layout/drkb-logo.png";
import HomeLogo from "../../assets/icons/layout/home.svg";
import Second from "../../assets/icons/layout/second.svg";
import Book from "../../assets/icons/layout/book.svg";
import Hz from "../../assets/icons/layout/hz.svg";
import SearchPeople from "../../assets/icons/layout/searchpeople.svg";
import Pc from "../../assets/icons/layout/pc.svg";
import Med from "../../assets/icons/layout/med.svg";
import {Link, Outlet} from "react-router-dom";
import SidebarElement from "./components/sidebar/sidebar-element/SidebarElement";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";
const MainWikiLayout = () => {
    return(
        <>
            <div className="layout-wrapper">
                <div className="sidebar-nav">
                    <ul>
                        <SidebarElement img={DrkbLogo} path={"/home"}/>
                        <SidebarElement img={HomeLogo} path={"/home"}/>
                        <SidebarElement img={Second} path={"/home"}/>
                        <SidebarElement img={Book} path={"/home"}/>
                        <SidebarElement img={Hz} path={"/home"}/>
                        <SidebarElement img={SearchPeople} path={"/home"}/>
                        <SidebarElement img={Pc} path={"/home"}/>
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
                    <div className="environment-content-container">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}

export default MainWikiLayout;

{/*<div className="crumbs">
                        TODO Сделать программно навигацию
                        <a href="#">Главная - </a>
                        <a href="#"> Медицинское оборудование - </a>
                        <a href="#"> Список оборудование - </a>
                        <a href="#"> Дефибриллятор -  </a>
                        <a href="#"> Документация </a>
                        </div>*/}