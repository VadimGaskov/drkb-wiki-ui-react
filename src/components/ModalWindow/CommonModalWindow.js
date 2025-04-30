import {Dialog} from "@mui/material";
import {useState} from "react";

const CommonModalWindow = ({isOpen = false, fullWidth = true, maxWidth = "xl", onClose, children}) => {
    return(
        <Dialog
            open={isOpen}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            onClose={onClose}
        >
            {children}
        </Dialog>
    )
}

export default CommonModalWindow;