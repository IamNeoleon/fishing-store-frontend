import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import { getToken } from '../../utils/getToken';
import './createProduct.scss'
import { useNavigate } from 'react-router-dom';

export type TBrand = {
	id: number;
	name: string;
};

export type TCategory = {
	id: number;
	name: string;
};

const CreateProductForm: React.FC = () => {
	const navigate = useNavigate();

	const [product, setProduct] = useState({
		name: '',
		description: '',
		price: 0,
		stock: 0,
		available: true,
		image: null as File | null,
		category: 0,
		brand: 0,
	});

	const [categories, setCategories] = useState<TCategory[]>([]);
	const [brands, setBrands] = useState<TBrand[]>([]);
	const [error, setError] = useState<string | null>(null);
	const token = getToken();

	const fetchCategories = async () => {
		const response = await axios.get(`${API_URL}/categories/`, {
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		});

		setCategories(response.data);
	};

	const fetchBrands = async () => {
		const response = await axios.get(`${API_URL}/brands/`, {
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		});

		setBrands(response.data);
	};

	useEffect(() => {
		fetchCategories();
		fetchBrands();
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setProduct((prev) => ({
			...prev,
			[name]: name === 'price' || name === 'stock' ? +value : value,
		}));
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setProduct((prev) => ({ ...prev, [name]: +value }));
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct((prev) => ({ ...prev, available: e.target.checked }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			setProduct((prev) => ({ ...prev, image: files[0] }));
		}
	};

	const validateForm = () => {
		if (!product.name || !product.description || !product.price || !product.stock || !product.image || !product.category || !product.brand) {
			setError('Пожалуйста, заполните все поля!');
			return false;
		}

		if (product.price <= 0 || product.stock < 0) {
			setError('Цена и количество должны быть положительными значениями!');
			return false;
		}

		setError(null);
		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		const formData = new FormData();
		Object.entries(product).forEach(([key, value]) => {
			if (value !== null) {
				if (key === 'price' || key === 'stock') {
					formData.append(key, value.toString());
				} else if (key === 'image') {
					formData.append(key, value as Blob);
				} else {
					formData.append(key, value as string);
				}
			}
		});

		try {
			const response = await axios.post(`${API_URL}/products/`, formData, {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			});

			if (response.status === 201) {
				alert('Продукт успешно создан!');
				setProduct({
					name: '',
					description: '',
					price: 0,
					stock: 0,
					available: true,
					image: null,
					category: 0,
					brand: 0,
				});
				navigate('/admin');
			} else {
				alert('Ошибка при создании продукта.');
			}
		} catch (error) {
			console.error('Ошибка при создании продукта:', error);
			alert('Ошибка при создании продукта.');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="product-form">
			<h2>Создание нового продукта</h2>

			{error && <div className="error">{error}</div>}

			<label>
				Название:
				<input
					type="text"
					name="name"
					value={product.name}
					onChange={handleInputChange}
					required
				/>
			</label>

			<label>
				Описание:
				<textarea
					name="description"
					value={product.description}
					onChange={handleInputChange}
					required
				/>
			</label>

			<label>
				Цена:
				<input
					type="number"
					name="price"
					value={product.price}
					onChange={handleInputChange}
					required
				/>
			</label>

			<label>
				Количество:
				<input
					type="number"
					name="stock"
					value={product.stock}
					onChange={handleInputChange}
					required
				/>
			</label>

			<label>
				Категория:
				<select
					name="category"
					value={product.category}
					onChange={handleSelectChange}
					required
				>
					<option value="" disabled>
						Выберите категорию
					</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</label>

			<label>
				Бренд:
				<select
					name="brand"
					value={product.brand}
					onChange={handleSelectChange}
					required
				>
					<option value="" disabled>
						Выберите бренд
					</option>
					{brands.map((brand) => (
						<option key={brand.id} value={brand.id}>
							{brand.name}
						</option>
					))}
				</select>
			</label>

			<label>
				Доступность:
				<input
					type="checkbox"
					name="available"
					checked={product.available}
					onChange={handleCheckboxChange}
				/>
			</label>

			<label>
				Изображение:
				<input type="file" onChange={handleFileChange} required />
			</label>

			<button type="submit">Создать продукт</button>
		</form>
	);
};

export default CreateProductForm;
