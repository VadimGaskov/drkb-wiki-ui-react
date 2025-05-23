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
                        <div className={"admin-education-wrapper-top"}>
                            <Button variant={"contained"} onClick={() => setIsOpenModal(true)}>Создать тест</Button>
                        </div>
                        <div className={"admin-education-wrapper"}>
                            {isLoadingDepartments && (<ProgressBar/>)}
                            {errorDepartments && (<ErrorSnackbar errorMessage={errorDepartments} onClose={() => console.log(null) }/>)}
                            {departments.map((department) => {
                                return (
                                    <>
                                        <CourseBlock
                                            title={department.name}
                                            description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, voluptatum."}
                                            courseId={department.id}
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

export default AdminDepartments;