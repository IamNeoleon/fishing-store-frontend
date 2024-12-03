import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constants';
import { getToken } from '../utils/getToken';
import { TProduct } from '../@types';

const AdminEditProduct: React.FC = () => {
	const { id } = useParams();

	const [product, setProduct] = useState({
		name: '',
		description: '',
		price: 0,
		stock: 0,
		available: true,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const token = getToken();
	const navigate = useNavigate();

	const fetchProduct = async () => {
		try {
			const response = await axios.get<TProduct>(`${API_URL}/products/${id}/`, {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			const receivedProduct = {
				name: response.data.name,
				description: response.data.description,
				price: response.data.price,
				stock: response.data.stock,
				available: response.data.available
			}
			setProduct(receivedProduct);
		} catch (err) {
			setError('Ошибка при загрузке данных о продукте');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProduct();
	}, [id]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;

		if (type === 'checkbox') {
			const { checked } = e.target as HTMLInputElement;
			setProduct((prev) => ({
				...prev,
				[name]: checked,
			}));
		} else {
			setProduct((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.patch(
				`${API_URL}/products/${id}/`,
				product,
				{
					headers: {
						'Authorization': `Bearer ${token}`,
					},
				}
			);
			if (response.status === 200) {
				alert('Продукт успешно обновлен');
				navigate(`/admin`);
			}
		} catch (error) {
			setError('Ошибка при обновлении продукта');
		}
	};

	if (loading) {
		return <p className="admin-edit-product__loading">Загрузка...</p>;
	}

	return (
		<div className="admin-edit-product">
			<h2 className="admin-edit-product__title">Редактировать продукт</h2>
			{error && <p className="admin-edit-product__error">{error}</p>}
			<form onSubmit={handleSubmit} className="admin-edit-product__form">
				<label className="admin-edit-product__label">
					<span>Название:</span>
					<input
						type="text"
						name="name"
						value={product.name}
						onChange={handleInputChange}
						required
						className="admin-edit-product__input"
					/>
				</label>

				<label className="admin-edit-product__label">
					<span>Описание:</span>
					<textarea
						name="description"
						value={product.description}
						onChange={handleInputChange}
						required
						className="admin-edit-product__textarea"
					/>
				</label>

				<label className="admin-edit-product__label">
					<span>Цена:</span>
					<input
						type="number"
						name="price"
						value={product.price}
						onChange={handleInputChange}
						required
						className="admin-edit-product__input"
					/>
				</label>

				<label className="admin-edit-product__label">
					<span>Количество:</span>
					<input
						type="number"
						name="stock"
						value={product.stock}
						onChange={handleInputChange}
						required
						className="admin-edit-product__input"
					/>
				</label>

				<label className="admin-edit-product__label">
					<span>Доступность:</span>
					<div className="admin-edit-product__checkbox">
						<input
							type="checkbox"
							name="available"
							checked={product.available}
							onChange={handleInputChange}
						/>
						<span className="admin-edit-product__checkbox-label">Товар доступен</span>
					</div>
				</label>

				<button type="submit" className="admin-edit-product__button">Обновить продукт</button>
			</form>
		</div>
	);
};

export default AdminEditProduct;
