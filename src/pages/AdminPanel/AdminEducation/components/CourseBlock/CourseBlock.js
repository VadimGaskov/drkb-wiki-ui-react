import "./CourseBlock.css";
import {Button} from "@mui/material";
const CourseBlock = ({title, description, courseId}) => {
    return(
        <div className={"course-block"}>
            <div className={"course-block-title"}>
                <h2>{title}</h2>
            </div>
            <div className={"course-block-content"}>
                <span>{description}</span>
            </div>
            <div className={"course-block-footer"}>
                <Button variant={"contained"} sx={{height: "1.5rem"}}>Подробнее</Button>
            </div>
        </div>
    )
}

export default CourseBlock;