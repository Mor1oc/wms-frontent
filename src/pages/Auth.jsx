import React from 'react';

const Auth = () => {
    return (
        <div className="auth">
            <form action="">
                <h1>Авторизация</h1>
                <div>
                    <input type="text" placeholder="логин"/>
                    <input type="text" placeholder="пароль"/>
                </div>
                <button type="submit" className="btn status-btn">Авторизироваться</button>
            </form>
            <div className="registr-link">
            <a href="/registr">Регистрирация</a>
            </div>
        </div>
    );
};

export default Auth;