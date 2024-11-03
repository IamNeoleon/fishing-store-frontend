import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { TBrand, TProduct } from '../../@types';
import { API_URL } from '../../constants';

interface IProductsSlice {
	products: TProduct[] | [],
	brands: TBrand[],
	loading: 'idle' | 'pending' | 'succeeded' | 'failed',
	params: string,
	currentCategory: string
}

const initialState: IProductsSlice = {
	products: [],
	loading: 'idle',
	brands: [],
	params: '',
	currentCategory: ''
};

export const getProducts = createAsyncThunk(
	'api/getProducts',
	async ({ token, params }: { token: string, params: string }) => {
		const response = await axios.get<TProduct[]>(`${API_URL}/products/${params}`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		return response.data;
	},
)

const products = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setBrands: (state, action: PayloadAction<TBrand[]>) => {
			state.brands = action.payload; // Устанавливаем все доступные бренды
		},
		addParams: (state, action: PayloadAction<string>) => {
			state.params = state.params ? state.params + '&' + action.payload : '?' + action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.loading = 'pending';
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.loading = 'succeeded';
				state.products = action.payload;
			})
			.addCase(getProducts.rejected, (state) => {
				state.loading = 'failed';
			})
	},
});

export const { addParams, setBrands } = products.actions;
export const selectProducts = (state: RootState) => state.products;
export default products.reducer;
