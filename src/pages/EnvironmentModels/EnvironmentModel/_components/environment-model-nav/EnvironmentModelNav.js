import "./EnvironmentModelNav.css";
import EnvironmentModelNavElement from "./environment-model-nav-element/EnvironmentModelNavElement";

import {ROUTINGS} from "../../../../../constants/Routings";
const EnvironmentModelNav = () => {
    return(
        <div className="environment-model-nav-wrapper">
            <ul className="environment-model-nav">
                <EnvironmentModelNavElement url={`${ROUTINGS.DOCUMENTATION}`} title="Документация" id="10"/>
                <EnvironmentModelNavElement url={`${ROUTINGS.MAINTENANCE_LOGBOOK}`} title="Журнал техобслуживания"/>
                <EnvironmentModelNavElement url={`${ROUTINGS.DOCUMENTATION}`} title="График поверки"/>
                <EnvironmentModelNavElement url={`${ROUTINGS.DOCUMENTATION}`} title="Журнал учета времени"/>
                <EnvironmentModelNavElement url={`${ROUTINGS.SHORT_INSTRUCTION}`} title="Краткая инструкция по эксплуатации"/>
            </ul>
        </div>
    );
}

export default EnvironmentModelNav;