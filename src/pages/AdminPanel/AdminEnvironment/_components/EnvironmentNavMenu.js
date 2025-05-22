import InnerNavMenu from "../../_components/InnerNavMenu/InnerNavMenu";
import {Link} from "react-router-dom";

const EnvironmentNavMenu = () => {
    return(
        <InnerNavMenu>
            <Link to={"/admin/equipments/equipment-models"} className={"admin-nav-link"}>Модели оборудования</Link>
            <Link to={"/admin/education/articles"}>Оборудования на отделения</Link>
            <Link to={"/admin/education/tests"}></Link>
        </InnerNavMenu>
    )
}

export default EnvironmentNavMenu;