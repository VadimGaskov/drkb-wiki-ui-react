import "./Home.css";
import Header from "./_components/header/Header";
import TopNav from "./_components/top-nav/TopNav";
import NewsFeed from "./_components/news-feed/NewsFeed";
import BottomNav from "./_components/bottom-nav/BottomNav";
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