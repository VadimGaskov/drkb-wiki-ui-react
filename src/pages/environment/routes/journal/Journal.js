import {useEffect, useState} from "react";
import {getEnvironmentModelById} from "../../../../services/drkb-wiki/EnvironmentModelService";

const Journal = () => {
    const [environmentModel, setEnvironmentModel] = useState(null);
    useEffect(() => {
        const getEnvironmentModel = async () => {
            const data = await getEnvironmentModelById("3c6eba87-c7f4-4a0c-90aa-3aaf353805cb");
            if (data)
                setEnvironmentModel(data);
            else
                alert("ОШИБКА");
        }

        getEnvironmentModel();
    }, []);

    return(
        <>
            {environmentModel ? (
                <div dangerouslySetInnerHTML={{ __html: environmentModel.shortInstruction }} />
            ) : (
                <p>Загрузка...</p>
            )}

        </>
    )

}

export default Journal;