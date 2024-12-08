import React from 'react'
import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import NavbarStoreKeeper from "./components/UI/Navbar/NavbarStoreKeeper";
import AppRouter from "./components/AppRouter";
import NavbarManager from "./components/UI/Navbar/NavbarManager";
import NavbarAnalysis from "./components/UI/Navbar/NavbarAnalysis";

function App() {

    return (
        <BrowserRouter>
            <NavbarAnalysis/>
            <div className="main">
                <div className="main-content">
                    <AppRouter/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
