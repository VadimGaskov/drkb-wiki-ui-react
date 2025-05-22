import {Link} from "react-router-dom";
import InnerNavMenu from "../../../_components/InnerNavMenu/InnerNavMenu";

const EducationInnerNavMenu = () => {
    return(
        <InnerNavMenu>
            <Link to={"/admin/education/courses"} className={"admin-nav-link"}>Курсы</Link>
            <Link to={"/admin/education/articles"}>Статьи</Link>
            <Link to={"/admin/education/tests"}>Тесты</Link>
        </InnerNavMenu>
    )
}

export default EducationInnerNavMenu;