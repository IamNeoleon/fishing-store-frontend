import React from 'react';
import { X } from 'lucide-react';
import './cartItem.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteItem, selectCart } from '../../redux/slices/cartSlice';
import { getToken } from '../../utils/getToken';

interface ICartItemProps {
    id: number,
    name: string,
    image: string,
    price: number,
    quantity: number
}

const CartItem: React.FC<ICartItemProps> = ({ id, name, image, price, quantity }) => {
    const dispatch = useAppDispatch();

    const totalPrice = price * quantity;
    const token = getToken();

    const handleDelete = async () => {
        if (token) {
            await dispatch(deleteItem({ token, id }));
        }
    }

    return (
        <>
            <div className="cart-item">
                <div className="cart-item__info">
                    <div className="cart-item__img">
                        <img src={image} alt="cart item image" />
                    </div>
                    <div className="cart-item__desc">
                        <div className="cart-item__title">{name}</div>
                        <div className="cart-item__price">
                            <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path d="M 6.6328125 5 C 6.2848125 5 6 5.2740937 6 5.6210938 L 6 8.3671875 C 6 8.7151875 6.2848125 9 6.6328125 9 L 25.378906 9 C 25.725906 9 26 8.7151875 26 8.3671875 L 26 5.6210938 C 26 5.2740938 25.725906 5 25.378906 5 L 6.6328125 5 z M 6.6328125 12 C 6.2848125 12 6 12.284094 6 12.621094 L 6 15.367188 C 6 15.715188 6.2848125 16 6.6328125 16 L 14 16 L 14 27.378906 C 14 27.725906 14.274094 28 14.621094 28 L 17.378906 28 C 17.725906 28 18 27.725906 18 27.378906 L 18 16 L 25.378906 16 C 25.725906 16 26 15.715187 26 15.367188 L 26 12.621094 C 26 12.284094 25.725906 12 25.378906 12 L 6.6328125 12 z" />
                            </svg>
                            <span>{price}</span>
                        </div>
                    </div>
                </div>
                <div className="cart-item__count">{quantity}</div>
                <div className="cart-item__total">
                    <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 6.6328125 5 C 6.2848125 5 6 5.2740937 6 5.6210938 L 6 8.3671875 C 6 8.7151875 6.2848125 9 6.6328125 9 L 25.378906 9 C 25.725906 9 26 8.7151875 26 8.3671875 L 26 5.6210938 C 26 5.2740938 25.725906 5 25.378906 5 L 6.6328125 5 z M 6.6328125 12 C 6.2848125 12 6 12.284094 6 12.621094 L 6 15.367188 C 6 15.715188 6.2848125 16 6.6328125 16 L 14 16 L 14 27.378906 C 14 27.725906 14.274094 28 14.621094 28 L 17.378906 28 C 17.725906 28 18 27.725906 18 27.378906 L 18 16 L 25.378906 16 C 25.725906 16 26 15.715187 26 15.367188 L 26 12.621094 C 26 12.284094 25.725906 12 25.378906 12 L 6.6328125 12 z" />
                    </svg>
                    <span>{totalPrice}</span>
                </div>
                <button onClick={handleDelete} className="cart-item__delete">
                    <X />
                </button>
            </div>
        </>
    );
};

export default CartItem;