import React, { useEffect, useState } from 'react';
import { TProduct } from '../@types';
import axios from 'axios';
import { API_URL } from '../constants';
import '../scss/admin.scss';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../utils/getToken';


const Admin: React.FC = () => {
    const [products, setProducts] = useState<TProduct[]>([]);
    const navigate = useNavigate();
    const token = getToken();

    const fetchProducts = async () => {
        const response = await axios.get<TProduct[]>(`${API_URL}/products`)

        setProducts(response.data);
    }

    const editProduct = (id: number) => {
        navigate(`product/${id}`)
    }

    const deleteProduct = async (id: number) => {
        try {
            const response = await axios.delete(`${API_URL}/products/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Delete response:', response); // Логируем ответ сервера

            if (response.status === 204) {
                alert('Продукт успешно удален');

                // Фильтруем продукты и обновляем состояние
                setProducts(prevProducts => {
                    const updatedProducts = prevProducts.filter(product => product.id !== id);
                    console.log('Updated products after deletion:', updatedProducts); // Логируем обновленный список
                    return updatedProducts;
                });
            }
        } catch (error) {
            console.error('Ошибка при удалении товара:', error);
            alert('Ошибка при удалении продукта!');
        }
    };



    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <>
            <div className="admin">
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
                                        <td>{Math.floor(product.price)}₸</td>
                                        <td>{product.category}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <button onClick={() => editProduct(product.id)} className="btn-edit">Редактировать</button>
                                            <button onClick={() => deleteProduct(product.id)} className="btn-delete">Удалить</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Link to='create_product' className="admin__create-product">
                    <Plus />
                </Link>
            </div>
        </>
    );
};

export default Admin;