import {API_URLS} from "../constants/ApiUrls";
import axios from "axios";
import {apiRequest} from "./ApiService";
export const login = async (login, password) => {
    const data = await apiRequest(`${API_URLS.AUTH}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({login: login, password: password}),
    });

    if (data) {
        if (data.token) {
            localStorage.setItem("user", JSON.stringify(data));
            return data;
        }
        else {
            console.error("Сервер не вернул токен");
        }
    }

    /*try {
        // Создаем объект данных для отправки
        const data = {
            login,
            password,
        };

        // Отправляем POST-запрос к серверу с помощью fetch
        const response = await fetch(API_URLS.AUTH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Указываем тип содержимого
            },
            body: JSON.stringify(data), // Преобразуем данные в JSON
        });

        // Проверяем, успешен ли ответ
        if (!response.ok) {
            const errorData = await response.json(); // Получаем детали ошибки
            throw new Error(errorData.message || 'Ошибка авторизации');
        }

        // Парсим JSON из ответа
        const responseData = await response.json();

        // Проверяем, что сервер вернул токен
        if (responseData.token) {
            localStorage.setItem('user', JSON.stringify(responseData)); // Сохраняем данные пользователя в localStorage
            return responseData; // Возвращаем данные пользователя
        }

        throw new Error('Токен не найден в ответе сервера');
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        throw error;
    }*/
}

export const logout = () => {
    localStorage.removeItem('user');
}

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return null;
}