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

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                setIsAuthenticated(true);
                setUserRoles(decoded.roles || []); // Предполагается, что "roles" — массив
            } else {
                setIsAuthenticated(false);
                setUserRoles([]);
            }
        } catch (error) {
            console.error('Ошибка декодирования токена:', error);
            setIsAuthenticated(false);
            setUserRoles([]);
        }
    }, []);

    const renderNavbar = () => {
        if (!isAuthenticated) return null;
        if (userRoles.includes('ROLE_Аналитик')) return <NavbarAnalysis setIsAuthenticated={setIsAuthenticated}/>;
        if (userRoles.includes('ROLE_Менеджер')) return <NavbarManager setIsAuthenticated={setIsAuthenticated}/>;
        if (userRoles.includes('ROLE_Кладовщик')) return <NavbarStoreKeeper setIsAuthenticated={setIsAuthenticated}/>;
        return null;
    };

    return (
        <BrowserRouter>
            {renderNavbar()}
            <div className="main">
                <div className="main-content">
                    <AppRouter setIsAuthenticated={setIsAuthenticated} />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
