import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const NavbarStoreKeeper = ({onLogout}) => {
    const navigate = useNavigate();
    return (
        <header>
            <div>
                <div className="header-item">
                    <div className="text white">Кладовщик</div>
                </div>
                <div className="header-item navi-btn">
                    <div>
                        <div className="menu-item white">
                            <Link to="/stock-keeper">Просмотр запасов</Link>
                        </div>
                    </div>
                    <div>
                        <div className="menu-item white">
                            <Link to="/supplies">Поставки и отгрузки</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-item exit-btn">
                <div>
                    <div className="btn" onClick={() => {
                        onLogout()
                        navigate('/login')
                    }}>Выйти из аккаунта</div>
                </div>
            </div>
        </header>
    )
};

export default NavbarStoreKeeper;