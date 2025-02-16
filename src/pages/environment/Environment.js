import "./Environment.css";
import {Outlet, useLocation, useParams, useRoutes} from "react-router-dom";
import Fox from "../../assets/img/foxes/environment-fox-svg.svg";
import EnvironmentNav from "./components/environment-nav/EnvironmentNav";
import {useContext, useState} from "react";
import {EnvironmentModelContext} from "../../context/EnvironmentModelContext";
const Environment = () => {
    const params = useParams();
    const environmentModel = useContext(EnvironmentModelContext);
    return (
        <>
            {/*TODO Добавить вывод названия оборудования на котором сейчас находимся*/}
            <h2>{environmentModel ? environmentModel.name : "Загрузка..."}</h2>
            <img src={Fox} alt="" className="list-environment-fox"/>
                <EnvironmentNav />
            <div className="list-equipment-about">
                <Outlet />
            </div>
        </>
    )
}

export default Environment;