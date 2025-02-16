import "./Environment.css";
import {Outlet, useLocation, useParams, useRoutes} from "react-router-dom";
import Fox from "../../assets/img/foxes/environment-fox-svg.svg";
import EnvironmentNav from "./components/environment-nav/EnvironmentNav";
import {useState} from "react";
const Environment = () => {
    const params = useParams();
    const environmentModelId = params.id;
    console.log(environmentModelId);
    return (
        <>
            {/*TODO Добавить вывод названия оборудования на котором сейчас находимся*/}
            <img src={Fox} alt="" className="list-environment-fox"/>
                <EnvironmentNav />
            <div className="list-equipment-about">
                <Outlet />
            </div>
        </>
    )
}

export default Environment;