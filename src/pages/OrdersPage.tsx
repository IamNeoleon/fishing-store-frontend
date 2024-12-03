import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../utils/getToken";
import { API_URL } from "../constants";

// Тип для информации о пользователе
interface PersonalInfo {
	phone: string;
	firstName: string;
	lastName: string;
	email: string;
}

// Тип для продукта в заказе
interface Product {
	id: number;
	name: string;
	price: string;
	image: string;
}

// Тип для элемента в заказе
interface OrderItem {
	id: number;
	product: Product;
	quantity: number;
	price: string;
}

// Тип для самого заказа
interface Order {
	id: number;
	user: number;
	created_at: string;
	total_amount: string;
	address: string;
	personal_info: PersonalInfo;
	status: string;
	items: OrderItem[];
}

function OrdersPage() {
	// Состояние для хранения видимости деталей каждого заказа
	const [visibleOrderId, setVisibleOrderId] = useState<number | null>(null);
	const [ordersData, setOrdersData] = useState<Order[]>([]);

	// Функция для переключения видимости деталей заказа
	const toggleOrderDetails = (orderId: number) => {
		setVisibleOrderId((prevId) => (prevId === orderId ? null : orderId));
	};

	const token = getToken();

	const getOrders = async () => {
		const response = await axios.get(`${API_URL}/orders/`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		setOrdersData(response.data);
		console.log(response.data);

	}

	useEffect(() => {
		getOrders();
	}, [])

	return (
		<div className="orders-page">
			<div className="container">
				<h1>Мои заказы</h1>
				<div className="order-cards">
					{ordersData.map((order) => (
						<div key={order.id} className="order-card">
							<h2>Заказ #{order.id}</h2>
							<p>Статус: {order.status}</p>
							<p>Дата заказа: {new Date(order.created_at).toLocaleString()}</p>
							<p>Сумма: {order.total_amount} тнг.</p>
							<p>Адрес доставки: {order.address}</p>
							<button onClick={() => toggleOrderDetails(order.id)}>
								{visibleOrderId === order.id
									? "Скрыть детали заказа"
									: "Показать детали заказа"}
							</button>

							{/* Показываем детали только для того заказа, который выбран */}
							{visibleOrderId === order.id && <OrderDetails order={order} />}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function OrderDetails({ order }: { order: Order }) {
	return (
		<div className="order-details">
			<h2>Детали заказа #{order.id}</h2>
			<div>
				<h3>Персональная информация:</h3>
				<p>
					Имя: {order.personal_info.firstName} {order.personal_info.lastName}
				</p>
				<p>Email: {order.personal_info.email}</p>
				<p>Телефон: {order.personal_info.phone}</p>
			</div>

			<h3>Товары в заказе:</h3>
			<div className="order-items">
				{order.items.map((item) => (
					<div key={item.id} className="order-item">
						<img src={item.product.image} alt={item.product.name} width="100" />
						<div>
							<p>
								<strong>Название товара:</strong> {item.product.name}
							</p>
							<p>
								<strong>Цена:</strong> {item.product.price} ₽
							</p>
							<p>
								<strong>Количество:</strong> {item.quantity}
							</p>
							<p>
								<strong>Общая сумма:</strong> {item.price} тнг.
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default OrdersPage;
