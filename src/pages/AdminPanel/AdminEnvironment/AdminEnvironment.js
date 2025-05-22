import "./AdminEnvironment.css";
import InnerNavMenu from "../_components/InnerNavMenu/InnerNavMenu";
import EnvironmentNavMenu from "./_components/EnvironmentNavMenu";
import {Outlet} from "react-router-dom";
const AdminEnvironment = () => {
    return(
        <>
            <EnvironmentNavMenu />
            <Outlet/>
        </>
    )
}

export default AdminEnvironment;