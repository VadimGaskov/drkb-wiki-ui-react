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
import ItemCardElement from "../../AdminEnvironment/_components/ItemCardElement/ItemCardElement";

const AdminTests = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [tests, isLoading, error] = useFetch(() => getAllTest(), [refreshKey]);
    const [openModal, setIsOpenModal] = useState(false);
    const [isTestPath, setIsTestPath] = useState(false);
    const {adminTestId} = useParams();
    const [groupedData, setGroupedData] = useState({});
    useEffect(() => {
        if (adminTestId !== undefined && adminTestId !== null) {
            setIsTestPath(true);
        }
        else {
            setIsTestPath(false);
        }
    }, [adminTestId]);

    useEffect(() => {
        if (tests.length === 0) return;
        const grouped = {};

        tests.forEach(item => {
            const firstLetter = item.title[0].toUpperCase();
            if (!grouped[firstLetter]) grouped[firstLetter] = [];
            grouped[firstLetter].push(item);
        });

        setGroupedData(grouped);
    }, [tests]);

    return(
        <>
            {isTestPath ? (
                <Outlet />
            ) : (
                <>
                    <TopButtonWrapper title={"Создать тест"} onClick={() => setIsOpenModal(true)}/>

                    {/*<div className={"admin-education-wrapper"}>
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
                    </div>*/}

                    <div className="grouped-container">
                        {Object.entries(groupedData).map(([letter, items]) => (
                            <div className="group" key={letter}>
                                <h2 className="group-title">{letter}</h2>
                                <div className="items-list">
                                    {items.map((item, index) => (
                                        <ItemCardElement key={index} title={item.title} itemId={item.id}/>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <CreateTestModal open={openModal} onClose={() => setIsOpenModal(false)} setRefreshKey={setRefreshKey}/>
                </>
            )}

        </>
    )
}

export default AdminTests;