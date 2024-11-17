import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { ICartItem, TCartItemReq, TCategory } from '../../@types'
import axios from 'axios'
import { API_URL } from '../../constants'

// Define a type for the slice state
interface CartState {
    cartItems: ICartItem[],
    lastAddedProduct: number | null
}

// Define the initial state using that type
const initialState: CartState = {
    cartItems: [],
    lastAddedProduct: null
} satisfies CartState as CartState

export const addItem = createAsyncThunk(
    'api/addItemToCart',
    async ({ token, data }: { token: string, data: TCartItemReq }) => {
        const response = await axios.post(
            `${API_URL}/cart-items/`,
            data,  // Передаем данные для POST в теле запроса
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response.data;
    },
)

export const deleteItem = createAsyncThunk(
    'api/deleteCartItem',
    async ({ token, id }: { token: string, id: number }) => {
        const response = await axios.delete(`${API_URL}/cart-items/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    },
)

export const getCart = createAsyncThunk(
    'api/getCart',
    async (token: string) => {
        const response = await axios.get<ICartItem[]>(`${API_URL}/cart-items/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    },
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                state.cartItems = action.payload;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.lastAddedProduct = action.payload.product.id;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                const idToDelete = action.meta.arg.id;
                state.cartItems = state.cartItems.filter(item => item.id !== idToDelete);
            })
    }
})

// export const { setCategory } = categoriesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer