import React, { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProducts, selectProducts, setBrands } from '../redux/slices/productsSlice';
import { selectFilters } from '../redux/slices/filterSlice';
import { getCart, selectCart } from '../redux/slices/cartSlice';
import { selectCategories } from '../redux/slices/categoriesSlice';
import { getToken } from '../utils/getToken';
import { API_URL } from '../constants';
import { TBrand } from '../@types';
import Sort from '../components/Sort/Sort';
import Card from '../components/Card/Card';
import CardSkeleton from '../components/Card/CardSkeleton';



interface IHomeProps { }

const Home: React.FC<IHomeProps> = () => {
    const dispatch = useAppDispatch();
    const { products, loading } = useAppSelector(selectProducts);
    const { lastAddedProduct } = useAppSelector(selectCart);
    const { category, sort, search } = useAppSelector(selectFilters);
    const { currentCategory } = useAppSelector(selectCategories);
    const token = getToken();
    const arrSkeleton = Array.from({ length: 10 }, (_, i) => i + 1);

    const fetchProducts = async () => {
        if (token) {
            let params: string = '';
            const queryParams = new URLSearchParams();
            if (category) queryParams.append('category', category.toString());
            if (search) queryParams.append('search', search);
            const sortParam = sort ? sort : '';
            console.log(sort);
            params = queryParams.toString() ? `?${queryParams.toString()}&${sortParam}` : `?${sortParam}`;
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
                                {loading == 'pending'
                                    ? arrSkeleton.map((_, index) => <CardSkeleton key={index} />)
                                    : products.map((product) => (
                                        <Card
                                            key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            imgUrl={product.image}
                                            available={product.available}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;