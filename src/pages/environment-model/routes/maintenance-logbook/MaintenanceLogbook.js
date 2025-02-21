import {EnvironmentModelContext} from "../../../../context/EnvironmentModelContext";
import {getAllEnvironmentsByModelId} from "../../../../services/drkb-wiki/EnvironmentService";
import ModalWindow from "../../../../components/modal-window/ModalWindow";
import NameEnvironment from "./name-environment/NameEnvironment";
import {useContext, useEffect, useState} from "react";

const MaintenanceLogbook = () => {
    const environmentModel = useContext(EnvironmentModelContext);
    const [environments, setEnvironments] = useState([]);
    useEffect(() => {
        if (!environmentModel) return;
        const fetchEnvironments = async () => {
            try {
                const data = await getAllEnvironmentsByModelId(environmentModel.id);
                setEnvironments(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchEnvironments();
    }, [environmentModel]);

    return(
        <>
            {/*<AddEnvironmentModelModal title={"Добавить оборудование"} environmentModelId={""}></AddEnvironmentModelModal>*/}
            <ul>
                <ModalWindow className="upload-document-btn" title="Добавить расположение" environmentModelId={environmentModel.id}/>

                {environments.length === 0 ? (
                    <p>Загрузка...</p>
                ) : (
                    environments.map((environment) => (
                        <NameEnvironment departmentId={environment.departmentId} inventoryNumber={"Инвентарный номер: " + environment.inventoryNumber} key={environment.id}/>
                    ))
                )}
            </ul>
        </>
    );
}

export default MaintenanceLogbook;