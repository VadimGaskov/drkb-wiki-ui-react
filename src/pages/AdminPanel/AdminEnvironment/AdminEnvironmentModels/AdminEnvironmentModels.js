import "./AdminEnvironmentModels.css";
import useFetch from "../../../../hooks/useFetch";
import {getAllEnvironmentModels} from "../../../../services/drkb-wiki/EnvironmentModelService";
import {Button} from "@mui/material";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import CourseBlock from "../../AdminEducation/components/CourseBlock/CourseBlock";
import CreateTestModal from "../../AdminEducation/AdminTests/_components/CreateTestModal";
import {useEffect, useState} from "react";
import ItemCardElement from "../_components/ItemCardElement/ItemCardElement";
import {Outlet, useParams} from "react-router-dom";
import CreateEnvironmentModelModal from "./_components/CreateEnvironmentModelModal/CreateEnvironmentModelModal";
import TopButtonWrapper from "../../_components/TopButtonWrapper/TopButtonWrapper";
const AdminEnvironmentModels = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [environmentModels, isLoadingEnvironmentModels, errorEnvironmentModels] = useFetch(() => getAllEnvironmentModels());
    const [groupedData, setGroupedData] = useState({});
    const [openModal, setIsOpenModal] = useState(false);
    const [isEnvironmentPath, setIsEnvironmentPath] = useState(false);
    const {adminEnvironmentModelId} = useParams();
    useEffect(() => {
        if (environmentModels.length === 0) return;
        const grouped = {};

        environmentModels.forEach(item => {
            const firstLetter = item.name[0].toUpperCase();
            if (!grouped[firstLetter]) grouped[firstLetter] = [];
            grouped[firstLetter].push(item);
        });

        setGroupedData(grouped);
    }, [environmentModels]);

    useEffect(() => {
        if (adminEnvironmentModelId !== undefined && adminEnvironmentModelId !== null) {
            setIsEnvironmentPath(true);
        }
        else {
            setIsEnvironmentPath(false);
        }
    }, [adminEnvironmentModelId]);

    return(
        <>
            {isEnvironmentPath ? (<Outlet/>) : (
                <>
                    <TopButtonWrapper title={"Создать модель оборудования"} onClick={() => setIsOpenModal(true)}/>

                    <div className="grouped-container">
                        {Object.entries(groupedData).map(([letter, items]) => (
                            <div className="group" key={letter}>
                                <h2 className="group-title">{letter}</h2>
                                <div className="items-list">
                                    {items.map((item, index) => (
                                        <ItemCardElement key={index} title={item.name} itemId={item.id}/>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}


            {/*<div className={"admin-education-wrapper"}>
                {isLoadingEnvironmentModels && (<ProgressBar/>)}

                {environmentModels.map((environmentModel) => {
                    return (
                        <>
                            <CourseBlock
                                title={environmentModel.name}
                                description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, voluptatum."}
                                courseId={environmentModel.id}
                            />
                        </>
                    );
                })}
            </div>*/}

            <CreateEnvironmentModelModal open={openModal} onClose={() => setIsOpenModal(false)} setRefreshKey={setRefreshKey}/>
        </>
    )
}

export default AdminEnvironmentModels;