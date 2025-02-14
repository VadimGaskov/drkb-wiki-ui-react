import "./Environment.css";
import EnvironmentNav from "../../components/environment/environment-nav/EnvironmentNav";
import {Outlet} from "react-router-dom";
import Fox from "../../assets/img/foxes/environment-fox-svg.svg";
const Environment = ({title}) => {
    return(
        <>
            <img src={Fox} alt="" className="list-environment-fox"/>
            <h2>{title}</h2>
                <EnvironmentNav />
            <div className="list-equipment-about">
                <Outlet />
            </div>
        </>
    )
}

export default Environment;