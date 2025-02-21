import "./NewsFeed.css";
import NewsItem from "./news-item/NewsItem";
const NewsFeed = () => {
    return(
        <div className="news-feed">
            <h1 className="news-title">Новости</h1>
            {/*TODO Динамически доставать новости из бд*/}
            <div className="news-wrapper">
                <NewsItem newsPreview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, eum."/>
                <NewsItem newsPreview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias voluptas dolor perspiciatis architecto vero ipsam doloremque accusantium dicta adipisci nesciunt!"/>
                <NewsItem newsPreview="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum quidem quos provident fugiat magnam vero."/>
                <NewsItem newsPreview="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, error aut quam cupiditate rem natus laboriosam laborum id vel nesciunt. Iusto labore facilis vero quidem aliquid nam nulla et excepturi!"/>
                <NewsItem newsPreview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed possimus beatae reprehenderit, eaque asperiores accusamus consequuntur commodi nostrum odio?"/>
                <NewsItem newsPreview="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, deleniti. A cumque corporis, suscipit laudantium eos iure itaque dolor quisquam eveniet dolores!"/>
            </div>
        </div>
    );
}

export default NewsFeed;