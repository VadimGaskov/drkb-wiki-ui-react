import {CircularProgress} from "@mui/material";
import "./ProgressBar.css";
const ProgressBar = ({className = "circular-progress", size = "3rem"}) => {
    return(
        <CircularProgress size={size} className={className}></CircularProgress>
    )
}

export default ProgressBar;