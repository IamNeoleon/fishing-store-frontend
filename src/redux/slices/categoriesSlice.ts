import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { TCategory } from '../../@types'
import axios from 'axios'
import { API_URL } from '../../constants'

// Define a type for the slice state
interface CategoriesState {
    categories: TCategory[],
    parentCategories: TCategory[],
    subcategories: TCategory[],
    currentCategory: string | null
}

// Define the initial state using that type
const initialState: CategoriesState = {
    categories: [],
    parentCategories: [],
    subcategories: [],
    currentCategory: null
} satisfies CategoriesState as CategoriesState

export const getCategories = createAsyncThunk(
    'api/fetchCategories',
    async (token: string) => {
        const response = await axios.get(`${API_URL}/categories/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    },
)

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.currentCategory = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.parentCategories = state.categories.filter(category => category.parent === null);
                state.subcategories = state.categories.filter(category => category.parent !== null);
            })
    }
})

export const { setCategory } = categoriesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCategories = (state: RootState) => state.categories

export default categoriesSlice.reducer