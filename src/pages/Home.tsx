import React, { useEffect } from 'react';
import Card from '../components/Card/Card';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProducts, selectProducts, setBrands } from '../redux/slices/productsSlice';
import { getToken } from '../utils/getToken';
import Sort from '../components/Sort/Sort';
import { TBrand } from '../@types';
import { API_URL } from '../constants';
import axios from 'axios';
import { selectFilters } from '../redux/slices/filterSlice';
import { getCart, selectCart } from '../redux/slices/cartSlice';
import { selectCategories } from '../redux/slices/categoriesSlice';

interface IHomeProps { }

const Home: React.FC<IHomeProps> = () => {
    const dispatch = useAppDispatch();
    const { products, loading } = useAppSelector(selectProducts);
    const { lastAddedProduct } = useAppSelector(selectCart);
    const { category, sort } = useAppSelector(selectFilters);
    const { currentCategory } = useAppSelector(selectCategories);
    const token = getToken();

    const fetchProducts = async () => {
        if (token) {
            let params: string = '';
            if (category != null) {
                params = `?${category}&${sort}`;
            } else {
                params = sort ? `?${sort}` : '';
            }
            await dispatch(getProducts({ token, params }));
        }
    }

    const fetchCart = async () => {
        if (token) {
            await dispatch(getCart(token));
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [category, sort])

    useEffect(() => {
        const fetchBrands = async () => {
            const response = await axios.get<TBrand[]>(`${API_URL}/brands`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            dispatch(setBrands(response.data));
        };

        fetchBrands();
    }, []);

    useEffect(() => {
        fetchCart();
    }, [lastAddedProduct])

    return (
        <>
            <div className="products">
                <div className="container">
                    <div className="products__inner">
                        <div className="products__category">
                            {currentCategory ? currentCategory : 'Все товары'}
                        </div>
                        <div className="products__main">
                            <aside className="products__sidebar">
                                <Sort />
                            </aside>
                            <div className="products__items">
                                {products.map(product =>
                                    <Card key={product.id} id={product.id} name={product.name} price={product.price} imgUrl={product.image} available={product.available} />
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