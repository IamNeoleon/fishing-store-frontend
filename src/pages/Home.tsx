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
import { Link } from 'react-router-dom';

interface IHomeProps { }

const Home: React.FC<IHomeProps> = () => {
    const dispatch = useAppDispatch();
    const { products, loading } = useAppSelector(selectProducts);
    const { lastAddedProduct } = useAppSelector(selectCart);
    const { category, sort, search } = useAppSelector(selectFilters);
    const { currentCategory } = useAppSelector(selectCategories);
    const token = getToken();

    const fetchProducts = async () => {
        if (token) {
            let params: string = '';
            const queryParams = new URLSearchParams();
            if (category) queryParams.append('category', category.toString());
            if (sort) queryParams.append('sort', sort);
            if (search) queryParams.append('search', search);

            params = queryParams.toString() ? `?${queryParams.toString()}` : '';

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
    }, [category, sort, search])

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
                                    <Link key={product.id} to={`product/${product.id}`}>
                                        <Card id={product.id} name={product.name} price={product.price} imgUrl={product.image} available={product.available} />
                                    </Link>
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