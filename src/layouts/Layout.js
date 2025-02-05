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
const Layout = () => {
    return(
        <>
            <header>
                <div className="sidebar-nav">
                    <ul>
                        <li><Link to="/"><img className="img-nav" src={DrkbLogo} alt="" /></Link></li>
                        <li><a href="#"><img className="img-nav" src={HomeLogo} alt="" /></a></li>
                        <li><a href="#"><img className="img-nav" src={Second} alt="" /></a></li>
                        <li><a href="#"><img className="img-nav" src={Book} alt="" /></a></li>
                        <li><a href="#"><img className="img-nav" src={Hz} alt="" /></a></li>
                        <li><a href="#"><img className="img-nav" src={SearchPeople} alt="" /></a></li>
                        <li><a href="#"><img className="img-nav" src={Pc} alt="" /></a></li>
                        <li><a href="#"><img className="img-nav" src={Med} alt="" /></a></li>
                    </ul>
                </div>

                <div className="wrapper-name-section">
                    <div className="crumbs">
                        {/*TODO Сделать программно навигацию*/}
                        <a href="#">Главная - </a>
                        <a href="#"> Медицинское оборудование - </a>
                        <a href="#"> Список оборудование - </a>
                        <a href="#"> Дефибриллятор -  </a>
                        <a href="#"> Документация </a>
                    </div>
                    <div className="name-page">
                        <h1>Раздел 7.</h1>
                        <h1>Медицинское оборудование.</h1>
                    </div>
                </div>
            </header>
            <main>
                <div className="equipments">
                    <Outlet />
                </div>

            </main>
        </>
    );
}

export default Layout;