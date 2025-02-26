import React, {useEffect, useState} from "react";
import {Alert, Snackbar} from "@mui/material";

const SuccessSnackbar = ({
                             message,
                             controlledOpen = false,
                             autoHideDuration = 3000,
                             onClose}) => {
    const [openSnackbar, setOpenSnackbar] = useState(controlledOpen);

    useEffect(() => {
        if (message || controlledOpen) {
            setOpenSnackbar(true);
        }
    }, [message, controlledOpen]);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        if (onClose) {
            onClose(); // Call parent callback if provided
        }
    }

    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={autoHideDuration}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                onClose={handleCloseSnackbar}
                severity="success"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SuccessSnackbar;