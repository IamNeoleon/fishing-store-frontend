import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { TProduct } from '../../@types';
import { API_URL } from '../../constants';

interface IProductsSlice {
	products: TProduct[] | [],
	loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

const initialState: IProductsSlice = {
	products: [],
	loading: 'idle'
};

export const getProducts = createAsyncThunk(
	'api/getProducts',
	async (token: string) => {
		const response = await axios.get(`${API_URL}/products/`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		return response.data;
	},
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
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

export const selectProducts = (state: RootState) => state.products;
export default authSlice.reducer;
