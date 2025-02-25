import { EnvironmentModelContext } from "../../../../context/EnvironmentModelContext";
import { getAllEnvironmentsByModelId } from "../../../../services/drkb-wiki/EnvironmentService";
import ModalWindow from "../../../../components/modal-window/ModalWindow";
import NameEnvironment from "./name-environment/NameEnvironment";
import { useContext, useEffect, useState } from "react";

const MaintenanceLogbook = () => {
    const environmentModel = useContext(EnvironmentModelContext);
    const [environments, setEnvironments] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchEnvironments = async () => {
            try {
                // Only fetch if environmentModel is available
                if (environmentModel && environmentModel.id) {
                    const data = await getAllEnvironmentsByModelId(environmentModel.id);
                    setEnvironments(data);
                }
            } catch (error) {
                console.error("Error fetching environments:", error);
            } finally {
                setLoading(false); // Set loading to false once done
            }
        };

        fetchEnvironments();
    }, [environmentModel]); // Dependency on environmentModel

    if (loading) {
        return <p>Загрузка...</p>; // Show loading state while fetching
    }

    if (!environmentModel) {
        return <p>Модель оборудования не найдена.</p>; // Handle case where environmentModel remains null
    }

    return (
        <>
            <ul>
                <ModalWindow
                    className="upload-document-btn"
                    title="Добавить оборудование"
                    environmentModelId={environmentModel.id}
                />
                {environments.length === 0 ? (
                    <p>Нет доступных окружений.</p>
                ) : (
                    environments.map((environment) => (
                        <NameEnvironment
                            departmentId={environment.departmentId}
                            inventoryNumber={"Инвентарный номер: " + environment.inventoryNumber}
                            key={environment.id}
                        />
                    ))
                )}
            </ul>
        </>
    );
};

export default MaintenanceLogbook;