
import "./EnvironmentModelNav.css";
import EnvironmentModelNavElement from "./environment-model-nav-element/EnvironmentModelNavElement";
const EnvironmentModelNav = () => {
    return(
        <div className="environment-model-nav-wrapper">
            <ul className="environment-model-nav">
                <EnvironmentModelNavElement url="documentation" title="Документация" id="10"/>
                <EnvironmentModelNavElement url="maintenance-logbook" title="Журнал техобслуживания"/>
                <EnvironmentModelNavElement url="documentation" title="График поверки"/>
                <EnvironmentModelNavElement url="documentation" title="Журнал учета времени"/>
                <EnvironmentModelNavElement url="short-instruction" title="Краткая инструкция по эксплуатации"/>
                <EnvironmentModelNavElement url="/" title="Расположения"/>

            </ul>
        </div>
    );
}

export default EnvironmentModelNav;