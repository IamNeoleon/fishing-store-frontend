import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getToken } from '../../utils/getToken';
import { addItem, getCart, selectCart } from '../../redux/slices/cartSlice';
import { TCartItemReq } from '../../@types';
import './ProductBlock.scss';

interface IProductBlockProps {
	id: number,
	title: string,
	description: string,
	caterogy: string,
	brand: string,
	price: number,
	imgUrl: string,
	stock: number,
	avialable: boolean
}

const ProductBlock: React.FC<IProductBlockProps> = ({ id, title, description, caterogy, brand, price, imgUrl, stock }) => {
	const [count, setCount] = useState<number>(1);
	const dispatch = useAppDispatch();
	const { cartItems } = useAppSelector(selectCart);
	const token = getToken();
	const [isAdded, setIsAdded] = useState(false);

	const fetchCart = () => {
		if (token) {
			dispatch(getCart(token));
		}
	}

	const onAddProduct = async () => {
		const data: TCartItemReq = {
			product_id: id,
			quantity: count
		}
		if (token && data) {
			await dispatch(addItem({ token, data }))
			setIsAdded(true);
			fetchCart();
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
			<div className="product-block">
				<div className="product-block__row">
					<div className="product-block__img">
						<img src={imgUrl} alt="product image" />
					</div>
					<div className="product-block__info">
						<div className="product-block__characteristics">
							<div className="product-block__title product-block__characteristic">{title}</div>
							<div className="product-block__category product-block__characteristic"><span>Категория:</span> {caterogy}</div>
							<div className="product-block__brand product-block__characteristic"><span>Бренд:</span> {brand}</div>
							<div className="product-block__avialable product-block__characteristic"><span>Доступен:</span> {stock ? 'да' : 'нет'}</div>
							<div className="product-block__count-product product-block__characteristic"><span>Кол-во на складе:</span> {stock}</div>
						</div>
						<div className="product-block__buy">
							<div className="product-block__price product-block__characteristic">{Math.floor(price)} тнг.</div>
							<div className="product-block__count">
								<button disabled={count <= 0} className="product-block__count-minus" onClick={() => setCount(prev => prev - 1)}>-</button>
								<input value={count} onChange={(e) => {
									const value = Number(e.target.value);
									setCount(value > 0 ? value : 1);
								}} type="number" />
								<button className="product-block__count-plus" onClick={() => setCount(prev => prev + 1)}>+</button>
							</div>
							<button onClick={onAddProduct} disabled={isAdded} className='product-block__btn'>{!isAdded ? 'Добавить в корзину' : 'Уже в корзине'}</button>
						</div>
					</div>
				</div>
				<div className="product-block__description">
					<span>Описание</span>
					<p>
						{description}
					</p>
				</div>
			</div>
		</>
	);
};

export default ProductBlock;