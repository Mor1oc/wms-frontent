import React from 'react'
import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import NavbarStoreKeeper from "./components/UI/Navbar/NavbarStoreKeeper";
import AppRouter from "./components/AppRouter";
import NavbarManager from "./components/UI/Navbar/NavbarManager";

function App() {

    return (
        <BrowserRouter>
            <NavbarManager/>
            <div className="main">
                <div className="main-content">
                    <AppRouter/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
