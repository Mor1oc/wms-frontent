import React, {useEffect, useState} from 'react'
import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import NavbarStoreKeeper from "./components/UI/Navbar/NavbarStoreKeeper";
import AppRouter from "./components/AppRouter";
import NavbarManager from "./components/UI/Navbar/NavbarManager";
import NavbarAnalysis from "./components/UI/Navbar/NavbarAnalysis";
import {jwtDecode} from "jwt-decode";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRoles, setUserRoles] = useState([]);

    const syncAuthFromToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const { roles = [] } = jwtDecode(token);
                setIsAuthenticated(true);
                setUserRoles(Array.isArray(roles) ? roles : []);
            } catch (e) {
                console.error('Невалидный токен:', e);
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setUserRoles([]);
            }
        } else {
            setIsAuthenticated(false);
            setUserRoles([]);
        }
    };

    // При монтировании и при изменении token в другой вкладке
    useEffect(() => {
        syncAuthFromToken();
        window.addEventListener('storage', syncAuthFromToken);
        return () => window.removeEventListener('storage', syncAuthFromToken);
    }, []);

    // Унифицированный выход
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        syncAuthFromToken();
    };


    // useEffect(() => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         if (token) {
    //             const decoded = jwtDecode(token);
    //             setIsAuthenticated(true);
    //             setUserRoles(decoded.roles || []); // Предполагается, что "roles" — массив
    //         } else {
    //             setIsAuthenticated(false);
    //             setUserRoles([]);
    //         }
    //     } catch (error) {
    //         console.error('Ошибка декодирования токена:', error);
    //         setIsAuthenticated(false);
    //         setUserRoles([]);
    //     }
    // }, []);

    const renderNavbar = () => {
        if (!isAuthenticated) return null;
        if (userRoles.includes('ROLE_Аналитик')) return <NavbarAnalysis onLogout={handleLogout}/>;
        if (userRoles.includes('ROLE_Менеджер')) return <NavbarManager onLogout={handleLogout}/>;
        if (userRoles.includes('ROLE_Кладовщик')) return <NavbarStoreKeeper onLogout={handleLogout}/>;
        return null;
    };

    const handleLoginSuccess = (token) => {
        localStorage.setItem('token', token);
        syncAuthFromToken();
    };

    return (
        <BrowserRouter>
            {renderNavbar()}
            <div className="main">
                <div className="main-content">
                    <AppRouter setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} onLoginSuccess={handleLoginSuccess} userRoles={userRoles}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
