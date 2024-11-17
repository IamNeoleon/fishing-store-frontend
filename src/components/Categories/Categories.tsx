import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getToken } from '../../utils/getToken';
import { getCategories, selectCategories, setCategory } from '../../redux/slices/categoriesSlice';
import './categories.scss'
import { addCategory } from '../../redux/slices/filterSlice';


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
        const category = subcategories.find(subcategory => subcategory.id === id);
        dispatch(addCategory(queryParam))
        console.log(category?.name);
        dispatch(setCategory(category?.name))
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
                                <div key={parentCategory.id} className='categories__item item-categories'>
                                    <span>{parentCategory.name}</span>
                                    <ul className="item-categories__subcategories">
                                        {
                                            parentCategory.subcategories.map(subCategoryId => {
                                                const subcategory = subcategories.find(sub => sub.id === subCategoryId);
                                                return (
                                                    subcategory && <li onClick={() => onClickCategory(subCategoryId)} className='item-categories__subcategory' key={subcategory.id}>{subcategory.name}</li>
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
