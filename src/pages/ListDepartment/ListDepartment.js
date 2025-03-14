import {getAllEnvironmentModels} from "../../services/drkb-wiki/EnvironmentModelService";
import Fox from "../../assets/img/foxes/list-environment-fox-min.svg";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import AddEnvironmentModelModal
    from "../list-environment-model/components/add-environment-model-modal/AddEnvironmentModelModal";
import NameEnvironmentModel from "../list-environment-model/components/name-environment-model/NameEnvironmentModel";
import ErrorSnackbar from "../../components/ErrorSnackbar/ErrorSnackbar";
import {useEffect, useState} from "react";
import "./ListDepartment.css";
import {getAllDepartment} from "../../services/drkb-main/DepartmentService";
import NameDepartment from "./components/NameDepartment/NameDepartment";

const ListDepartment = () => {
    const [departments, setDepartments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addedNewDepartment, setAddedNewDepartment] = useState(false);
    useEffect(() => {
        const fetchDepartments = async () => {
            const result = await getAllDepartment();
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

    return(
        <>
            <img src={Fox} alt="" className="list-environment-model-fox"/>
            <h2>Список отделений</h2>
            <div className="list-environment-model">

                {isLoading && <ProgressBar/>}

                {!isLoading && !error && (
                    <>
                        <ul>
                            {departments.map(department => (
                                <NameDepartment
                                    key={department.id}
                                    departmentId={department.id}
                                    title={department.name}
                                />
                            ))}
                        </ul>
                    </>
                )}
                <ErrorSnackbar
                    errorMessage={error}
                    autoHideDuration={6000}
                    /*onClose={() => setError(null)} // Optional: clear error after closing*/
                />
            </div>
        </>
    );
}

export default ListDepartment;