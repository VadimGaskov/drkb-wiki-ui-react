import EnvironmentNav from "../EnvironmentNav";
import DocumentationElement from "./documentation-element/DocumentationElement";
import "./Documentation.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {API_URLS} from "../../../../constants/ApiUrls";

const Documentation = () => {
    const { id } = useParams();
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const url = new URL(`${API_URLS.COMMON_DOCUMENT}/get-all-by-environment-model`);
                url.searchParams.append("environmentModelId", id);
                const response =
                    await fetch(url.toString());
                if (!response.ok)
                    console.error("ОШИБКА");

                const data = await response.json();

                setDocuments(data);
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchDocuments();
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