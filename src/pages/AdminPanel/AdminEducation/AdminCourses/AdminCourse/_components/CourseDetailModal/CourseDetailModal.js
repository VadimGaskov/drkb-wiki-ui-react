import CommonModalWindow from "../../../../../../../components/ModalWindow/CommonModalWindow";
import {DialogTitle} from "@mui/material";

const CourseDetailModal = (open, onClose) => {
    return(
        <CommonModalWindow onClose={onClose} isOpen={open}>
            <DialogTitle>Подробная информация о курсе</DialogTitle>
        </CommonModalWindow>
    )
}