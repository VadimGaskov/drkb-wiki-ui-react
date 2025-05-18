import CommonModalWindow from "../../../../../../components/ModalWindow/CommonModalWindow";
import QuillTextEditor from "../QuillTextEditor";
import {Button, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import "./ShowInstructionModal.css";
import QuillEditor from "../../../../../../components/QuillEditor/QuillEditor";
import {EnvironmentModelContext} from "../../../../../../context/EnvironmentModelContext";
import {
    getEnvironmentModelById,
    SaveShortInstruction
} from "../../../../../../services/drkb-wiki/EnvironmentModelService";
import ErrorSnackbar from "../../../../../../components/ErrorSnackbar/ErrorSnackbar";
import SuccessSnackbar from "../../../../../../components/SuccessSnackbar/SuccessSnackbar";
import ProgressBar from "../../../../../../components/ProgressBar/ProgressBar";

//TODO ВОЗМОЖНО ПЕРЕДЕЛАТЬ
const ShowInstructionModal = ({open, onClose}) => {
    const [scroll, setScroll] = useState('paper');
    const [shortInstruction, setShortInstruction] = useState(null);
    const [defaultShortInstruction, setdefaultShortInstruction] = useState(null);

    const environmentModel = useContext(EnvironmentModelContext);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        if(!environmentModel) return;
        /*const getCurrentShortInstruction = async (id) => {
            const result = await getEnvironmentModelById(environmentModel.id);
            console.log("начало ");
            //TODO доделать обработку ошибок
            if (result.success) {
                setValue(result.data);
                console.log(result.data);
            }
            else {
                setError(result.errorMessage);
            }
            setLoading(false);
        }

        getCurrentShortInstruction(environmentModel.id);*/
        setdefaultShortInstruction(environmentModel.shortInstruction);
        setLoading(false);
    }, [environmentModel]);

    useEffect(() => {
        console.log(shortInstruction);
    }, [shortInstruction]);

    const saveShortInstruction = async () => {
        const result = await SaveShortInstruction(environmentModel.id, shortInstruction);
        if (result.success) {
            console.log("УСПЕХ");
            setSuccessMessage("Сохранение инструкции прошло успешно!");
        }
        else {
            console.log("ОШИБКА");
            setError(result.errorMessage);
        }
    }

    const handleClose = () => {
        setShortInstruction(defaultShortInstruction);
        onClose();
    }

    return(
        <CommonModalWindow isOpen={open} onClose={onClose} maxWidth={"false"}>
            {isLoading && (
                <ProgressBar/>
            )}
            {!isLoading && (
                <>
                    <DialogTitle id="scroll-dialog-title">
                        <div className={"instruction-modal-title-wrapper"}>
                            <span className={"instruction-modal-title"}>Редактирование инструкции</span>
                            <Button variant={"outlined"} className={"close-modal-btn"} color={"info"} onClick={onClose}>X</Button>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'} sx={{padding: "0px"}}>
                        {/*<QuillTextEditor />*/}
                        {!isLoading && (
                            <QuillEditor value={defaultShortInstruction} setValue={setShortInstruction} setError={setError}/>
                        )}
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} variant={"contained"} color={"error"}>Закрыть</Button>
                        <Button variant={"contained"} color={"error"} onClick={saveShortInstruction}>Сохранить</Button>
                    </DialogActions>
                </>
            )}
            <ErrorSnackbar errorMessage={error} onClose={() => setError(null)}/>
            <SuccessSnackbar message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </CommonModalWindow>
    )
}

export default ShowInstructionModal;