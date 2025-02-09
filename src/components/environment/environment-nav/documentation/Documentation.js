import EnvironmentNav from "../EnvironmentNav";
import DocumentationElement from "./documentation-element/DocumentationElement";
import "./Documentation.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {API_URLS} from "../../../../constants/ApiUrls";
import {getAllByEnvironmentModel} from "../../../../services/drkb-wiki/CommonDocumentService";

const Documentation = () => {
    const { id } = useParams();
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        const fetchDocumentsByEnvironmentModel = async () => {
            try {
                const data = await getAllByEnvironmentModel(id);
                setDocuments(data);
            }
            catch (error) {
                console.error(error)
            }
        }

        fetchDocumentsByEnvironmentModel();
    }, [id]); // добавил зависимость от id для корректной работы при смене параметра

    return(
        <>
            <ul>
                {documents.length > 0 ? (
                    <ul>
                        {documents.map(document => (
                            <DocumentationElement key={document.id} title={document.name} />
                        ))}
                    </ul>
                ) : (
                    <p>Документы не найдены.</p>
                )}
            </ul>
        </>
    )
}

export default Documentation;