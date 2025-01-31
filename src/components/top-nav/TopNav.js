import "./TopNav.css";
import NavItem from "./nav-item/NavItem";
import EducationIcon from "../../assets/icons/education.svg";
import DocumentsIcon from "../../assets/icons/documents.svg";
import TestsIcon from "../../assets/icons/tests.svg";
import JournalsIcon from "../../assets/icons/journals.svg";

const TopNav = () => {
    return(
        <div className="top-nav">
            <NavItem text="Образование" img={EducationIcon}/>
            <NavItem text="Документы" img={DocumentsIcon}/>
            <NavItem text="Тесты" img={TestsIcon}/>
            <NavItem text="Журналы" img={JournalsIcon}/>
        </div>
    );
}

export default TopNav;