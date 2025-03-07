import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {createDocument} from "../../../../services/drkb-wiki/CommonDocumentService";
import {useEffect, useState} from "react";
import {getAllManufacturers} from "../../../../services/drkb-wiki/ManufacturerService";
import {getAllEnvironmentType} from "../../../../services/drkb-wiki/EnvironmentTypeService";
import {createEnvironmentModel} from "../../../../services/drkb-wiki/EnvironmentModelService";
import SuccessSnackbar from "../../../../components/SuccessSnackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../../components/ErrorSnackbar/ErrorSnackbar";

const AddEnvironmentModelModal = ({title, environmentModelId, onSuccess, onFailure}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [description, setDescription] = useState("");
    const [shortInstruction, setShortInstruction] = useState("");
    const [fullInstruction, setFullInstruction] = useState("");
    const [registrationSertificateNumber, setRegistrationSertificateNumber] = useState("");

    const [isLoadingManufacturers, setLoadingManufacturers] = useState(true);
    const [manufacturers, setManufacturers] = useState([]);
    const [isLoadingEnvironmentTypes, setLoadingEnvironmentTypes] = useState(true);
    const [environmentTypes, setEnvironmentTypes] = useState([]);

    const [selectedManufacturer, setSelectedManufacturer] = useState("");
    const [selectedEnvironmentType, setSelectedEnvironmentType] = useState("");

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const handleCreateEnvironmentModel = async () => {
        const newEnvironmentModel = {
            name,
            brandName,
            description,
            shortInstruction,
            fullInstruction,
            registrationSertificateNumber,
            manufacturerId: selectedManufacturer,
            environmentTypeId: selectedEnvironmentType
        }

        console.log(newEnvironmentModel);
        const result = await createEnvironmentModel(newEnvironmentModel);
        console.log(result);
        if (result.success) {
            if (onSuccess) {
                onSuccess();
                setSuccessMessage("Модель оборудования была успешно создана!");
            }
        }
        else {
            if (onFailure) {
                onFailure(result.errorMessage || "Ошибка добавления модели оборудования");
            }
            setErrorMessage( "Ошибка добавления модели оборудования");
            console.log(errorMessage);
        }
    }

    const handleSelectManufacturer = (event) => {
        setSelectedManufacturer(event.target.value);
    }

    const handleSelectEnvironmentType = (event) => {
        setSelectedEnvironmentType(event.target.value);
    }

    useEffect(() => {
        const fetchManufacturers = async () => {
            const result = await getAllManufacturers();
            if (result.success) {
                if (result.data.length > 0) {
                    setSelectedManufacturer(result.data[0].id);
                }
                setManufacturers(result.data);
                setLoadingManufacturers(false);
            }
            else {
                console.error(result.errorMessage);
                setLoadingManufacturers(false);
            }
        }

        const fetchEnvironmentTypes = async () => {
            const result = await getAllEnvironmentType();
            if (result.success) {
                if (result.data.length > 0) {
                    setSelectedEnvironmentType(result.data[0].id);
                }
                setEnvironmentTypes(result.data);
                setLoadingEnvironmentTypes(false);
            }
            else {
                console.error(result.errorMessage);
                setLoadingEnvironmentTypes(false);
            }
        }

        fetchManufacturers();
        fetchEnvironmentTypes();
    }, []);

    return (
        <div className="modal-window-container">
            {successMessage &&
                <SuccessSnackbar
                    message={successMessage}
                    onClose={() => setSuccessMessage(null)}
                />
            }
            {errorMessage &&
                <ErrorSnackbar
                    onClose={()=>setErrorMessage(null)}
                    errorMessage={errorMessage}
                />
            }
            <Button variant="contained" onClick={() => setOpen(true)}>
                {title}
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Typography className="modal-window-content-container">
                        <label htmlFor="name">Введите название оборудования</label>
                        <input
                            id="name"
                            className="modal-input"
                            type="text"
                            placeholder="Введите название"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label htmlFor="brand-name">Введите название бренда</label>
                        <input
                            id="brand-name"
                            className="modal-input"
                            type="text"
                            placeholder="Введите название бренда"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                        />

                        <label htmlFor="description">Введите описание</label>
                        <input
                            id="description"
                            className="modal-input"
                            type="text"
                            placeholder="Введите описание"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <label htmlFor="registration-sertificate-number">Введите номер регистрационного сертификата</label>
                        <input
                            id="registration-sertificate-number"
                            className="modal-input"
                            type="text"
                            placeholder="Введите номер регистрационного сертификата"
                            value={registrationSertificateNumber}
                            onChange={(e) => setRegistrationSertificateNumber(e.target.value)}
                        />

                        <label htmlFor="manufacturer-id">Выберите производителя</label>
                        <select id="manufacturer-id" value={selectedManufacturer || manufacturers[0]?.id} onChange={handleSelectManufacturer}>
                            {manufacturers.map(manufacturer =>
                                <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                            )}
                        </select>

                        <label htmlFor="environment-type">Выберите тип оборудования</label>
                        <select id="environment-type" value={selectedEnvironmentType || environmentTypes[0]?.id} onChange={handleSelectEnvironmentType}>
                            {environmentTypes.map(environmentType =>
                                <option key={environmentType.id} value={environmentType.id}>{environmentType.name}</option>
                            )}
                        </select>

                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setOpen(false)} color="error">
                        Закрыть
                    </Button>
                    <Button variant="contained" onClick={handleCreateEnvironmentModel} color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddEnvironmentModelModal;