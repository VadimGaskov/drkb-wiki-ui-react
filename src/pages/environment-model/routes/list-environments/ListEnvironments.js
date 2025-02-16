import "./ListEnvironments.css";
import {useContext, useEffect, useState} from "react";
import {EnvironmentModelContext} from "../../../../context/EnvironmentModelContext";
import {getAllEnvironmentsByModelId} from "../../../../services/drkb-wiki/EnvironmentService";
const ListEnvironments = () => {
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
      <p>
          {environments.length === 0 ? (
              <p>Загрузка...</p>
          ) : (
              environments.map((environment) => (
                  <p key={environment.id}>{environment.departmentDeployment}</p>
              ))
          )}
      </p>
    );
}

export default ListEnvironments;