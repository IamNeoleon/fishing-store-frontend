import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { selectProducts } from '../redux/slices/productsSlice';
import ProductBlock from '../components/ProductBlock/ProductBlock';
import { selectCategories } from '../redux/slices/categoriesSlice';


const Product: React.FC = () => {
	const { id } = useParams();
	const { products } = useAppSelector(selectProducts);
	const { subcategories } = useAppSelector(selectCategories);
	const product = id ? products.find(item => item.id === parseInt(id)) : undefined;

	if (!product) {
		return (
			<div className="product-page">
				<div className="container">
					<h2>Продукт не найден</h2>
				</div>
			</div>
		);
	}

	const category = subcategories.find(item => item.id === product.category);

	return (
		<>
			<div className="product-page">
				<div className="container">
					<ProductBlock
						title={product.name}
						caterogy={category ? category.name : 'Неизвестно'}
						description={product.description}
						brand={product.brand_name}
						price={product.price}
						imgUrl={product.image}
					/>
				</div>
			</div>
		</>
	);
};

export default Product;