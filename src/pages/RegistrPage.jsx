import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const RegistrPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Manager");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            username: username,
            password: password,
            role: {
                id: 0,
                role: role
            }
        };

        try {
            const response = await axios.post("http://localhost:8080/createnewuser", requestData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            navigate('/login');
            console.log("Ответ сервера:", response.data);
        } catch (error) {
            console.error("Ошибка регистрации:", error);
        }
    };

    return (
        <div className="auth">
            <form onSubmit={handleSubmit}>
                <h1>Регистрация</h1>
                <div>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Логин"
                    />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Пароль"
                    />
                </div>


                <div className="custom-select" style={{width: '100%'}}>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="manager">Менеджер</option>
                        <option value="storeKeeper">Кладовщик</option>
                        <option value="analyst">Аналитик</option>
                    </select>
                </div>

                <button type="submit" className="btn submit-btn">
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

export default RegistrPage;