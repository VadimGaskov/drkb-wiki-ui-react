import "./CourseBlock.css";
const CourseBlock = ({title, description}) => {
    return(
        <div className={"course-block"}>
            <div className={"course-block-title"}>
                <h2>{title}</h2>
            </div>
            <div className={"course-block-content"}>
                <span>{description}</span>
            </div>
        </div>
    )
}

export default CourseBlock;