import React, { useEffect, useState } from 'react';
import cardImg from '../../assets/1.jpg';
import { CircleCheck } from 'lucide-react';
import './card.scss'
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addItem, getCart, selectCart } from '../../redux/slices/cartSlice';
import { getToken } from '../../utils/getToken';
import { TCartItemReq } from '../../@types';

interface ICardProps {
	id: number,
	name: string,
	price: number,
	imgUrl: string,
	available: boolean
}

const Card: React.FC<ICardProps> = ({ id, name, price, imgUrl, available }) => {
	const dispatch = useAppDispatch();
	const { cartItems } = useAppSelector(selectCart);
	const token = getToken();
	const [isAdded, setIsAdded] = useState(false);

	const onAddProduct = () => {
		const data: TCartItemReq = {
			product_id: id,
			quantity: 3
		}
		if (token && data) {
			dispatch(addItem({ token, data }))
		}
	}

	useEffect(() => {
		const isInCart = cartItems.some(item => item.product.id === id);

		if (isInCart) {
			setIsAdded(true);
		}
	}, [cartItems])

	return (
		<>
			<div className="card">
				<div className="card__img">
					<img src={imgUrl} alt="card img" />
				</div>
				<div className="card_info">
					<div className="card__title">{name}</div>
					<div className={classNames('card__available', { 'card__available--false': !available })}>
						{
							available ? (
								<>
									<span>В наличии</span> <CircleCheck size={16} />
								</>
							) : (
								<>
									<span>Нет в наличии</span>
								</>
							)
						}

					</div>
					<div className="card__price">{Math.floor(price)} тнг.</div>
				</div>
				<button onClick={onAddProduct} disabled={isAdded} className="card__btn">
					{!isAdded ? 'Добавить в корзину' : 'Уже в корзине'}
				</button>
			</div>
		</>
	);
};

export default Card;