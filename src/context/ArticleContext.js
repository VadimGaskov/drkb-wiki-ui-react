import {createContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {getArticleById} from "../services/drkb-wiki-education/ArticleService";

export const ArticleContext = createContext();

export const ArticleProvider = ({children}) => {
    const params = useParams();
    const articleId = params.articleId;
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            const response = await getArticleById(articleId);
            if (response.success) {
                setArticle(response.data);
            }
            else {
                console.error("Ошибка получения article из контекста");
            }
        }
        fetchArticle();
    }, [articleId]);

    return (
        <ArticleContext.Provider value={article}>
            {children}
        </ArticleContext.Provider>
    )
}