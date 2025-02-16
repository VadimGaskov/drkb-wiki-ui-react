import {createContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getEnvironmentModelById} from "../services/drkb-wiki/EnvironmentModelService";


export const EnvironmentModelContext = createContext();

export const EnvironmentModelProvider = ({children}) => {
    const params = useParams();
    const environmentModelId = params.id;
    console.log(environmentModelId);
    const [environmentModel, setEnvironmentModel] = useState(null);
    useEffect(() => {
        const fetchEnvironmentModel = async () => {
            try {
                if (environmentModelId !== undefined) {
                    const data = await getEnvironmentModelById(environmentModelId);
                    if (data) {
                        setEnvironmentModel(data);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchEnvironmentModel();

    }, [environmentModelId]);

    return (
        <EnvironmentModelContext.Provider value={environmentModel}>
            {children}
        </EnvironmentModelContext.Provider>
    )

}
