import InnerNavMenu from "../../_components/InnerNavMenu/InnerNavMenu";
import {Link} from "react-router-dom";
import InnerNavMenuElement from "../../_components/InnerNavMenu/_components/InnerNavMenuElement";

const EnvironmentNavMenu = () => {
    return(
        <InnerNavMenu>
            <InnerNavMenuElement url={"/admin/equipments/equipment-models"} title={"Модели оборудования"} />
        </InnerNavMenu>
    )
}

export default EnvironmentNavMenu;