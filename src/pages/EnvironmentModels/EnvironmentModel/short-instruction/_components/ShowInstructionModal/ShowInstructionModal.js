import CommonModalWindow from "../../../../../../components/ModalWindow/CommonModalWindow";
import QuillTextEditor from "../QuillTextEditor";
import {Button, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";

const ShowInstructionModal = ({open, onClose}) => {
    const [scroll, setScroll] = useState('paper');
    const [value, setValue] = useState(null);
    return(
        <CommonModalWindow isOpen={open} onClose={onClose} maxWidth={"false"}>
            <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
            <DialogContent dividers={scroll === 'paper'} sx={{padding: "0px"}}>
                <QuillTextEditor />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant={"contained"} color={"error"}>Закрыть</Button>
                <Button variant={"contained"} color={"error"}>Сохранить</Button>
            </DialogActions>
        </CommonModalWindow>
    )
}

export default ShowInstructionModal;