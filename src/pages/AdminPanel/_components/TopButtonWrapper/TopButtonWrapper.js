import {Button} from "@mui/material";
import "./TopButtonWrapper.css";
const TopButtonWrapper = ({title,onClick}) => {
    return(
        <div className={"admin-top-button-wrapper"}>
            <Button variant={"contained"}  sx={{width: "100%"}} onClick={onClick}>{title}</Button>
        </div>
    )
}

export default TopButtonWrapper;