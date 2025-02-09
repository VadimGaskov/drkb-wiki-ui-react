import Header from "../../components/main-page/header/Header";
import TopNav from "../../components/main-page/top-nav/TopNav";
import "./Home.css";
import NewsFeed from "../../components/main-page/news-feed/NewsFeed";
import BottomNav from "../../components/main-page/bottom-nav/BottomNav";
const Home = () => {
return (
    <div className="home-page">
        <Header />
        <TopNav />
        <NewsFeed />
        <BottomNav />
    </div>
    );
}

export default Home;