
import React from "react";
import "./Navbar.css";
import NavbarElement from "./navbar-element/NavbarElement";

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