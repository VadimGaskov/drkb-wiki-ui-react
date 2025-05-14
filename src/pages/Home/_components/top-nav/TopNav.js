import "./TopNav.css";
import EducationIcon from "../../../../assets/icons/education.svg";
import DocumentsIcon from "../../../../assets/icons/documents.svg";
import TestsIcon from "../../../../assets/icons/tests.svg";
import JournalsIcon from "../../../../assets/icons/journals.svg";
import MedEnvironmentIcon from "../../../../assets/icons/layout/med-env-blue.svg";
import NavItem from "./nav-item/NavItem";
import {ROUTINGS} from "../../../../constants/Routings";
import {useContext} from "react";
import {AuthContext} from "../../../../context/AuthContext";
import {getUserRoles} from "../../../../utils/authHelper";
import {USER_RIGHTS} from "../../../../constants/userRoles";

const TopNav = () => {
    const {user} = useContext(AuthContext);
    const userRoles = getUserRoles();
    return(
        <div className="top-nav">
            <NavItem text="Образование" img={EducationIcon} src={`${ROUTINGS.LIST_COURSES}`}/>
            <NavItem text="Документы" img={DocumentsIcon}/>
            {/*<NavItem text="Тесты" img={TestsIcon}/>*/}
            {/*<NavItem text="Журналы" img={JournalsIcon}/>*/}
            <NavItem text="Оборудование"
                     img={MedEnvironmentIcon}
                     src={ userRoles.includes(USER_RIGHTS.CREATE_USER) ? `${ROUTINGS.LIST_DEPARTMENTS}` : `${ROUTINGS.LIST_ENVIRONMENT_MODEL()}`}
            />
            <NavItem text="Панель администратора" img={DocumentsIcon} src={"/admin"}/>
        </div>
    );
}

export default TopNav;