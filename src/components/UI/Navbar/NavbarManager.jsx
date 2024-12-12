import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const NavbarStoreKeeper = ({setIsAuthenticated}) => {
    const navigate = useNavigate();
    return (
        <header>
            <div>
                <div className="header-item">
                    <div className="text white">Менеджер</div>
                </div>
                <div className="header-item navi-btn">
                    <div>
                        <div className="menu-item white">
                            <Link to="/stock">Просмотр запасов</Link>
                        </div>
                    </div>
                    <div>
                        <div className="menu-item white">
                            <Link to="/planning">Планирование заказов</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-item exit-btn">
                <div>
                    <div className="btn" onClick={() => {
                        setIsAuthenticated(false)
                        navigate('/login')
                    }
                    }>Выйти из аккаунта</div>
                </div>
            </div>
        </header>
    )
};

export default NavbarStoreKeeper;