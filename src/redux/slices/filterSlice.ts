import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

interface FilterState {
	category: number | null,
	sort: string,
	search: string
}

const initialState: FilterState = {
	category: null,
	sort: '',
	search: ''
} satisfies FilterState as FilterState

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		addCategory: (state, action) => {
			state.category = action.payload;
		},
		addSort: (state, action) => {
			state.sort = action.payload;
		},
		addSearch: (state, action) => {
			state.search = action.payload;
		},
		resetSort: (state) => {
			state.sort = ''
		},
		resetAllFilters: (state) => {
			state.category = null
			state.search = ''
			state.sort = ''
		}
	},
})

export const { addCategory, addSort, addSearch, resetSort, resetAllFilters } = filterSlice.actions;

export const selectFilters = (state: RootState) => state.filter;

export default filterSlice.reducer