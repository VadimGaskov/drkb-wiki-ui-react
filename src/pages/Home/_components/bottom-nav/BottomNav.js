import "./BottomNav.css";

import ProfileIcon from "../../../../assets/icons/profile.svg";
import TestsIcon from "../../../../assets/icons/tests.svg";
import DocumentsIcon from "../../../../assets/icons/documents.svg";
import JournalsIcon from "../../../../assets/icons/journals.svg";
import BottomNavElement from "./BottomNavElement/BottomNavElement";
const BottomNav = () => {
    return(
        <div className="bottom-nav">
            <BottomNavElement img={ProfileIcon}/>
            <BottomNavElement img={TestsIcon}/>
            <BottomNavElement img={DocumentsIcon}/>
            <BottomNavElement img={JournalsIcon}/>
        </div>
    );
}

export default BottomNav;