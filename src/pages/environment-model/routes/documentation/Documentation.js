import DocumentationElement from "./documentation-element/DocumentationElement";
import "./Documentation.css";
import {useContext, useEffect, useState} from "react";
import {getAllByEnvironmentModel} from "../../../../services/drkb-wiki/CommonDocumentService";
import ModalWindow from "../../../../components/modal-window/ModalWindow";
import {EnvironmentModelContext} from "../../../../context/EnvironmentModelContext";
import ErrorSnackbar from "../../../../components/ErrorSnackbar/ErrorSnackbar";
import ProgressBars from "../../../../components/ProgressBar/ProgressBar";

const Documentation = () => {
    const environmentModel = useContext(EnvironmentModelContext);
    const [documents, setDocuments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdded, setAdded] = useState(false);
    useEffect(() => {
        if (!environmentModel) return; // Проверяем, что environmentModel не null
        const fetchDocumentsByEnvironmentModel = async () => {
            const result = await getAllByEnvironmentModel(environmentModel.id);
            if (result.success) {
                setDocuments(result.data);
            }
            else {
                setError(result.errorMessage || "Ошибка получения данных с сервера. Пожалуйста, попробуйте позже");
            }
            setLoading(false);
        };

        fetchDocumentsByEnvironmentModel();
    }, [environmentModel, environmentModel.id, isAdded]); // Используем optional chaining

    return (
        <>
            {!error && !isLoading && (
                <ModalWindow className="upload-document-btn" title="Загрузить документ" environmentModelId={environmentModel.id}/>
            )}

            {!error && !isLoading && (
                documents.length > 0 ? (
                        <ul>
                            {documents.map(document => (
                                <DocumentationElement key={document.id} title={document.name} downloadSrc={document.documentPath}/>
                            ))}
                        </ul>
                    ) : (
                        <p>Документы не найдены.</p>
                    )
            )}
            {error &&
                <p>Ошибка загрузки документов</p>
            }

            <ErrorSnackbar
                errorMessage={error}
                /*onClose={()=> setError(null)}*/
            />
            {isLoading && <ProgressBars />}
        </>
    );
};

export default Documentation;