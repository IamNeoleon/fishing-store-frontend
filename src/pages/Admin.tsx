import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';
import { selectProducts } from '../redux/slices/productsSlice';
import { getToken } from '../utils/getToken';
import { TProduct } from '../@types';
import axios from 'axios';
import { API_URL } from '../constants';
import '../scss/admin.scss';


const Admin: React.FC = () => {
    const [products, setProducts] = useState<TProduct[]>([]);
    const token = getToken();

    const fetchProducts = async () => {
        const response = await axios.get<TProduct[]>(`${API_URL}/products`)

        setProducts(response.data);
    }
    console.log(products);
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <>
            <div className="admin">
                <div className="admin__header header-admin">
                    <div className="container">
                        <div className="header-admin__inner">
                            <div className="header-admin__logo">
                                <span>The Reel Deal</span><span>admin</span>
                            </div>
                            <nav className="header-admin__nav">
                                <div className="header-admin__link">К сайту</div>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="admin__products">
                    <div className="container">
                        <h2>Список товаров</h2>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
                                    <th>Цена</th>
                                    <th>Категория</th>
                                    <th>Кол-во на складе</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}₸</td>
                                        <td>{product.stock}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            <button className="btn-edit">Редактировать</button>
                                            <button className="btn-delete">Удалить</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;