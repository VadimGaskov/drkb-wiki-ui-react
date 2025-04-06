import "./TopNav.css";
import EducationIcon from "../../../../assets/icons/education.svg";
import DocumentsIcon from "../../../../assets/icons/documents.svg";
import TestsIcon from "../../../../assets/icons/tests.svg";
import JournalsIcon from "../../../../assets/icons/journals.svg";
import MedEnvironmentIcon from "../../../../assets/icons/layout/med-env-blue.svg";
import NavItem from "./nav-item/NavItem";
import {ROUTINGS} from "../../../../constants/Routings";
import {useContext} from "react";
import {getUserRoles} from "../../../../services/AuthService";

const TopNav = () => {
    const userRoles = getUserRoles();
    return(
        <div className="top-nav">
            <NavItem text="Образование" img={EducationIcon} src={`${ROUTINGS.LIST_COURSES}`}/>
            <NavItem text="Документы" img={DocumentsIcon}/>
            <NavItem text="Тесты" img={TestsIcon}/>
            <NavItem text="Журналы" img={JournalsIcon}/>
            <NavItem text="Оборудование"
                     img={MedEnvironmentIcon}
                     src={userRoles.includes('Создание пользователей')
                         ? `${ROUTINGS.LIST_DEPARTMENTS}`
                         : `${ROUTINGS.LIST_ENVIRONMENT_MODEL()}`}
            />
        </div>
    );
}

export default TopNav;