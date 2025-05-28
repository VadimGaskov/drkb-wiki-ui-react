import {useEffect, useState} from "react";
import {createEnvironment} from "../../../../../../services/drkb-wiki/EnvironmentService";
import CommonModalWindow from "../../../../../../components/ModalWindow/CommonModalWindow";
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
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import ErrorSnackbar from "../../../../../../components/ErrorSnackbar/ErrorSnackbar";
import SuccessSnackbar from "../../../../../../components/SuccessSnackbar/SuccessSnackbar";
import QuillEditor from "../../../../../../components/QuillEditor/QuillEditor";
import {createEnvironmentModel} from "../../../../../../services/drkb-wiki/EnvironmentModelService";

const CreateEnvironmentModelModal = ({open, onClose, setRefreshKey}) => {
    const [createEnvironmentModelData, setCreateEnvironmentModelData] = useState({
        name: "",
        brandName: "",
        description: "",
        shortInstruction: ""
    });

    const [successCreateMessage, setSuccessCreateMessage] = useState(null);
    const [errorCreateMessage, setErrorCreateMessage] = useState(null);
    const handleSaveEnvironment = async () => {
        const result = await createEnvironmentModel(createEnvironmentModelData);
        if (result.success) {
            setSuccessCreateMessage(`Оборудование было успешно создано!`);
            setRefreshKey();
            setTimeout(() => {
                onClose();
            }, [3000])
        }
        else {
            setErrorCreateMessage(`Не удалось создать оборудование: ${result.errorMessage}`)
        }
    }

    useEffect(() => {
        console.log(createEnvironmentModelData);
    }, [createEnvironmentModelData]);

    return(
        <CommonModalWindow isOpen={open} onClose={onClose} maxWidth={"lg"}>
            <DialogTitle>Создание оборудование</DialogTitle>

            <div className={"create-article-wrapper"}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveEnvironment();
                }}>
                    <div className={"create-course-inputs-wrapper"}>
                        <label htmlFor={"title"} className={"create-course-input-title"}>Название</label>
                        <input
                            className={"admin-input"}
                            type="text"
                            name="title"
                            onChange={(e) => setCreateEnvironmentModelData(prevState => ({...prevState, name: e.target.value}))}
                            value={createEnvironmentModelData.name}
                            required
                        />

                        <label htmlFor={"description"} className={"create-course-input-title"}>Брендовое название</label>
                        <input
                            className={"admin-input"}
                            type="text"
                            name="description"
                            onChange={(e) => setCreateEnvironmentModelData(prevState => ({...prevState, brandName: e.target.value}))}
                            value={createEnvironmentModelData.brandName}
                            required
                        />

                        <label htmlFor={"description"} className={"create-course-input-title"}>Описание</label>
                        <input
                            className={"admin-input"}
                            type="text"
                            name="description"
                            onChange={(e) => setCreateEnvironmentModelData(prevState => ({...prevState, description: e.target.value}))}
                            value={createEnvironmentModelData.description}
                            required
                        />
                    </div>

                    <div className="admin-article-editor">
                        <QuillEditor
                            value={"Краткая инструкция"}
                            setValue={(value) =>
                                setCreateEnvironmentModelData((prevState) => ({ ...prevState, shortInstruction: value }))
                            }
                        />
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

export default CreateEnvironmentModelModal;