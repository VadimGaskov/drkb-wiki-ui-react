import NavbarElement from "./navbar-element/NavbarElement";
import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return(
        <div>
            <li className="navbar">
                <NavbarElement title="Главная"></NavbarElement>
                <NavbarElement title="Контакты"></NavbarElement>
                <NavbarElement title="Помощь"></NavbarElement>
            </li>
        </div>
    );
}

export default Navbar;