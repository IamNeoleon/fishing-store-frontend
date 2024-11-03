import React, { useEffect } from 'react';
import Card from '../components/Card/Card';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProducts, selectProducts, setBrands } from '../redux/slices/productsSlice';
import { getToken } from '../utils/getToken';
import Sort from '../components/Sort/Sort';
import { TBrand } from '../@types';
import { API_URL } from '../constants';
import axios from 'axios';

interface IHomeProps { }

const Home: React.FC<IHomeProps> = () => {
    const dispatch = useAppDispatch();
    const { products, loading, params } = useAppSelector(selectProducts);
    const token = getToken();

    const fetchProducts = async () => {
        if (token) {
            console.log(params);
            await dispatch(getProducts({ token, params }));
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [params])

    useEffect(() => {
        const fetchBrands = async () => {
            const response = await axios.get<TBrand[]>(`${API_URL}/brands`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            dispatch(setBrands(response.data)); // Устанавливаем все доступные бренды
        };

        fetchBrands();
    }, []);

    return (
        <>
            <div className="products">
                <div className="container">
                    <div className="products__inner">
                        <div className="products__category">Катушки</div>
                        <div className="products__main">
                            <aside className="products__sidebar">
                                <Sort />
                            </aside>
                            <div className="products__items">
                                {products.map(product =>
                                    <Card key={product.id} name={product.name} price={product.price} imgUrl={product.image} available={product.available} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;