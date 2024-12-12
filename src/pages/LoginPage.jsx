import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const LoginPage = ({setIsAuthenticated}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        const user = {
            username: username,
            password: password,
        };
        const response = await axios.post('http://localhost:8080/login', user).then(response => {
            const token = response.data;
            localStorage.setItem('token', token);
            setError('');
            setIsAuthenticated(true);
            const {roles} = jwtDecode(token);
            roles.includes('ROLE_Кладовщик') ? navigate('/stock-keeper') : navigate('/stock');
        })
            .catch(error => {
                console.error('Error:', error.response || error.message);
            });
    };
    return (
        <div className="auth">
            <form onSubmit={handleLogin}>
                <h1>Авторизация</h1>
                <div>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Логин"
                    /><input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Пароль"
                />
                </div>
                {error && <p style={{color: 'red', fontSize: '28px'}}>{error}</p>}
                <button type="submit" className="btn status-btn">Авторизироваться</button>
            </form>
            <div className="registr-link">
                <a href="/registr">Регистрирация</a>
            </div>
        </div>
    );
};

export default LoginPage;