import {useEffect, useState} from "react";
import useFetch from "../../../../../../hooks/useFetch";
import {getAllDepartment} from "../../../../../../services/drkb-main/DepartmentService";
import {getAllPositions} from "../../../../../../services/drkb-main/PositionsService";
import {getAllRights} from "../../../../../../services/drkb-main/RigthsService";
import ProgressBar from "../../../../../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../../../../../components/ErrorSnackbar/ErrorSnackbar";
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
import SuccessSnackbar from "../../../../../../components/SuccessSnackbar/SuccessSnackbar";
import {createUser} from "../../../../../../services/drkb-main/UserService";
import CommonModalWindow from "../../../../../../components/ModalWindow/CommonModalWindow";

const CreateUserModal = ({open, onClose}) => {
    const [departments, isLoadingDepartments, errorDepartments] = useFetch(() => getAllDepartment());
    const [positions, isLoadingPositions, errorPositions] = useFetch(() => getAllPositions());
    const [rights, isLoadingRights, errorRights] = useFetch(() => getAllRights());
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorSendMessage, setErrorSendMessage] = useState(null);
    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
        lastName: "",
        status: "",
        login: "",
        email: "",
        departments: [],
        positions: [],
        rights: []
    });

    const [openPositions, setIsOpenPositions] = useState(false);
    const [openDepartments, setOpenDepartments] = useState(false);
    const [openRights, setOpenRights] = useState(false);

    const handleSend = async () => {
        const result = await createUser(newUser);
        if (result.success) {
            setSuccessMessage("Пользователь успешно создан!");
            // Reset form after successful creation
            setNewUser({
                name: "",
                surname: "",
                lastName: "",
                login: "",
                email: "",
                departments: [],
                positions: [],
                rights: []
            });

            setTimeout(() => {
                onClose();
            }, [1000])

        } else {
            setErrorSendMessage(`Ошибка при создании пользователя: ${result.errorMessage}`);
        }
    }

    useEffect(() => {
        console.log(newUser);
    }, [newUser]);

    const handleUpdatePositions = (e) => {
        setNewUser((prevState) => {
            if(e.target.checked) {
                return {
                    ...prevState,
                    positions: [...prevState.positions, e.target.value]
                }
            }
            else {
                return {
                    ...prevState,
                    positions: [...prevState.positions.filter(id => id !== e.target.value)]
                }
            }
        })
    }

    const handleUpdateDepartments = (e) => {
        setNewUser((prevState) => {
            if(e.target.checked) {
                return {
                    ...prevState,
                    departments: [...prevState.departments, e.target.value]
                }
            }
            else {
                return {
                    ...prevState,
                    departments: [...prevState.departments.filter(id => id !== e.target.value)]
                }
            }
        })
    }

    const handleUpdateRights = (e) => {
        setNewUser((prevState) => {
            if(e.target.checked) {
                return {
                    ...prevState,
                    rights: [...prevState.rights, e.target.value]
                }
            }
            else {
                return {
                    ...prevState,
                    rights: [...prevState.rights.filter(id => id !== e.target.value)]
                }
            }
        })
    }

    return(
        <CommonModalWindow isOpen={open} onClose={onClose} maxWidth={"lg"}>
            <DialogTitle>Создание отделения</DialogTitle>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSend();
            }} >
                <div className="create-article-wrapper">
                    {(isLoadingDepartments || isLoadingPositions || isLoadingRights) && <ProgressBar />}
                    {(errorDepartments || errorPositions || errorRights) && <ErrorSnackbar errorMessage="Ошибка при загрузке данных"/>}

                    <div className="course-info">
                        <div className="form-group">
                            <span>Имя</span>
                            <input
                                type="text"
                                value={newUser.name}
                                onChange={(e) =>
                                    setNewUser((prevState) => ({
                                        ...prevState,
                                        name: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="form-group">
                            <span>Фамилия</span>
                            <input
                                type="text"
                                value={newUser.surname}
                                onChange={(e) =>
                                    setNewUser((prevState) => ({
                                        ...prevState,
                                        surname: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="form-group">
                            <span>Отчество</span>
                            <input
                                type="text"
                                value={newUser.lastName}
                                onChange={(e) =>
                                    setNewUser((prevState) => ({
                                        ...prevState,
                                        lastName: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="form-group">
                            <span>Логин</span>
                            <input
                                type="text"
                                value={newUser.login}
                                onChange={(e) =>
                                    setNewUser((prevState) => ({
                                        ...prevState,
                                        login: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="form-group">
                            <span>Email</span>
                            <input
                                type="text"
                                value={newUser.email}
                                onChange={(e) =>
                                    setNewUser((prevState) => ({
                                        ...prevState,
                                        email: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </div>

                    <div className="users-section">
                        <List>
                            <div>
                                <ListItemButton onClick={() => setIsOpenPositions(!openPositions)}>
                                    <ListItemText primary={"Должности"} />
                                    {openPositions ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>

                                <Collapse in={openPositions} timeout="auto" unmountOnExit>
                                    <List component="div">
                                        {positions.map((position) => (
                                            <ListItemButton key={position.id} sx={{ pl: 4 }}>
                                                <Checkbox
                                                    name="positions"
                                                    checked={newUser.positions.includes(position.id)}
                                                    onChange={handleUpdatePositions}
                                                    value={position.id}
                                                    color="primary"
                                                />
                                                <ListItemText primary={`${position.name}`} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                        </List>
                    </div>

                    <div className="articles-section">
                        <List>
                            <ListItemButton onClick={() => setOpenDepartments(!openDepartments)}>
                                <ListItemText primary={"Отделения"} />
                                {openDepartments ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openDepartments} timeout={"auto"} unmountOnExit sx={{zIndex: 0}}>
                                <List component="div" disablePadding>
                                    {departments &&
                                        departments.map((department) => (
                                            <ListItemButton key={department.id}>
                                                <Checkbox
                                                    value={department.id}
                                                    name="department"
                                                    onChange={handleUpdateDepartments}
                                                    checked={newUser.departments.includes(department.id)}
                                                    color="primary"
                                                />
                                                <ListItemText primary={department.name} />
                                            </ListItemButton>
                                        ))}
                                </List>
                            </Collapse>
                        </List>
                    </div>

                    <div className="articles-section">
                        <List>
                            <ListItemButton onClick={() => setOpenRights(!openRights)}>
                                <ListItemText primary={"Права в системе"} />
                                {openRights ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openRights} timeout={"auto"} unmountOnExit sx={{zIndex: 0}}>
                                <List component="div" disablePadding sx={{zIndex: 0}}>
                                    {rights &&
                                        rights.map((right) => (
                                            <ListItemButton key={right.id} sx={{zIndex: 0}}>
                                                <Checkbox
                                                    value={right.id}
                                                    name="right"
                                                    onChange={handleUpdateRights}
                                                    checked={newUser.rights.includes(right.id)}
                                                    color="primary"
                                                />
                                                <ListItemText primary={right.name} />
                                            </ListItemButton>
                                        ))}
                                </List>
                            </Collapse>
                        </List>
                    </div>

                    <SuccessSnackbar message={successMessage} onClose={() => setSuccessMessage(null)} />
                    <ErrorSnackbar message={errorSendMessage} onClose={() => setErrorSendMessage(null)} />
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
        </CommonModalWindow>


    )
}

export default CreateUserModal;