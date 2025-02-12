import "./Login.css";
import DrkbLogo from "../../assets/img/header/drkb-logo.png";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await signIn(login, password);
            if (result)
                navigate("/")
        } catch (error) {
            alert('Ошибка авторизации!');
        }
    }

    if (user !== null)
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
                            onChange={(e) => setLogin(e.target.value)}
                        />

                        <label htmlFor="user-password">Введите пароль:</label>
                        <input
                            type="password"
                            id="user-password"
                            className="auth-input"
                            placeholder="Пароль"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="submit" className="auth-submit-button">Войти</button>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default Login;