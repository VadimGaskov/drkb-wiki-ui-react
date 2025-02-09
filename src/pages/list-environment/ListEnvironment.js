import "./ListEnvironment.css";
import NameEquipment from "../../components/list-environment/name-equipment/NameEquipment";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {API_URLS} from "../../constants/ApiUrls";
import {getAllEnvironmentModels} from "../../services/drkb-wiki/EnvironmentModelService";
import {getAllCommonDocument} from "../../services/drkb-wiki/CommonDocumentService";

const ListEnvironment = () => {
    const [environments, setEnvironments] = useState([]);

    useEffect(() => {
        const fetchEnvironmentModels = async () => {
            try {
                const data = await getAllEnvironmentModels();
                setEnvironments(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchEnvironmentModels();

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