import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getToken } from '../../utils/getToken';
import { getCategories, selectCategories, setCategory } from '../../redux/slices/categoriesSlice';
import './categories.scss'
import { addParams } from '../../redux/slices/productsSlice';


interface ICategoriesProps { }

const Categories: React.FC<ICategoriesProps> = () => {
    const dispatch = useAppDispatch();
    const { categories, parentCategories, subcategories } = useAppSelector(selectCategories);
    const token = getToken();

    const fetchCategories = async () => {
        if (token) {
            await dispatch(getCategories(token))
        }
    }

    const onClickCategory = (id: number) => {
        const queryParam = `category=${id}`;
        dispatch(addParams(queryParam))
    }

    useEffect(() => {
        fetchCategories();
    }, [dispatch, token])

    return (
        <>
            <div className="categories">
                <div className="container">
                    <div className="categories__inner">
                        {
                            parentCategories.map((parentCategory => (
                                <div onClick={() => onClickCategory(parentCategory.id)} key={parentCategory.id} className='categories__item item-categories'>
                                    <span>{parentCategory.name}</span>
                                    <ul className="item-categories__subcategories">
                                        {
                                            parentCategory.subcategories.map(subCategoryId => {
                                                const subcategory = subcategories.find(sub => sub.id === subCategoryId);
                                                return (
                                                    subcategory && <li className='item-categories__subcategory' key={subcategory.id}>{subcategory.name}</li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            )))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Categories;
