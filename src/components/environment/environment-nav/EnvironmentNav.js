import EnvironmentNavElement from "./environment-nav-element/EnvironmentNavElement";
import "./EnvironmentNav.css";
const EnvironmentNav = () => {
    return(
        <div className="navigation-for-equipments">
            <ul>
                <EnvironmentNavElement title="Документация" id="10"/>
                <EnvironmentNavElement title="Журнал техобслуживания"/>
                <EnvironmentNavElement title="График поверки"/>
                <EnvironmentNavElement title="Журнал учета времени"/>
                <EnvironmentNavElement title="Краткая инструкция по эксплуатации"/>
            </ul>
        </div>
    );
}

export default EnvironmentNav;