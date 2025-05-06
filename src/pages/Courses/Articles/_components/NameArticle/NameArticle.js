import {ROUTINGS} from "../../../../../constants/Routings";
import {Link} from "react-router-dom";

const NameArticle = ({articleId,title}) => {
    return(
        <li className="name-environment-model-element">
            <div className="symbol-plus">
                +
            </div>
            <Link to={`${ROUTINGS.ARTICLE(articleId)}`} className="name-environment-model">{title}</Link>
        </li>
    )
}

export default NameArticle;