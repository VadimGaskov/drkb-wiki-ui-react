import {useParams} from "react-router-dom";
import useFetchObject from "../../../../../hooks/useFetchObject";
import {
    getDepartmentById,
    getDepartmentWithUsers,
    updateDepartment
} from "../../../../../services/drkb-main/DepartmentService";
import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../../../../components/ErrorSnackbar/ErrorSnackbar";
import React, {useEffect, useState} from "react";
import {dateConverter} from "../../../../../utils/dateConverter";
import {Checkbox, Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import SuccessSnackbar from "../../../../../components/SuccessSnackbar/SuccessSnackbar";
import {updateCourse} from "../../../../../services/drkb-wiki-education/CourseService";
import useFetch from "../../../../../hooks/useFetch";
import {getAllUsers} from "../../../../../services/drkb-main/UserService";

const AdminDepartment = () => {
    const params = useParams();
    const adminDepartmentId = params.adminDepartmentId;

    const [department, isLoadingDepartment, departmentError, setErrorDepartment] = useFetchObject(() => getDepartmentWithUsers(adminDepartmentId));
    const [users, isLoadingUsers, usersError] = useFetch(() => getAllUsers());
    const [updateDepartmentModel, setUpdateDepartmentModel] = useState({
        id: "",
        name: "",
        users: [],
    });
    const [openDepartments, setOpenDepartments] = useState({});

    const [successMessage, setSuccessMessage] = useState(null);
    const toggleDepartment = (id) => {
        setOpenDepartments((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };
    useEffect(() => {
        if (!department) return;

        setUpdateDepartmentModel(prevState => ({
            id: department.id,
            name: department.name,
            users: department.users.map(user => user.id)
        }))

    }, [department]);

    useEffect(() => {
        console.log(department);
    }, [department]);

    useEffect(() => {
        console.log(updateDepartmentModel);
    }, [updateDepartmentModel]);

    const handleSend = async () => {
        const result = await updateDepartment(updateDepartmentModel);
        if (result.success) {
            setSuccessMessage("Сохранение отделения прошло успешно!");
        }
        else {
            console.error("НЕ DEPARTMENT UPDATED SUCCESSFULY");
        }
    }

    const handleUpdateUsers = (e) => {
        setUpdateDepartmentModel((prevState) => {
            if(e.target.checked) {
                return {
                    ...prevState,
                    users: [...prevState.users, e.target.value]
                }
            }
            else {
                return {
                    ...prevState,
                    users: [...prevState.users.filter(id => id !== e.target.value)]
                }
            }
        })
    }

    return(
        <>
            <div className="admin-course-wrapper">
                {isLoadingDepartment && <ProgressBar />}
                {department && (
                    <>
                        <div className="course-info">
                            <div className="form-group">
                                <span>Название</span>
                                <input
                                    type="text"
                                    value={updateDepartmentModel.name}
                                    onChange={(e) =>
                                        setUpdateDepartmentModel((prevState) => ({
                                            ...prevState,
                                            name: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="users-section">
                            <List>
                                <div>
                                    <ListItemButton onClick={() => toggleDepartment(department.id)}>
                                        <ListItemText primary={"Пользователи"} />
                                        {openDepartments[department.id] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>

                                    <Collapse in={openDepartments[department.id]} timeout="auto" unmountOnExit>
                                        <List component="div">
                                            {users.map((user) => (
                                                <ListItemButton key={user.id} sx={{ pl: 4 }}>
                                                    <Checkbox
                                                        name="user"
                                                        checked={updateDepartmentModel.users.includes(user.id)}
                                                        onChange={handleUpdateUsers}
                                                        value={user.id}
                                                        color="primary"
                                                    />
                                                    <ListItemText primary={`${user.name} ${user.surname}`} />
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                </div>
                            </List>
                        </div>

                        <div className="button-wrapper">
                            <button type="button" onClick={handleSend}>
                                Отправить
                            </button>
                        </div>
                    </>
                )}
                {departmentError && <ErrorSnackbar errorMessage={departmentError} onClose={()=>setErrorDepartment(null)} />}


                <SuccessSnackbar message={successMessage} onClose={() => setSuccessMessage(null)} />
            </div>
        </>
    )
}

export default AdminDepartment;