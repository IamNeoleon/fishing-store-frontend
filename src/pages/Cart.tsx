import React from 'react';
import { useAppSelector } from '../hooks';
import { selectCart } from '../redux/slices/cartSlice';
import CartItem from '../components/CartItem/CartItem';
import { Link } from 'react-router-dom';

interface ICartProps { }

const Cart: React.FC<ICartProps> = () => {
    const { cartItems } = useAppSelector(selectCart)

    return (
        <>
            <div className="cart">
                <div className="container">
                    <div className="cart__inner">
                        {
                            cartItems.length > 0 ? (
                                <>
                                    <div className="cart__title">Ваша корзина</div>
                                    <div className="cart__header">
                                        <div className="cart__name-product">Товар</div>
                                        <div className="cart__count-product">Количество</div>
                                        <div className="cart__total-price">Сумма</div>
                                    </div>
                                    <div className="cart__items">
                                        {cartItems.map(cartItem =>
                                            <CartItem
                                                key={cartItem.id}
                                                id={cartItem.id}
                                                name={cartItem.product.name}
                                                image={cartItem.product.image}
                                                price={Math.floor(cartItem.product.price)}
                                                quantity={cartItem.quantity}
                                            />
                                        )}
                                    </div>
                                    <div className="cart__bottom">
                                        <Link to='/create_order' className='cart__btn'>Перейти к оформлению</Link>
                                    </div>
                                </>
                            ) : (
                                <div className='cart-empty'>
                                    <h1>Ваша корзина пуста</h1>
                                    <p>Добавьте в нее товары чтобы произвести покупку</p>
                                    <Link to='/'>
                                        <button>
                                            Вернуться на главную
                                        </button>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;