import {jwtDecode} from "jwt-decode";
import {getUserRoles} from "../utils/authHelper";

export const USER_RIGHTS = {
    // Управление пользователями
    CREATE_USER: "Создание пользователей",
    EDIT_USER: "Редактирование пользователей",
    DELETE_USER: "Удаление пользователей",

    // Базовые права
    VIEW_ARTICLES: "Просмотр статей",
    TAKE_TESTS: "Прохождение тестов",

    // Права инженера МО
    ADD_DOCUMENTS: "Добавление документов",
    MANAGE_MAINTENANCE_LOGS: "Управление журналами техобслуживания",
    MANAGE_VERIFICATION_SCHEDULE: "Управление графиком поверки",

    // Права старшей медсестры
    CREATE_EQUIPMENT_INSTRUCTIONS: "Создание инструкций к оборудованию",
    MANAGE_TO1_LOG: "Управление журналом ТО1",
    MANAGE_TIME_LOG: "Ведение журнала учета времени"
}
