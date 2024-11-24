import React from 'react';
import {Link} from "react-router-dom";

const NavbarStoreKeeper = () => {
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
                            <Link to="/planning">Планирование заказов</Link>
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
    )
};

export default NavbarStoreKeeper;