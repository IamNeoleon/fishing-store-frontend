import React, { useState } from 'react';
import './ProductBlock.scss';

interface IProductBlockProps {
	title: string,
	description: string,
	caterogy: string,
	brand: string,
	price: number,
	imgUrl: string
}

const ProductBlock: React.FC<IProductBlockProps> = ({ title, description, caterogy, brand, price, imgUrl }) => {
	const [count, setCount] = useState<number>(1);


	return (
		<>
			<div className="product-block">
				<div className="product-block__row">
					<div className="product-block__img">
						<img src={imgUrl} alt="product image" />
					</div>
					<div className="product-block__info">
						<div className="product-block__title">{title}</div>
						<div className="product-block__category"><span>Категория:</span> {caterogy}</div>
						<div className="product-block__brand"><span>Бренд:</span> {brand}</div>
						<div className="product-block__avialable"><span>Доступен:</span> да</div>
						<div className="product-block__count-product"><span>Кол-во на складе:</span> 123</div>
						<div className="product-block__price">{Math.floor(price)} тнг.</div>
						<div className="product-block__count">
							<button disabled={count <= 0} className="product-block__count-minus" onClick={() => setCount(prev => prev - 1)}>-</button>
							<input value={count} onChange={(e) => {
								const value = Number(e.target.value);
								setCount(value > 0 ? value : 1);
							}} type="number" />
							<button className="product-block__count-plus" onClick={() => setCount(prev => prev + 1)}>+</button>
						</div>
						<button className='product-block__btn'>Добавить в корзину</button>
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