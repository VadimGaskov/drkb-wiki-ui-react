import {getAllEnvironmentModels} from "../../services/drkb-wiki/EnvironmentModelService";
import Fox from "../../assets/img/foxes/list-environment-fox-min.svg";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import AddEnvironmentModelModal
    from "../EnvironmentModels/_components/add-environment-model-modal/AddEnvironmentModelModal";
import NameEnvironmentModel from "../EnvironmentModels/_components/name-environment-model/NameEnvironmentModel";
import ErrorSnackbar from "../../components/ErrorSnackbar/ErrorSnackbar";
import {useEffect, useState} from "react";
import "./Departments.css";
import {getAllDepartment, getAllDepartmentByUserDepartments} from "../../services/drkb-main/DepartmentService";
import NameDepartment from "./_components/NameDepartment/NameDepartment";
import NameCourse from "../Courses/_components/NameCourse/NameCourse";
import CommonTemplate1 from "../../components/CommonTemplate1/CommonTemplate1";
import {getUserDepartments, getUserRoles} from "../../utils/authHelper";
import {USER_RIGHTS} from "../../constants/userRoles";

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addedNewDepartment, setAddedNewDepartment] = useState(false);
    useEffect(() => {
        const userDepartments = getUserDepartments();
        const fetchDepartments = async () => {
            const result = await getAllDepartmentByUserDepartments(userDepartments);
            if (result.success) {
                setDepartments(result.data);
            } else {
                setError(result.errorMessage);
                console.error(result.errorMessage);
            }
            setLoading(false);
            setAddedNewDepartment(false);
        }

        fetchDepartments();
    }, [addedNewDepartment]);

    useEffect(() => {
        console.log(departments);
    }, [departments]);

    return(
        <CommonTemplate1
            title="Список отделений"
            data={departments}
            isLoading={isLoading}
            error={error}
            renderItem={(department) => <NameDepartment key={department.id} title={department.name} departmentId={department.id} />}
        />
    );
}

export default Departments;