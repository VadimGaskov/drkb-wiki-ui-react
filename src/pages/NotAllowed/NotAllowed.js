import "./NotAllowed.css";
import {useNavigate} from "react-router-dom";
import {ROUTINGS} from "../../constants/Routings";
import {Button} from "@mui/material";
import SadFoxIcon from "../../assets/img/foxes/list-environment-fox.svg";
const NotAllowed = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`${ROUTINGS.HOME}`);
    }

    return (
        <div className="not-found-container">
            <h1 className="not-found-text">У вас нет доступа к данному ресурсу </h1>
            <Button
                className="home-button"
                type="button"
                variant="contained"
                onClick={handleClick}
                color="secondary"
            >На главную</Button>
            <img id="not-found-fox" src={SadFoxIcon}/>
        </div>

    );
}

export default NotAllowed;