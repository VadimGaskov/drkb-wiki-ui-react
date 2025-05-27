import "./AdminEnvironmentModel.css";
import useFetch from "../../../../../hooks/useFetch";
import {getEnvironmentModelById} from "../../../../../services/drkb-wiki/EnvironmentModelService";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../../../../components/ErrorSnackbar/ErrorSnackbar";
import {dateConverter} from "../../../../../utils/dateConverter";
import {Button, Checkbox, Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import SuccessSnackbar from "../../../../../components/SuccessSnackbar/SuccessSnackbar";
import QuillEditor from "../../../../../components/QuillEditor/QuillEditor";
import {updateCourse} from "../../../../../services/drkb-wiki-education/CourseService";
import {getAllDepartment} from "../../../../../services/drkb-main/DepartmentService";
import CreateEnvironmentModal from "../../_components/CreateEnvironmentModal/CreateEnvironmentModal";

const AdminEnvironmentModel = () => {
    const {adminEnvironmentModelId} = useParams();
    const [environmentModel, isLoadingEnvironmentModel, errorEnvironmentModel] = useFetch(() => getEnvironmentModelById(adminEnvironmentModelId));
    const [departments, isLoadingDepartments, errorDepartments] = useFetch(() => getAllDepartment());
    useEffect(() => {
        console.log(environmentModel);
    }, [environmentModel]);

    const [updateEnvironmentModelModel, setUpdateEnvironmentModelModel] = useState({
        id: '',
        name: '',
        brandName: '',
        description: '',
        shortInstruction: '',
    })

    const [openArticles, setIsOpenArticles] = useState(false);
    const [openEnvironments, setIsOpenEnvironments] = useState(true);
    const [successMessage, setSuccessMessage] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        if(!environmentModel) {
            return;
        }

        setUpdateEnvironmentModelModel((prevState => {
            return {
                ...prevState,
                id: environmentModel.id,
                name: environmentModel.name,
                brandName: environmentModel.brandName,
                description: environmentModel.description,
                shortInstruction: environmentModel.shortInstruction
            }
        }))

    }, [environmentModel]);

    const handleSend = async () => {
        const result = await updateCourse(updateEnvironmentModelModel);
        console.log(result);
        if (result.success) {
            setSuccessMessage("Сохранение курса прошло успешно!");
        }
        else {
            console.error("НЕ COURSE UPDATED SUCCESSFULY");
        }
    }

    return(
        <>
            <div className="admin-article-container">
                <span className="admin-article-header">Редактирование оборудования {environmentModel?.name}</span>
                <ErrorSnackbar errorMessage={errorEnvironmentModel} onClose={() => console.log("")} />
                <SuccessSnackbar message={successMessage} onClose={() => setSuccessMessage(null)}/>
                {isLoadingEnvironmentModel && <ProgressBar />}
                {environmentModel && (
                    <>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}>
                            <label htmlFor={"title"}>Название</label>
                            <input
                                type="text"
                                value={updateEnvironmentModelModel.name}
                                onChange={(e) =>
                                    setUpdateEnvironmentModelModel((prevState) => ({
                                        ...prevState,
                                        name: e.target.value,
                                    }))
                                }
                                className="admin-article-input"
                                placeholder="Название"
                                required
                            />
                            <label htmlFor={"date-deadline"}>Описание</label>
                            <input
                                type="text"
                                value={updateEnvironmentModelModel.description}
                                onChange={(e) =>
                                    setUpdateEnvironmentModelModel((prevState) => ({
                                        ...prevState,
                                        description: e.target.value,
                                    }))
                                }
                                className="admin-article-input"
                                placeholder="Описание"
                                required
                            />
                            <label htmlFor={"description"}>Брендовое название</label>
                            <input
                                type="text"
                                value={updateEnvironmentModelModel.brandName}
                                onChange={(e) =>
                                    setUpdateEnvironmentModelModel((prevState) => ({
                                        ...prevState,
                                        brandName: e.target.value,
                                    }))
                                }
                                className="admin-article-input"
                                placeholder="Брендовое название"
                                required
                            />
                            <label htmlFor={"content"}>Текст краткой инструкции</label>
                            <div className="admin-article-editor">
                                <QuillEditor
                                    value={environmentModel.shortInstruction}
                                    setValue={(value) => setUpdateEnvironmentModelModel(prevState => ({...prevState, shortInstruction: value}))} />
                            </div>
                            {environmentModel.environments && (
                                <div className={"admin-article-test-wrapper"}>
                                    <List>
                                        <div>
                                            <ListItemButton onClick={() => setIsOpenEnvironments(!openEnvironments)}>
                                                <ListItemText primary={"Оборудования"} />
                                                {openEnvironments ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>
                                            <Collapse in={openEnvironments} timeout="auto" unmountOnExit>
                                                <List component="div">
                                                    {environmentModel.environments.map((environment) => (
                                                        <ListItemButton key={environment.id} sx={{ pl: 4 }}>
                                                            <ListItemText
                                                                primary={`Инвентарный номер: ${environment.inventoryNumber}. Расположение: ${departments.find(x=>x.id === environment.departmentDeployment)?.name}`}
                                                            />
                                                        </ListItemButton>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        </div>
                                    </List>
                                </div>
                            )}
                            <Button variant={"contained"} onClick={() => setOpenModal(true)}>Создать оборудование</Button>
                            <Button variant={"contained"} type={"submit"} className={"admin-article-save-btn"}>Сохранить</Button>
                        </form>
                    </>
                )}
            </div>

            <CreateEnvironmentModal open={openModal} onClose={() => setOpenModal(false)} environmentModel={environmentModel} departments={departments}/>
        </>
    )
}

export default AdminEnvironmentModel;