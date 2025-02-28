import {createContext, useState} from "react";
import {getCurrentUser, login, logout} from "../services/AuthService";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getCurrentUser())
    const signIn = async (userLogin, password) => {
        const result = await login(userLogin, password);
        if (result.success) {
            if (result.data.token) {
                localStorage.setItem("user", JSON.stringify(result.data));
                setUser(result.data);
            }
        }

        return result;





        /*setUser(userData);
        if (userData)
            return userData;
        else
            return null;*/
    }

    const signOut = () => {
        logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}