import {createContext, useEffect, useState} from "react";
import {login, logout} from "../services/AuthService";
import {jwtDecode} from "jwt-decode";
import {clearToken, getToken, getUserFromToken} from "../utils/authHelper";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUserFromToken())

    useEffect(() => {
        const token = getToken();
        if(token) {
            setUser(getUserFromToken())
        }
    }, []);

    const signIn = async (userLogin, password) => {
        const result = await login(userLogin, password);
        if (result.success && result.data.token) {
            localStorage.setItem("token", JSON.stringify(result.data.token));
            //TODO УБРАТЬ
            localStorage.setItem("decodedToken", JSON.stringify(jwtDecode(result.data.token)));
            setUser(getUserFromToken());

        }

        return result;
    }

    const signOut = () => {
        logout();
        clearToken();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}