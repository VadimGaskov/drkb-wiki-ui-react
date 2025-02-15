import "./Home.css";
import Header from "./components/header/Header";
import TopNav from "./components/top-nav/TopNav";
import NewsFeed from "./components/news-feed/NewsFeed";
import BottomNav from "./components/bottom-nav/BottomNav";
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