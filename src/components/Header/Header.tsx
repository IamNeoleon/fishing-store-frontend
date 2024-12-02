import React, { useEffect, useState, useCallback } from 'react';
import { ShoppingCart, CircleUserRound, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './header.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCart } from '../../redux/slices/cartSlice';
import { logout } from '../../redux/slices/authSlice';
import { getUser } from '../../utils/getUser.ts';
import { addSearch, resetFilter } from '../../redux/slices/filterSlice.ts';
import debounce from 'lodash/debounce';

interface IHeaderProps { }

const Header: React.FC<IHeaderProps> = () => {
    const [countCartItems, setCountCartItems] = useState<number>(0);
    const [value, setValue] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { cartItems } = useAppSelector(selectCart);
    const user = getUser();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth');
    };

    const debouncedSetSearchValue = useCallback(
        debounce((searchValue: string) => {
            dispatch(addSearch(searchValue));
        }, 1000),
        []
    );

    const goToHome = () => {
        navigate('/')
        dispatch(resetFilter());
    }

    useEffect(() => {
        debouncedSetSearchValue(value);

        return () => debouncedSetSearchValue.cancel();
    }, [value, debouncedSetSearchValue]);

    useEffect(() => {
        setCountCartItems(cartItems.length);
    }, [cartItems]);

    return (
        <>
            <header className="header">
                <div className="header__nav">
                    <div className="container">
                        <nav className="nav">
                            <a onClick={goToHome} className="nav__link">Все товары</a>
                            <a href="#" className="nav__link">О нас</a>
                            <a href="#" className="nav__link">Доставка и оплата</a>
                            {user.isStaff && <Link to='/admin' className='nav__link'>Админ-панель</Link>}
                        </nav>
                        <div className="header__profile">
                            <div className="header__icon">
                                <CircleUserRound size={18} />
                                <span>{user ? user.username : 'Войти'}</span>
                            </div>
                            <div onClick={handleLogout} className="logout">
                                Выйти
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header__bottom">
                    <div className="container">
                        <div className="header__bottom-inner">
                            <div className="header__logo">The Reel Deal</div>
                            <div className="header__search">
                                <input
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    type="text"
                                    placeholder='Поиск товаров'
                                />
                            </div>
                            <div className="header__icons">
                                <div className="header__icon">
                                    <Heart size={22} />
                                </div>
                                <div className="header__icon">
                                    <Link to='/cart'>
                                        <ShoppingCart size={22} />
                                        {
                                            countCartItems > 0 && <span>{countCartItems}</span>
                                        }
                                    </Link>
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
