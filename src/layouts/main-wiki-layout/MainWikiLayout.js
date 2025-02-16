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
import {ROUTINGS} from "../../constants/Routings";
const MainWikiLayout = () => {
    return(
        <>
            <div className="layout-wrapper">
                <div className="sidebar-nav">
                    <ul>
                        <SidebarElement img={DrkbLogo} path={`${ROUTINGS.HOME}`}/>
                        <SidebarElement img={HomeLogo} path={`${ROUTINGS.HOME}`}/>
                        <SidebarElement img={Second} path={`${ROUTINGS.HOME}`}/>
                        <SidebarElement img={Book} path={`${ROUTINGS.HOME}`}/>
                        <SidebarElement img={Hz} path={`${ROUTINGS.HOME}`}/>
                        <SidebarElement img={SearchPeople} path={`${ROUTINGS.HOME}`}/>
                        <SidebarElement img={Pc} path={`${ROUTINGS.HOME}`}/>
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