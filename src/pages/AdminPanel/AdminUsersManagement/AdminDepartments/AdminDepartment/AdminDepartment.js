import {useParams} from "react-router-dom";
import useFetchObject from "../../../../../hooks/useFetchObject";
import {getDepartmentById} from "../../../../../services/drkb-main/DepartmentService";

const AdminDepartment = () => {
    const params = useParams();
    const adminDepartmentId = params.adminDepartmentId;

    const [department, isLoadingDepartment, departmentError, setErrorDepartment] = useFetchObject(() => getDepartmentById(adminDepartmentId));

    return(
        <>
            {department && (
                <>
                    {department.name}
                </>
            )}
        </>
    )
}

export default AdminDepartment;