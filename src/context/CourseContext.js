import {createContext, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getCourseById} from "../services/drkb-wiki-education/CourseService";

export const CourseContext = createContext();

export const CourseProvider = ({children}) => {
    const params = useParams();
    const courseId = params.courseId;
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            if (courseId !== undefined) {
                const result = await getCourseById(courseId);
                if (result.success) {
                    setCourse(result.data);
                }
                else {
                    console.error("Ошибка получения courseId из контекста");
                }
            }
        }
        fetchCourse();

    }, [courseId]);

    return(
        <CourseContext.Provider value={course}>
            {children}
        </CourseContext.Provider>
    )

}

