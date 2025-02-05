import "./Environment.css";
import EnvironmentNav from "../../components/environment/environment-nav/EnvironmentNav";
import {Outlet} from "react-router-dom";
const Environment = ({title}) => {
    return(
        <>
            <h2>{title}</h2>
                <EnvironmentNav />
            <div className="list-equipment-about">
                <Outlet />
            </div>
        </>
    )
}

export default Environment;