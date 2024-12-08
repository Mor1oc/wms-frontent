import React from 'react';
import {Link} from "react-router-dom";

const NavbarAnalysis = () => {
    return (
        <header>
            <div>
                <div className="header-item">
                    <div className="text white">Аналитик</div>
                </div>
                <div className="header-item navi-btn">
                    <div>
                        <div className="menu-item white">
                            <Link to="/stock-keeper">Просмотр запасов</Link>
                        </div>
                    </div>
                    <div>
                        <div className="menu-item white">
                            <Link to="/analysstock">Анализ запасов</Link>
                        </div>
                    </div>
                    <div>
                        <div className="menu-item white">
                            <Link to="/analysdemand">Прогнозировтние спроса</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-item exit-btn">
                <div>
                    <div className="btn">Выйти из аккаунта</div>
                </div>
            </div>
        </header>
    );
};

export default NavbarAnalysis;