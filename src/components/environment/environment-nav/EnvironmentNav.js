import EnvironmentNavElement from "./environment-nav-element/EnvironmentNavElement";
import "./EnvironmentNav.css";
const EnvironmentNav = () => {
    return(
        <div className="navigation-for-equipments">
            <ul className="navigation-for-equipments-list">
                <EnvironmentNavElement url="documentation" title="Документация" id="10"/>
                <EnvironmentNavElement url="documentation" title="Журнал техобслуживания"/>
                <EnvironmentNavElement url="documentation" title="График поверки"/>
                <EnvironmentNavElement url="documentation" title="Журнал учета времени"/>
                <EnvironmentNavElement url="short-instruction" title="Краткая инструкция по эксплуатации"/>
            </ul>
        </div>
    );
}

export default EnvironmentNav;