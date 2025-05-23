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
            {/*<NavItem text="Документы" img={DocumentsIcon}/>*/}
            <NavItem text="Телефонный справочник" src={"http://nasdrkb2:5000/d/s/uj3VQtiBB7ryQNSN6Z6JEdy5NTBztjWi/rzMsmLSJCJfa4vJh3limYzJloBsprIXL-tb7A2zE0qAo"} img={DocumentsIcon} externalSource={true}/>
            {/*<NavItem text="Тесты" img={TestsIcon}/>*/}
            {/*<NavItem text="Журналы" img={JournalsIcon}/>*/}
            <NavItem text="Клинические рекомендации" img={DocumentsIcon} src={"https://grls.rosminzdrav.ru/Default.aspx"} externalSource={true}/>
            <NavItem text="Оборудование"
                     img={MedEnvironmentIcon}
                     src={ userRoles.includes(USER_RIGHTS.CREATE_USER) ? `${ROUTINGS.LIST_DEPARTMENTS}` : `${ROUTINGS.LIST_ENVIRONMENT_MODEL()}`}
            />
            <NavItem text="Панель администратора" img={DocumentsIcon} src={"/admin"}/>
        </div>
    );
}

export default TopNav;