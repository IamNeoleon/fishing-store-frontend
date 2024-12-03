import React, { useState } from 'react';
import { getToken } from '../utils/getToken';
import axios from 'axios';
import { API_URL } from '../constants';
import { getUser } from '../utils/getUser';

interface ICreateOrderProps { }

const CreateOrder: React.FC<ICreateOrderProps> = () => {
	const [formData, setFormData] = useState({
		address: '',
		phone: '',
		firstName: '',
		lastName: ''
	});

	const token = getToken();
	const user = getUser();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	const createOrder = async () => {
		const data = {
			address: formData.address,
			personal_info: {
				phone: formData.phone,
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: user.email
			}
		}

		const response = await axios.post(
			`${API_URL}/orders/`,
			data,  // Передаем данные для POST в теле запроса
			{
				headers: {
					'Authorization': `Bearer ${token}`
				}
			}
		);

		return response.data;
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createOrder();
		console.log(formData);
	};

	return (
		<div className="create-order-container">
			<h2>Оформление заказа</h2>
			<form onSubmit={handleSubmit} className="order-form">


				<div className="form-group">
					<label htmlFor="firstName">Имя</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						required
						placeholder="Введите ваше имя"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="lastName">Фамилия</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						required
						placeholder="Введите вашу фамилию"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="address">Адрес</label>
					<input
						type="text"
						id="address"
						name="address"
						value={formData.address}
						onChange={handleChange}
						required
						placeholder="Введите ваш адрес"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="phone">Телефон</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						required
						placeholder="Введите ваш телефон"
					/>
				</div>


				<button type="submit">Создать заказ</button>
			</form>
		</div>
	);
};

export default CreateOrder;
