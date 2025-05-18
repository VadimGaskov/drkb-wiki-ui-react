import "./CourseBlock.css";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
const CourseBlock = ({title, description, id}) => {
    const navigate = useNavigate();



    return(
        <div className={"course-block"}>
            <div className={"course-block-title"}>
                <h2>{title}</h2>
            </div>
            <div className={"course-block-content"}>
                <span>{description}</span>
            </div>
            <div className={"course-block-footer"}>
                <Button variant={"contained"} sx={{height: "1.5rem"}} onClick={() => navigate(`${id}`)}>Подробнее</Button>
            </div>
        </div>
    )
}

export default CourseBlock;