import "./NewsFeed.css";
import NewsItem from "./news-item/NewsItem";
const NewsFeed = () => {
    return(
        <div className="news-feed">
            <h1 className="news-title">Новости</h1>
            {/*TODO Динамически доставать новости из бд*/}
            <div className="news-wrapper">
                <NewsItem newsPreview="Июнь – старт работы Детского лагеря труда и отдыха для несовершеннолетних детей работников ДРКБ «Активные каникулы»"/>
                <NewsItem newsPreview="11.06 – Торжественное мероприятие, посвященное Дню медицинского работника"/>
                <NewsItem newsPreview="07.06 – Торжественное мероприятие, посвященное 25-летию Главной детской больнице Республики Бурятия"/>
                <NewsItem newsPreview="04.06 – итоговая защита проектов-участников Общебольничного конкурса «Медлидер"/>
                <NewsItem newsPreview="30.05 – первое собеседование с кандидатами на целевое обучение по программе среднего профессионального образования"/>
            </div>
        </div>
    );
}

export default NewsFeed;