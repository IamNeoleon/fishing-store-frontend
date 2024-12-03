import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TLoginResponse } from '../../@types';
import { RootState } from '..';
import { API_URL } from '../../constants';

const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

interface AuthState {
    user: null | { username: string; email: string, isStaff: boolean };
    token: string | null;
    token_refresh: string | null;
    loading: boolean;
    error: string | null;
    errorRegistered: string | null
}

const initialState: AuthState = {
    user: null,
    token: null,
    token_refresh: null,
    loading: false,
    error: null,
    errorRegistered: null
};

export const login = createAsyncThunk('auth/login', async (credentials: { username: string; password: string }) => {
    const response = await axios.post('http://127.0.0.1:8000/api/token/', credentials);
    return response.data;
});

export const register = createAsyncThunk('auth/register', async (data: { username: string; email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/register/`, data);
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.token_refresh = null;
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<TLoginResponse>) => {
                state.loading = false;
                state.user = { username: action.payload.username, email: action.payload.email, isStaff: action.payload.is_staff };
                state.token = action.payload.access;
                state.token_refresh = action.payload.refresh;
                saveToLocalStorage('user', state.user);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка при авторизации';
            })
            .addCase(register.rejected, (state, action) => {
                state.errorRegistered = `Ошибка при регистрации: ${action.error.message}`;
            })
    },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectAuth = (state: RootState) => state.auth;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
