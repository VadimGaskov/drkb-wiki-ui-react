import {createContext, useState} from "react";
import {getCurrentUser, login, logout} from "../services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getCurrentUser())

    const signIn = async (userLogin, password) => {
        console.log("123123123123")
        const userData = await login(userLogin, password);
        setUser(userData);
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