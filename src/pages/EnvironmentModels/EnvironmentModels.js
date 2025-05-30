import "./EnvironmentModels.css";
import NameEnvironmentModel from "./_components/name-environment-model/NameEnvironmentModel";
import {useContext, useEffect, useState} from "react";
import {
    getAllEnvironmentModels,
    getAllEnvironmentModelsByDepartment
} from "../../services/drkb-wiki/EnvironmentModelService";
import Fox from "../../assets/img/foxes/list-environment-fox-min.svg";
import AddEnvironmentModelModal from "./_components/add-environment-model-modal/AddEnvironmentModelModal";
import {CircularProgress, Snackbar} from "@mui/material";
import ErrorSnackbar from "../../components/ErrorSnackbar/ErrorSnackbar";
import {EnvironmentModelContext} from "../../context/EnvironmentModelContext";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTINGS} from "../../constants/Routings";
import NameDepartment from "../Departments/_components/NameDepartment/NameDepartment";
import CommonTemplate1 from "../../components/CommonTemplate1/CommonTemplate1";
import {getUserDepartments} from "../../utils/authHelper";
import {Outlet, useLocation} from "react-router-dom";

const EnvironmentModels = () => {
    const { user } = useContext(AuthContext);
    const [environmentModels, setEnvironmentModels] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addedNewEnvironment, setAddedNewEnvironment] = useState(false);
    const {departmentId} = useParams();
    const navigate = useNavigate();
    const userDepartments = getUserDepartments();

    useEffect(() => {
        console.log(userDepartments);
    }, [userDepartments]);

    const [isEnvironmentModelPath, setIsEnvModelPath] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        const fetchEnvironmentModels = async () => {
            console.log(departmentId);
            if (departmentId === ':departmentId') {
                console.log(userDepartments);
                navigate(`${ROUTINGS.LIST_ENVIRONMENT_MODEL(userDepartments[0])}`);
            }
            const result = await getAllEnvironmentModelsByDepartment(departmentId === null ? userDepartments[0] : departmentId);
            if (result.success) {
                setEnvironmentModels(result.data);
            }
            else {
                setError(result.errorMessage);
                console.error(result.errorMessage);
            }
            setLoading(false);
            setAddedNewEnvironment(false);
        }

        fetchEnvironmentModels();
    }, [addedNewEnvironment, user, departmentId, navigate, userDepartments]);

    useEffect(() => {
        console.log(userDepartments)
    }, [userDepartments]);

    useEffect(() => {
        if (id) {
            setIsEnvModelPath(true);
        }
        else {
            setIsEnvModelPath(false);
        }
    }, [id]);

    return(
        <>
            {isEnvironmentModelPath ? (<Outlet/>) : (
                <CommonTemplate1
                    title="Список оборудования"
                    data={environmentModels}
                    isLoading={isLoading}
                    error={error}
                    renderItem={(environmentModel => (
                        <NameEnvironmentModel
                            key={environmentModel.id}
                            id={environmentModel.id}
                            title={environmentModel.name}
                        />
                    ))}
                />
            )}
        </>

    )
}

export default EnvironmentModels;