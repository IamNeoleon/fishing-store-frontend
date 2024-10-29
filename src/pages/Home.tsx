import React, { useEffect } from 'react';
import Card from '../components/Card/Card';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProducts, selectProducts } from '../redux/slices/productsSlice';
import { getToken } from '../utils/getToken';

interface IHomeProps { }

const Home: React.FC<IHomeProps> = () => {
    const dispatch = useAppDispatch();
    const { products, loading } = useAppSelector(selectProducts);
    const token = getToken();

    const fetchProducts = async () => {
        if (token) {
            await dispatch(getProducts(token));
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <>
            <div className="products">
                <div className="container">
                    <div className="products__inner">
                        {products.map(product =>
                            <Card name={product.name} price={product.price} imgUrl={product.image} available={product.available} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;