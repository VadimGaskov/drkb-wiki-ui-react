import useFetch from "../../../../hooks/useFetch";
import {getAllCourses} from "../../../../services/drkb-wiki-education/CourseService";
import {useEffect, useState} from "react";
import {Outlet, useParams} from "react-router-dom";
import {Button} from "@mui/material";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import CourseBlock from "../components/CourseBlock/CourseBlock";
import CreateCourseModal from "../components/CreateCourseModal/CreateCourseModal";
import {getAllTest} from "../../../../services/drkb-wiki-education/TestService";
import CreateTestModal from "./_components/CreateTestModal";
import TopButtonWrapper from "../../_components/TopButtonWrapper/TopButtonWrapper";

const AdminTests = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [tests, isLoading, error] = useFetch(() => getAllTest(), [refreshKey]);
    const [openModal, setIsOpenModal] = useState(false);
    const [isTestPath, setIsTestPath] = useState(false);
    const {adminTestId} = useParams();

    useEffect(() => {
        if (adminTestId !== undefined && adminTestId !== null) {
            setIsTestPath(true);
        }
        else {
            setIsTestPath(false);
        }
    }, [adminTestId]);

    return(
        <>
            {isTestPath ? (
                <Outlet />
            ) : (
                <>
                    <TopButtonWrapper title={"Создать тест"} onClick={() => setIsOpenModal(true)}/>

                    <div className={"admin-education-wrapper"}>
                        {isLoading && (<ProgressBar/>)}

                        {tests.map((test) => {
                            return (
                                <>
                                    <CourseBlock
                                        title={test.title}
                                        description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, voluptatum."}
                                        courseId={test.id}
                                    />
                                </>
                            );
                        })}
                    </div>

                    <CreateTestModal open={openModal} onClose={() => setIsOpenModal(false)} setRefreshKey={setRefreshKey}/>
                </>
            )}

        </>
    )
}

export default AdminTests;