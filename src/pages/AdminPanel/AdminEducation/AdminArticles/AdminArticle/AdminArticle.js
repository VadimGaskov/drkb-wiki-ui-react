import {useParams} from "react-router-dom";
import useFetchObject from "../../../../../hooks/useFetchObject";
import {getArticleById} from "../../../../../services/drkb-wiki-education/ArticleService";
import QuillEditor from "../../../../../components/QuillEditor/QuillEditor";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";

const AdminArticle = () => {
    const params = useParams();
    const adminArticleId = params.adminArticleId;
    const [article, isLoading, error] = useFetchObject(() => getArticleById(adminArticleId));

    const [value, setValue] = useState(null);
    const [articleToUpdate, setArticleToUpdate] = useState({
        title: "",
        content: "",
        dateDeadline: "",
        testId: "",
        description: ""
    })

    const setContent = (newContent) => {
        setArticleToUpdate((prevState) => ({...prevState, content: newContent}))
    }

    useEffect(() => {
        console.log(articleToUpdate);
    }, [articleToUpdate]);

    return(
        <>
            {article && (
                <>
                    <span>{article.id}</span>
                    <h1>{article.title}</h1>
                    <div style={{width: "100%", height: "100%",overflowY: "auto"}}>
                        <QuillEditor
                            value={article.content}
                            setValue={setContent}
                        />
                    </div>
                    <Button variant={"contained"}>Сохранить</Button>

                </>

            )}
        </>
    )
}

export default AdminArticle;