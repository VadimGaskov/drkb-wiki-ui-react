import React, { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";

const ErrorSnackbar = ({
       errorMessage,
       controlledOpen = false,
       autoHideDuration = 6000,
       onClose
    }) => {
    const [openSnackbar, setOpenSnackbar] = useState(controlledOpen);

    // Update open state when controlledOpen or errorMessage changes
    useEffect(() => {
        if (errorMessage || controlledOpen) {
            setOpenSnackbar(true);
        }
    }, [errorMessage, controlledOpen]);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        if (onClose) {
            onClose(); // Call parent callback if provided
        }
    };

    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={autoHideDuration}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={handleCloseSnackbar}
                severity="error"
                sx={{ width: '100%' }}
            >
                {errorMessage || "Произошла ошибка при загрузке данных"}
            </Alert>
        </Snackbar>
    );
};

export default ErrorSnackbar;