import Navbar from "../navbar/Navbar";
import './Header.css';
import MainLogo from "../../assets/img/header/drkb-logo.png";
import FoxLogo from "../../assets/img/header/foxlogo.svg";

const Header = () => {
    return(
        <header>
            <div className="header-wrapper">
                <img id="logo" src={MainLogo}/>
                <Navbar />
                <img id="fox-logo" src={FoxLogo}/>
            </div>
        </header>
    );
}

export default Header;