import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import "./ModalWindow.css";
import {createDocument} from "../../services/drkb-wiki/CommonDocumentService";
import {Navigate, useNavigate} from "react-router-dom";

const ModalWindow = ({ title , environmentModelId}) => {
    const [open, setOpen] = useState(false);
    const [documentName, setDocumentName] = useState("");
    const [file, setFile] = useState(null);

    const navigate = useNavigate();
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleCreateDocument = async () => {
        const result = await createDocument({documentName, file, environmentModelId});
        console.log(result);
        if (result.success) {
            window.location.reload();
        }
        else {
            alert("ОШИБКА!!!!");
        }
    }

    return (
        <div className="modal-window-container">
            <Button variant="contained" onClick={() => setOpen(true)}>
                {title}
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Typography className="modal-window-content-container">
                            <label htmlFor="document-name">Введите название документа</label>
                            <input
                                id="document-name"
                                className="modal-input"
                                type="text"
                                placeholder="Введите название"
                                value={documentName}
                                onChange={(e) => setDocumentName(e.target.value)}
                            />

                        <div className="file-upload-container">
                            <input
                                type="file"
                                id="file-input"
                                className="hidden-input"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="file-input" className="custom-file-button">
                                Выбрать файл
                            </label>
                            {file && <span className="file-name">{file.name}</span>}
                        </div>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setOpen(false)} color="error">
                        Закрыть
                    </Button>
                    <Button variant="contained" onClick={handleCreateDocument} color="primary">
                        Загрузить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModalWindow;
