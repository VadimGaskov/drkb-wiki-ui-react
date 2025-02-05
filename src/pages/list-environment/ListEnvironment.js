import "./ListEnvironment.css";
import NameEquipment from "../../components/list-environment/name-equipment/NameEquipment";
import {Link} from "react-router-dom";
const ListEnvironment = () => {
    return(
        <>
            <h2>Список оборудования</h2>
            <div className="list-equipment">
                <ul>
                    <NameEquipment title="Дефибриллятор" ></NameEquipment>
                    <NameEquipment title="Дефибриллятор" ></NameEquipment>
                    <NameEquipment title="Дефибриллятор" ></NameEquipment>
                    <NameEquipment title="Дефибриллятор" ></NameEquipment>
                </ul>
            </div>
        </>
    );
}

export default ListEnvironment;