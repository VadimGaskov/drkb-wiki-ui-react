import "./Login.css";
import DrkbLogo from "../../assets/img/header/drkb-logo.png";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";
import {ROUTINGS} from "../../constants/Routings";
const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isSuccessLogin, setSuccessLogin] = useState(false);
    const [error, setError] = useState({errorMessage: "", isActive: false});
    const { signIn } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        const result = await signIn(login, password);
        if (result.success) {
            setSuccessLogin(true);
            const timeout = setTimeout(() => {
                navigate(`${ROUTINGS.HOME}`)
            }, 1500);
        } else {
            setError({errorMessage: result.errorMessage, isActive: true});
        }
    }

    if (user)
        console.log(jwtDecode(user.token));

    return(
        <div className="logo-container">
            <header className="header-logo">
                <img src={DrkbLogo} alt="Логотип" className="logo-image" />
            </header>

            <main className="auth-container">
                <section className="auth-form-section">
                    <form id="auth-form" onSubmit={handleLogin}>
                        <label htmlFor="user-login">Введите логин:</label>
                        <input
                            type="text"
                            id="user-login"
                            className="auth-input"
                            placeholder="Логин"
                            required
                            onChange={(e) => {
                                setLogin(e.target.value);
                                setError({errorMessage: "", isActive: false});
                            }}
                        />

                        <label htmlFor="user-password">Введите пароль:</label>
                        <input
                            type="password"
                            id="user-password"
                            className="auth-input"
                            placeholder="Пароль"
                            required
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError({errorMessage: "", isActive: false});
                            }}
                        />

                        <button type="submit" className="auth-submit-button">Войти</button>
                    </form>
                </section>
                {isSuccessLogin ? <Alert variant="standard" severity="success" className="login-alert">
                    Вы успешно авторизовались.
                </Alert> : ""}
                {error.isActive ? <Alert severity="error" className="login-alert">{error.errorMessage}</Alert> : ""}
            </main>
        </div>

    );
}

export default Login;