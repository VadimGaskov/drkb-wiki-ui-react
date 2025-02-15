import "./NewsItem.css";
const NewsItem = ({newsPreview}) => {
    return(
        <div className="news-item">
            <div className="news-preview">
                {newsPreview}
            </div>
            <button type="button">
                Подробнее
            </button>
        </div>
    );
}

export default NewsItem;