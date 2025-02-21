import EnvironmentModelNav from "../../components/environment-model-nav/EnvironmentModelNav";
import DocumentationElement from "./documentation-element/DocumentationElement";
import "./Documentation.css";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {API_URLS} from "../../../../constants/ApiUrls";
import {getAllByEnvironmentModel} from "../../../../services/drkb-wiki/CommonDocumentService";
import ModalWindow from "../../../../components/modal-window/ModalWindow";
import {EnvironmentModelContext} from "../../../../context/EnvironmentModelContext";

const Documentation = () => {
    const environmentModel = useContext(EnvironmentModelContext);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        if (!environmentModel) return; // Проверяем, что environmentModel не null

        const fetchDocumentsByEnvironmentModel = async () => {
            try {
                const data = await getAllByEnvironmentModel(environmentModel.id);
                setDocuments(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDocumentsByEnvironmentModel();
    }, [environmentModel?.id]); // Используем optional chaining

    return (
        <>
            {environmentModel && (
                <ModalWindow className="upload-document-btn" title="Загрузить документ" environmentModelId={environmentModel.id}/>
            )}
                {documents.length > 0 ? (
                    <ul>
                        {documents.map(document => (
                            <DocumentationElement key={document.id} title={document.name} downloadSrc={document.documentPath}/>
                        ))}
                    </ul>
                ) : (
                    <p>Документы не найдены.</p>
                )}
        </>
    );
};

export default Documentation;