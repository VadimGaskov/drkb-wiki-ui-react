import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getEnvironmentModelById} from "../../services/drkb-wiki/EnvironmentModelService";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../components/ErrorSnackbar/ErrorSnackbar";
import {Button} from "@mui/material"; // Импорт стилей Quill
const ShortInstructionForAll = () => {
    const {environmentId} = useParams();
    const [environment, setEnvironment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!environmentId) return;
        const fetchEnvironment = async () => {
            const result = await getEnvironmentModelById(environmentId);
            if(result.success) {
                setEnvironment(result.data);
            }
            else {
                setError("Ошибка получения модели оборудования");
                console.error("Ошибка получения модели оборудования");
            }

            setIsLoading(false);
        }

        fetchEnvironment();
    }, [environmentId]);

    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && environment) {
            const quill = new Quill(editorRef.current, {
                readOnly : true
            });

            quill.root.innerHTML = environment.shortInstruction;
        }
    }, [editorRef, environment]);


    return(
        <>
            <div style={{height: "auto"}}>
                <Button variant={"contained"} sx={{width: "100%"}}>Перейти на основную версию сайта</Button>
            </div>
            {isLoading && <ProgressBar/>}
            {error && <ErrorSnackbar errorMessage={error} onClose={() => setError(null)}/>}
            {!isLoading && !error && <div ref={editorRef} className="quill-editor"/>}
        </>

        /*<>
            <div ref={editorRef} className="quill-editor"/>
        </>*/

    )
}

export default ShortInstructionForAll;