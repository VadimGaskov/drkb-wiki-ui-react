import {Link} from "react-router-dom";
import {ROUTINGS} from "../../../../constants/Routings";

const NameCourse = ({courseId,title}) => {
    return(
        <li className="name-environment-model-element">
            <div className="symbol-plus">
                +
            </div>
            <Link to={`${ROUTINGS.COURSE(courseId)}`} className="name-environment-model">{title}</Link>
        </li>
    )
}

export default NameCourse;