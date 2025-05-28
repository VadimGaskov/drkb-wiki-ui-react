import useFetch from "../../../../../../hooks/useFetch";
import {getAllTest} from "../../../../../../services/drkb-wiki-education/TestService";
import {createArticle} from "../../../../../../services/drkb-wiki-education/ArticleService";
import CommonModalWindow from "../../../../../../components/ModalWindow/CommonModalWindow";
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
import QuillEditor from "../../../../../../components/QuillEditor/QuillEditor";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import ErrorSnackbar from "../../../../../../components/ErrorSnackbar/ErrorSnackbar";
import {useEffect, useState} from "react";
import {getAllUsers} from "../../../../../../services/drkb-main/UserService";
import {createDepartment} from "../../../../../../services/drkb-main/DepartmentService";

const CreateDepartmentModal = ({open, onClose}) => {
    const [users, isLoadingUsers, errorUsers] = useFetch(()=> getAllUsers());
    const [createDepartmentData, setCreateDepartmentData] = useState({
        name: '',
        users: [],
    });

    const [openUsers, setIsOpenUsers] = useState(false);

    const handleSaveDepartment = async () => {
        const response = await createDepartment(createDepartmentData);
        if (response.ok) {
            console.log("ВСЕ ОК СОЗДАЛСЯ СТАТЬЯ")
        }
        else {
            console.error("НЕ СОЗДАЛСЯ СТАТЬЯ");
        }
    }

    const handleUserIdsChange = (e) => {
        setCreateDepartmentData((prevState) => {
            if(e.target.checked) {
                return {
                    ...prevState,
                    users: [...prevState.users, e.target.value]
                };
            }
            else {
                return {
                    ...prevState,
                    users: prevState.users.filter(id => id !== e.target.value)
                };
            }
        })
    }

    useEffect(() => {
        console.log(createDepartmentData);
    }, [createDepartmentData]);

    return(
        <CommonModalWindow isOpen={open} onClose={onClose} maxWidth={"sm"}>
            <DialogTitle>Создание отделения</DialogTitle>

            <div className={"create-article-wrapper"}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveDepartment();
                }}>
                    <div className={"create-course-inputs-wrapper"}>
                        <label htmlFor={"title"} className={"create-course-input-title"}>Название отделения</label>
                        <input
                            className={"admin-input"}
                            type="text"
                            name="title"
                            onChange={(e) => setCreateDepartmentData(prevState => ({...prevState, name: e.target.value}))}
                            value={createDepartmentData.name}
                            required
                        />
                    </div>
                    <div className={"admin-article-test-wrapper"}>
                        <List>
                            <ListItemButton onClick={() => setIsOpenUsers(!openUsers)} >
                                <ListItemText primary={"Пользователи"} />
                                {openUsers ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse in={openUsers} timeout="auto" unmountOnExit >
                                <List component="div">
                                    {users.map((user) => (
                                        <ListItemButton key={user.id} sx={{ pl: 4 }}>
                                            <Checkbox
                                                name="user"
                                                checked={createDepartmentData.users.includes(user.id)}
                                                onChange={handleUserIdsChange}
                                                value={user.id}
                                                color="primary"
                                            />
                                            <ListItemText primary={`${user.name} ${user.surname}`} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        </List>
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
            </div>

            <ErrorSnackbar errorMessage={errorUsers} />
        </CommonModalWindow>
    )
}

export default CreateDepartmentModal;