import {Link} from "react-router-dom";
import {ROUTINGS} from "../../../../../../constants/Routings";

const NameArticle = ({text, testId}) => {
    return(
        <li className="name-environment-model-element">
            <div className="symbol-plus">
                +
            </div>
            <Link to={`${ROUTINGS.TEST(testId)}`} className="name-environment-model">{text}</Link>
        </li>
    )
}

export default NameArticle;