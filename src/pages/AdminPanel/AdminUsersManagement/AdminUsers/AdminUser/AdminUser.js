import useFetchObject from "../../../../../hooks/useFetchObject";
import {getUserById, updateUser} from "../../../../../services/drkb-main/UserService";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../../../../components/ErrorSnackbar/ErrorSnackbar";
import {dateConverter} from "../../../../../utils/dateConverter";
import {Checkbox, Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import SuccessSnackbar from "../../../../../components/SuccessSnackbar/SuccessSnackbar";
import {updateCourse} from "../../../../../services/drkb-wiki-education/CourseService";
import useFetch from "../../../../../hooks/useFetch";
import {getAllDepartment} from "../../../../../services/drkb-main/DepartmentService";
import {getAllPositions} from "../../../../../services/drkb-main/PositionsService";
import {getAllRights} from "../../../../../services/drkb-main/RigthsService";
import {getAllStatuses} from "../../../../../services/drkb-main/StatusService";

const AdminUser = () => {
    const { adminUserId} = useParams();
    const [user, isLoadingUser, errorUser] = useFetchObject(() => getUserById(adminUserId));
    const [departments, isLoadingDepartments, errorDepartments] = useFetch(() => getAllDepartment());
    const [positions, isLoadingPositions, errorPositions] = useFetch(() => getAllPositions());
    const [rights, isLoadingRights, errorRights] = useFetch(() => getAllRights());
    /*const [statuses, isLoadingStatuses, errorStatuses] = useFetch(()=>getAllStatuses())*/
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorSendMessage, setErrorSendMessage] = useState(null);
    const [updateUserModel, setUpdateUser] = useState({
        id: "",
        name : "",
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
    useEffect(() => {
        if (!user) return;

        setUpdateUser({
            id: user.id,
            name : user.name,
            surname: user.surname,
            lastName: user.lastName,
            status: user.status.id,
            login: user.login,
            email: user.email,
            departments: user.userDepartmentsDto.map(ud => ud.departmentDto.id),
            positions: user.userPositionsDto.map(up => up.positionDto.id),
            rights: user.userRightsDto.map(ur => ur.rightDto.id)
        });
    }, [user]);

    useEffect(() => {
        console.log(updateUserModel);
    }, [updateUserModel]);

    const handleSend = async () => {
        const result = await updateUser(updateUserModel);
        if (result.success) {
            setSuccessMessage("Сохранение пользователя прошло успешно!");
        }
        else {
            setErrorSendMessage("НЕ COURSE UPDATED SUCCESSFULY");
        }
    }

    const handleUpdatePositions = (e) => {
        setUpdateUser((prevState) => {
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
        setUpdateUser((prevState) => {
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
        setUpdateUser((prevState) => {
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
        <>
            {user && (
                <>
                    <div className="admin-course-wrapper">
                        {isLoadingUser && <ProgressBar />}
                        {errorUser && <ErrorSnackbar errorMessage={errorUser}/>}

                        {user && (
                            <>
                                <div className="course-info">
                                    <div className="form-group">
                                        <span>Имя</span>
                                        <input
                                            type="text"
                                            value={updateUserModel.name}
                                            onChange={(e) =>
                                                setUpdateUser((prevState) => ({
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
                                            value={updateUserModel.surname}
                                            onChange={(e) =>
                                                setUpdateUser((prevState) => ({
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
                                            value={updateUserModel.lastName}
                                            onChange={(e) =>
                                                setUpdateUser((prevState) => ({
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
                                            value={updateUserModel.login}
                                            onChange={(e) =>
                                                setUpdateUser((prevState) => ({
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
                                            value={updateUserModel.email}
                                            onChange={(e) =>
                                                setUpdateUser((prevState) => ({
                                                    ...prevState,
                                                    email: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                            </>


                        )}

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
                                                        checked={updateUserModel.positions.includes(position.id)}
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
                                                        checked={updateUserModel.departments.includes(department.id)}
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
                                                        checked={updateUserModel.rights.includes(right.id)}
                                                        color="primary"
                                                    />
                                                    <ListItemText primary={right.name} />
                                                </ListItemButton>
                                            ))}
                                    </List>
                                </Collapse>
                            </List>
                        </div>

                        <div className="button-wrapper">
                            <button type="button" onClick={handleSend}>
                                Отправить
                            </button>
                        </div>

                        <SuccessSnackbar message={successMessage} onClose={() => setSuccessMessage(null)} />
                        <ErrorSnackbar message={errorSendMessage} onClose={() => setErrorSendMessage(null)} />
                    </div>
                </>
            )}
        </>
    )
}

export default AdminUser;