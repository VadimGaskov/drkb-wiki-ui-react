import AddEnvironmentModelModal
    from "../list-environment-model/components/add-environment-model-modal/AddEnvironmentModelModal";
import NameEnvironmentModel from "../list-environment-model/components/name-environment-model/NameEnvironmentModel";
import Fox from "../../assets/img/foxes/list-environment-fox-min.svg";
import {Link} from "react-router-dom";
import {ROUTINGS} from "../../constants/Routings";

const ListCourses = () => {
    return(
        <>
            <img src={Fox} alt="" className="list-environment-model-fox"/>
            <h2>Список оборудования</h2>
            <div className="list-environment-model">
                <AddEnvironmentModelModal title={"Добавить оборудование"} environmentModelId={""}></AddEnvironmentModelModal>
                <ul>
                    <li className="name-environment-model-element">
                        <div className="symbol-plus">
                            +
                        </div>
                        <Link to="" className="name-environment-model">asdsad</Link>
                    </li>
                </ul>
            </div>

        </>

    );
}

export default ListCourses;