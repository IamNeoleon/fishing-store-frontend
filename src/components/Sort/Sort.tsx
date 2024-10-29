import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './sort.scss'
import classNames from 'classnames';

interface ISortProps { }

const Sort: React.FC = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
	const [activeCategory, setActiveCategory] = useState<string>('Катушки');

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	const selectCategory = (category: string) => {
		setActiveCategory(category);
		setIsDropdownOpen(false);
	};


	return (
		<>
			<div className="sort">
				<div className="container">
					<div className="sort__title">
						Все товары
					</div>
					<div className="sort__inner">
						<div className="dropdown">
							<button className="dropdown__button" onClick={toggleDropdown}>
								<span>{activeCategory}</span>
								<div className={classNames({ 'active': isDropdownOpen })}>
									<ChevronDown />
								</div>
							</button>
							{isDropdownOpen && (
								<ul className="dropdown__list">
									{['Катушки', 'Спиннинги', 'Приманки'].map((category) => (
										<li
											key={category}
											className={`dropdown__item ${category === activeCategory ? 'active' : ''}`}
											onClick={() => selectCategory(category)}
										>
											{category}
										</li>
									))}
								</ul>
							)}
						</div>
						<div className="sort__filter">
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sort;