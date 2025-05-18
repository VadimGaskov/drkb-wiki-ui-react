import "./EnvironmentModel.css";
import {Outlet, useLocation, useParams, useRoutes} from "react-router-dom";
/*import Fox from "../../assets/img/foxes/environment-fox-svg.svg";*/
import Fox from "../../../assets/img/foxes/environment-fox-svg.svg";
import EnvironmentModelNav from "./_components/environment-model-nav/EnvironmentModelNav";
import {useContext, useState} from "react";
import {EnvironmentModelContext} from "../../../context/EnvironmentModelContext";
import {AuthContext} from "../../../context/AuthContext";
const EnvironmentModel = () => {
    const environmentModel = useContext(EnvironmentModelContext);
    const {user, } = useContext(AuthContext)
    return (
        <>
            <h2 className="environment-model-title">{environmentModel ?  environmentModel.name : "Загрузка..."}</h2>
            <img src={Fox} alt="" className="list-environment-model-fox"/>
                <EnvironmentModelNav />
            <div className="environment-model-details">
                <Outlet />
            </div>
        </>
    )
}

export default EnvironmentModel;