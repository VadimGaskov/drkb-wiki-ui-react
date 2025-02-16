import "./ListEnvironmentModel.css";
import NameEnvironmentModel from "./components/name-environment-model/NameEnvironmentModel";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {API_URLS} from "../../constants/ApiUrls";
import {getAllEnvironmentModels} from "../../services/drkb-wiki/EnvironmentModelService";
import {getAllCommonDocument} from "../../services/drkb-wiki/CommonDocumentService";
import Fox from "../../assets/img/foxes/list-environment-fox-min.svg";

const ListEnvironmentModel = () => {
    const [environmentModels, setEnvironmentModels] = useState([]);

    useEffect(() => {
        const fetchEnvironmentModels = async () => {
            try {
                const data = await getAllEnvironmentModels();
                setEnvironmentModels(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchEnvironmentModels();

    }, []);

    return(
        <>
            <img src={Fox} alt="" className="list-environment-model-fox"/>
            <h2>Список оборудования</h2>
            <div className="list-environment-model">
                <ul>
                    {environmentModels.map(environmentModel =>
                        <NameEnvironmentModel key={environmentModel.id} id={environmentModel.id} title={environmentModel.name} />
                    )}
                </ul>
            </div>
        </>
    );
}

export default ListEnvironmentModel;