import React, { useEffect, useState } from 'react';
import { CircleCheck } from 'lucide-react';
import './card.scss'
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface ICardProps {
	id: number,
	name: string,
	price: number,
	imgUrl: string,
	available: boolean
}

const Card: React.FC<ICardProps> = ({ id, name, price, imgUrl, available }) => {

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
				<Link to={`product/${id}`}>
					<button className='card__btn'>
						Перейти к товару
					</button>
				</Link>
			</div>
		</>
	);
};

export default Card;