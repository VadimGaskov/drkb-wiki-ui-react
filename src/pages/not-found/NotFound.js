import "./NotFound.css";
import SadFoxIcon from "../../assets/img/foxes/list-environment-fox.svg";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ROUTINGS} from "../../constants/Routings";
const NotFound = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`${ROUTINGS.HOME}`);
    }

    return (
        <div className="not-found-container">
            <h1 className="not-found-text">Такой страницы не существует :( </h1>
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

export default NotFound;