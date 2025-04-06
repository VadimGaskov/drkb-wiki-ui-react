import {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";
import {getUserRoles} from "../services/AuthService";

export const USER_RIGHTS = {
    CREATE_USER: "Создание пользователей",
    EDIT_USER: "Редактирование пользователей",
    DELETE_USER: "Удаление пользователей"
}

export const hasRight = (requiredRight) => {
    const rights = getUserRoles();
    if (rights === null || rights === undefined)  {
        return null;
    }
    return rights.includes(requiredRight);
}