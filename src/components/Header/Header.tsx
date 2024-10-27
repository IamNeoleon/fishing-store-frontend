import React from 'react';
import { ShoppingCart, CircleUserRound } from 'lucide-react'
import './header.scss'

interface IHeaderProps { }

const Header: React.FC<IHeaderProps> = () => {
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__inner">
                        <div className="header__logo">Logo</div>
                        <nav className="nav">
                            <a href="#" className="nav__link">Главная</a>
                            <a href="#" className="nav__link">О нас</a>
                            <a href="#" className="nav__link">Доставка и оплата</a>
                            <a href="#" className="nav__link">Все товары</a>
                        </nav>
                        <div className="header__profile">
                            <div className="header__icons">
                                <div className="header__icon">
                                    <ShoppingCart size={20} />
                                </div>
                                <div className="header__icon">
                                    <CircleUserRound size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;