import React from 'react';
import headerLogo from '../../assets/header-logo.png'
import { ShoppingCart, CircleUserRound, Heart } from 'lucide-react'
import './header.scss'

interface IHeaderProps { }

const Header: React.FC<IHeaderProps> = () => {
    return (
        <>
            <header className="header">
                <div className="header__nav">
                    <div className="container">
                        <nav className="nav">
                            <a href="#" className="nav__link">Все товары</a>
                            <a href="#" className="nav__link">О нас</a>
                            <a href="#" className="nav__link">Доставка и оплата</a>
                        </nav>
                        <div className="header__profile">
                            <div className="header__icon">
                                <CircleUserRound size={18} />
                                <span>Войти</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header__bottom">
                    <div className="container">
                        <div className="header__bottom-inner">
                            <div className="header__logo">The Reel Deal
                            </div>
                            <div className="header__search">
                                <input type="text" placeholder='Поиск товаров' />
                            </div>
                            <div className="header__icons">
                                <div className="header__icon">
                                    <Heart size={22} />
                                </div>
                                <div className="header__icon">
                                    <ShoppingCart size={22} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header__inner">


                </div>
            </header>
        </>
    );
};

export default Header;