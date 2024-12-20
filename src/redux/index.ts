import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import authReducer from './slices/authSlice'
import productsReducer from './slices/productsSlice'
import categoriesReducer from './slices/categoriesSlice'
import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authReducer,
		products: productsReducer,
		categories: categoriesReducer,
		filter: filterReducer,
		cart: cartReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch