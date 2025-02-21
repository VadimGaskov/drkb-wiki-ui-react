import {createContext, useState} from "react";
import {getCurrentUser, login, logout} from "../services/AuthService";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getCurrentUser())
    console.log("Декодированный токен " );
    console.log(jwtDecode(user.token.toString()));
    const signIn = async (userLogin, password) => {
        const userData = await login(userLogin, password);
        setUser(userData);
        if (userData)
            return userData;
        else
            return null;
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