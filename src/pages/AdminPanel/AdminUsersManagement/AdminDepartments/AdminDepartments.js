import useFetch from "../../../../hooks/useFetch";
import {getAllDepartment} from "../../../../services/drkb-main/DepartmentService";
import {useEffect, useState} from "react";
import {getAllTest} from "../../../../services/drkb-wiki-education/TestService";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../../../components/ErrorSnackbar/ErrorSnackbar";
import {Button} from "@mui/material";
import CourseBlock from "../../AdminEducation/components/CourseBlock/CourseBlock";
import CreateTestModal from "../../AdminEducation/AdminTests/_components/CreateTestModal";
import {Outlet,useParams} from "react-router-dom";
import "./AdminDepartments.css";
import AdminDepartmentCardElement from "./_components/AdminDepartmentCardElement/AdminDepartmentCardElement";
import CreateDepartmentModal from "./_components/CreateDepartmentModal/CreateDepartmentModal";
import TopButtonWrapper from "../../_components/TopButtonWrapper/TopButtonWrapper";
const AdminDepartments = () => {
    const [departments, isLoadingDepartments, errorDepartments] = useFetch(() => getAllDepartment())
    const [openModal, setIsOpenModal] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isDepartmentPath, setIsDepartmentPath] = useState(false);
    const {adminDepartmentId} = useParams();

    useEffect(() => {
        if (adminDepartmentId !== undefined && adminDepartmentId !== null) {
            setIsDepartmentPath(true);
        }
        else {
            setIsDepartmentPath(false);
        }
    }, [adminDepartmentId]);

    useEffect(() => {
        console.log(departments);
    }, [departments]);

    return(
        <>
            {isDepartmentPath ?
                (<Outlet/>) :
                (
                    <>
                        {/*<div className={"admin-education-wrapper-top"}>
                            <Button variant={"contained"} sx={{width: "100%"}} onClick={() => setIsOpenModal(true)}>Создать отделение</Button>
                        </div>*/}
                        <TopButtonWrapper title={"Создать отделение"} onClick={() => setIsOpenModal(true)}/>
                        <div className="departments-wrapper">
                                {departments.map((department, index) => (
                                    <AdminDepartmentCardElement title={department.name} itemId={department.id} key={index}/>
                                ))}
                        </div>
                        <CreateDepartmentModal open={openModal} onClose={() => setIsOpenModal(false)} setRefreshKey={setRefreshKey}/>
                    </>
                )}
        </>
    )
}

export default AdminDepartments;