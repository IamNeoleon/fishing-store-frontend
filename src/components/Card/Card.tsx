import React from 'react';
import cardImg from '../../assets/1.jpg'
import { CircleCheck } from 'lucide-react';
import './card.scss'
import classNames from 'classnames';

interface ICardProps {
	name: string,
	price: number,
	imgUrl: string,
	available: boolean
}

const Card: React.FC<ICardProps> = ({ name, price, imgUrl, available }) => {
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
				<button className="card__btn">
					Добавить в корзину
				</button>
			</div>
		</>
	);
};

export default Card;