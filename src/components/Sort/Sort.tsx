import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import './sort.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addParams, selectProducts } from '../../redux/slices/productsSlice';

const Sort: React.FC = () => {
	const dispatch = useAppDispatch();
	const { brands } = useAppSelector(selectProducts);
	const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
	const [minPrice, setMinPrice] = useState<number | ''>('');
	const [maxPrice, setMaxPrice] = useState<number | ''>('');
	const [sortOrder, setSortOrder] = useState<string>('asc');
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

	const handleBrandChange = (brandId: number) => {
		setSelectedBrands(prevSelected =>
			prevSelected.includes(brandId)
				? prevSelected.filter(id => id !== brandId)
				: [...prevSelected, brandId]
		);
	};

	const applyFilter = () => {
		const queryParams = [];
		if (selectedBrands.length > 0) {
			queryParams.push(`brands=${selectedBrands.join(',')}`);
		}
		if (minPrice) {
			queryParams.push(`price_min=${minPrice}`);
		}
		if (maxPrice) {
			queryParams.push(`price_max=${maxPrice}`);
		}
		queryParams.push(`ordering=${sortOrder === 'asc' ? 'price' : '-price'}`);
		const queryString = queryParams.length > 0 ? `${queryParams.join('&')}` : '';
		dispatch(addParams(queryString));
	};

	const handleSortOrderChange = (order: string) => {
		setSortOrder(order);
		setIsDropdownOpen(false);
	};

	const sortOptions = [
		{ value: 'asc', label: 'Сначала дешевые' },
		{ value: 'desc', label: 'Сначала дорогие' }
	];

	return (
		<div className="sort">
			<div className="sort__title">
				<SlidersHorizontal size={18} />
				<span>Фильтр подбора</span>
			</div>
			<div className="sort__filters">
				<div className="sort__filter sort__price">
					<h3>Цена:</h3>
					<div className="sort__price-inputs">
						<input
							type="number"
							placeholder="Минимальная цена"
							value={minPrice}
							onChange={e => setMinPrice(Number(e.target.value))}
						/>
						<input
							type="number"
							placeholder="Максимальная цена"
							value={maxPrice}
							onChange={e => setMaxPrice(Number(e.target.value))}
						/>
					</div>
				</div>
				<div className="sort__filter sort__order">
					<h3>Показать сначала:</h3>
					<div className="sort__order-selected" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
						{sortOptions.find(option => option.value === sortOrder)?.label || 'Выберите сортировку'}
						<ChevronDown />
					</div>
					{isDropdownOpen && (
						<div className="sort__order-dropdown">
							{sortOptions.map(option => (
								<div
									key={option.value}
									className="sort__order-option"
									onClick={() => handleSortOrderChange(option.value)}
								>
									{option.label}
								</div>
							))}
						</div>
					)}
				</div>
				<div className="sort__filter sort__brands brands">
					<h3>Выберите бренды: </h3>
					{brands.map(brand => (
						<div key={brand.id} className="brands__brand">
							<label>
								<input
									type="checkbox"
									checked={selectedBrands.includes(brand.id)}
									onChange={() => handleBrandChange(brand.id)}
								/>
								<span>{brand.name}</span>
							</label>
						</div>
					))}
				</div>
			</div>
			<div className="sort__btn" onClick={applyFilter}>
				Применить фильтр
			</div>
		</div>
	);
};

export default Sort;
