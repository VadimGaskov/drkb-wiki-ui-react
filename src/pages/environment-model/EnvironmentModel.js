import "./EnvironmentModel.css";
import {Outlet, useLocation, useParams, useRoutes} from "react-router-dom";
import Fox from "../../assets/img/foxes/environment-fox-svg.svg";
import EnvironmentModelNav from "./components/environment-model-nav/EnvironmentModelNav";
import {useContext, useState} from "react";
import {EnvironmentModelContext} from "../../context/EnvironmentModelContext";
const EnvironmentModel = () => {
    const params = useParams();
    const environmentModel = useContext(EnvironmentModelContext);
    return (
        <>
            {/*TODO Добавить вывод названия оборудования на котором сейчас находимся*/}
            <h2>{environmentModel ? environmentModel.name : "Загрузка..."}</h2>
            <img src={Fox} alt="" className="list-environment-model-fox"/>
                <EnvironmentModelNav />
            <div className="environment-model-details">
                <Outlet />
            </div>
        </>
    )
}

export default EnvironmentModel;