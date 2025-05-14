import { jwtDecode } from "jwt-decode";

export const getToken = () => {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
};

export const getUserFromToken = () => {
    const token = getToken();
    if (token) {
        try {
            return jwtDecode(token);
        } catch (e) {
            console.error("Ошибка декодирования токена:", e);
            return null;
        }
    }
    return null;
};

export const clearToken = () => {
    localStorage.removeItem("token");
};

export const getUserRoles = () => {
    const user = getUserFromToken();
    return user?.roles || []; // предполагаем, что в токене поле roles
};

export const getUserDepartments = () => {
    const user = getUserFromToken();
    console.log("USER DEPARTMENTS")
    console.log(user.departments);
    return user?.departments || []; // предполагаем, что в токене есть departments
};

export const hasRight = (requiredRight) => {
    const roles = getUserRoles();
    if (roles.length === 0 && getUserFromToken() === null) {
        return null;
    }

    return roles.includes(requiredRight);
}