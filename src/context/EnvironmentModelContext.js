import {createContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getEnvironmentModelById} from "../services/drkb-wiki/EnvironmentModelService";


export const EnvironmentModelContext = createContext();

export const EnvironmentModelProvider = ({children}) => {
    const params = useParams();
    const environmentModelId = params.id;
    const [environmentModel, setEnvironmentModel] = useState(null);
    useEffect(() => {
        const fetchEnvironmentModel = async () => {
            if (environmentModelId !== undefined) {
                const result = await getEnvironmentModelById(environmentModelId);
                if (result.success) {
                    setEnvironmentModel(result.data);
                }
                else {
                    console.error("Ошибка получения environmentModel из контекста");
                }
            }

            /*try {
                if (environmentModelId !== undefined) {
                    const data = await getEnvironmentModelById(environmentModelId);
                    if (data) {
                        setEnvironmentModel(data);
                    }
                }
            } catch (error) {
                console.error(error);
            }*/
        }

        fetchEnvironmentModel();

    }, [environmentModelId]);

    useEffect(() => {
        console.log("ENV MODEL FRoM CONTEXT");
        console.log(environmentModel);
    }, [environmentModel]);

    return (
        <EnvironmentModelContext.Provider value={environmentModel}>
            {children}
        </EnvironmentModelContext.Provider>
    )

}
