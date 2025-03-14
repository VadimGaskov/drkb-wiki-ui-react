import "./ListEnvironmentModel.css";
import NameEnvironmentModel from "./components/name-environment-model/NameEnvironmentModel";
import {useContext, useEffect, useState} from "react";
import {
    getAllEnvironmentModels,
    getAllEnvironmentModelsByDepartment
} from "../../services/drkb-wiki/EnvironmentModelService";
import Fox from "../../assets/img/foxes/list-environment-fox-min.svg";
import AddEnvironmentModelModal from "./components/add-environment-model-modal/AddEnvironmentModelModal";
import {CircularProgress, Snackbar} from "@mui/material";
import ErrorSnackbar from "../../components/ErrorSnackbar/ErrorSnackbar";
import {EnvironmentModelContext} from "../../context/EnvironmentModelContext";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTINGS} from "../../constants/Routings";

const ListEnvironmentModel = () => {
    const { user } = useContext(AuthContext);
    const [environmentModels, setEnvironmentModels] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addedNewEnvironment, setAddedNewEnvironment] = useState(false);
    const {departmentId} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchEnvironmentModels = async () => {
            if (departmentId === ':departmentId') {
                navigate(`${ROUTINGS.LIST_ENVIRONMENT_MODEL(user.user.departments[0].id)}`);
            }
            const result = await getAllEnvironmentModelsByDepartment(departmentId === null ? user.user.departments[0].id : departmentId);
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
    }, [addedNewEnvironment, user, departmentId, navigate]);

    return(
        <>
            <img src={Fox} alt="" className="list-environment-model-fox"/>
            <h2>Список оборудования</h2>
            <div className="list-environment-model">

                {isLoading && <ProgressBar/>}

                {!isLoading && !error && (
                    <>
                        <AddEnvironmentModelModal
                            title={"Добавить оборудование"}
                            environmentModelId={""}
                            onSuccess={() => setAddedNewEnvironment(true)}
                            /*onFailure={(errorMessage) => setError(errorMessage)}*/
                        />
                        <ul>
                            {environmentModels.map(environmentModel => (
                                <NameEnvironmentModel
                                    key={environmentModel.id}
                                    id={environmentModel.id}
                                    title={environmentModel.name}
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

export default ListEnvironmentModel;