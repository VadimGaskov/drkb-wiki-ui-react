import {Link} from "react-router-dom";
import InnerNavMenu from "../../../_components/InnerNavMenu/InnerNavMenu";
import InnerNavMenuElement from "../../../_components/InnerNavMenu/_components/InnerNavMenuElement";

const EducationInnerNavMenu = () => {
    return(
        <InnerNavMenu>
            <InnerNavMenuElement url={"/admin/education/courses"} title={"Курсы"}/>
            <InnerNavMenuElement url={"/admin/education/articles"} title={"Статьи"}/>
            <InnerNavMenuElement url={"/admin/education/tests"} title={"Тесты"}/>
        </InnerNavMenu>
    )
}

export default EducationInnerNavMenu;