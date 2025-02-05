import "./ListEnvironment.css";
import NameEquipment from "../../components/list-environment/name-equipment/NameEquipment";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
const ListEnvironment = () => {
    const [environments, setEnvironments] = useState([]);

    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                const response = await fetch("http://localhost:5065/api/environment-model/get-all");
                if (!response.ok)
                    throw new Error('Ошибка при получении данных');

                const data = await response.json();
                setEnvironments(data);
            }
            catch (error){
                console.error(error)
            }
        }

        fetchEquipments();
    }, []);

    return(
        <>
            <h2>Список оборудования</h2>
            <div className="list-equipment">
                <ul>
                    {environments.map(equipment =>
                        <NameEquipment key={equipment.id} id={equipment.id} title={equipment.name} />
                    )}
                </ul>
            </div>
        </>
    );
}

export default ListEnvironment;