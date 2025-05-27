import {
    Button,
    Checkbox,
    Collapse,
    DialogActions,
    DialogTitle,
    List,
    ListItemButton,
    ListItemText
} from "@mui/material";
import QuillEditor from "../../../../../components/QuillEditor/QuillEditor";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import ErrorSnackbar from "../../../../../components/ErrorSnackbar/ErrorSnackbar";
import CommonModalWindow from "../../../../../components/ModalWindow/CommonModalWindow";
import {useEffect, useState} from "react";
import {createArticle} from "../../../../../services/drkb-wiki-education/ArticleService";
import {createEnvironment} from "../../../../../services/drkb-wiki/EnvironmentService";
import SuccessSnackbar from "../../../../../components/SuccessSnackbar/SuccessSnackbar";

const CreateEnvironmentModal = ({open, onClose, environmentModel, departments}) => {
    const [createEnvironmentModel, setCreateEnvironmentModel] = useState({
        environmentModelId: "",
        departmentDeployment: "",
        serialNumber: "",
        inventoryNumber: ""
    });

    useEffect(() => {
        if (!environmentModel) return;

        setCreateEnvironmentModel(prevState => ({
            ...prevState,
            environmentModelId: environmentModel.id
        }))

    }, [environmentModel]);

    const [openDepartments, setOpenDepartments] = useState(true);

    const [successCreateMessage, setSuccessCreateMessage] = useState(null);
    const [errorCreateMessage, setErrorCreateMessage] = useState(null);
    const handleSaveEnvironment = async () => {
        const result = await createEnvironment(createEnvironmentModel);
        if (result.success) {
            setSuccessCreateMessage(`Оборудование было успешно создано!`);
            setTimeout(() => {
                onClose();
            }, [3000])
        }
        else {
            setErrorCreateMessage(`Не удалось создать оборудование: ${result.errorMessage}`)
        }
    }

    useEffect(() => {
        console.log(createEnvironmentModel);
    }, [createEnvironmentModel]);

    return(
        <CommonModalWindow isOpen={open} onClose={onClose} maxWidth={"sm"}>
            <DialogTitle>Создание оборудование</DialogTitle>

            <div className={"create-article-wrapper"}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveEnvironment();
                }}>
                    <div className={"create-course-inputs-wrapper"}>
                        <label htmlFor={"title"} className={"create-course-input-title"}>Серийный номер</label>
                        <input
                            className={"admin-input"}
                            type="text"
                            name="title"
                            onChange={(e) => setCreateEnvironmentModel(prevState => ({...prevState, serialNumber: e.target.value}))}
                            value={createEnvironmentModel.serialNumber}
                            required
                        />

                        <label htmlFor={"description"} className={"create-course-input-title"}>Инвентарный номер</label>
                        <input
                            className={"admin-input"}
                            type="text"
                            name="description"
                            onChange={(e) => setCreateEnvironmentModel(prevState => ({...prevState, inventoryNumber: e.target.value}))}
                            value={createEnvironmentModel.inventoryNumber}
                            required
                        />
                    </div>
                    <div className={"admin-article-test-wrapper"}>
                        <List>
                            <ListItemButton onClick={() => setOpenDepartments(!openDepartments)} >
                                <ListItemText primary={"Отделение"} />
                                {openDepartments ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse in={openDepartments} timeout="auto" unmountOnExit >
                                <List component="div">
                                    {departments.map((department) => (
                                        <ListItemButton key={department.id} sx={{ pl: 4 }}>
                                            <Checkbox
                                                name="user"
                                                checked={createEnvironmentModel.departmentDeployment === department.id}
                                                onChange={(e) => setCreateEnvironmentModel(prevState => ({...prevState, departmentDeployment: e.target.value}))}
                                                value={department.id}
                                                color="primary"
                                            />
                                            <ListItemText primary={`${department.name}`} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        </List>
                    </div>

                    <DialogActions sx={{position: "sticky"}}>
                        <Button onClick={onClose} autoFocus color={"error"} variant={"contained"}>
                            Закрыть
                        </Button>
                        <Button autoFocus type={"submit"} variant={"contained"}>
                            Сохранить
                        </Button>
                    </DialogActions>
                </form>
            </div>

            <ErrorSnackbar errorMessage={errorCreateMessage} onClose={() => setErrorCreateMessage(null)} />
            <SuccessSnackbar message={successCreateMessage} onClose={() => setSuccessCreateMessage(null)}/>
        </CommonModalWindow>
    )
}

export default CreateEnvironmentModal;