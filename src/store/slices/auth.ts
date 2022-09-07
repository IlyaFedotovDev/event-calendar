import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import IUser from '@/models/IUser';
import { authAPI, IResponseLogin } from '@/services/auth';
import { RootState } from '../index';

export interface IAuthState {
    user: IUser;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string;
}

const initialState: IAuthState = {
    user: { id: '', username: '', email: '' },
    isAuthenticated: false,
    isLoading: false,
    error: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setError: (state, actions: PayloadAction<string>) => {
            state.error = actions.payload;
        },
        logout: () => {
            localStorage.removeItem('auth');
            return initialState;
        },
    },
    extraReducers(builder) {
        builder.addMatcher(authAPI.endpoints.login.matchPending, (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(
            authAPI.endpoints.login.matchFulfilled,
            (state, { payload }: PayloadAction<IResponseLogin>) => {
                if (payload.success) {
                    state.user = payload.user;
                    state.error = '';
                    state.isAuthenticated = true;
                    localStorage.setItem('auth', JSON.stringify(state));
                }
                state.isLoading = false;
            },
        );
        builder.addMatcher(authAPI.endpoints.login.matchRejected, (state) => {
            state.isLoading = false;
        });

        builder.addMatcher(authAPI.endpoints.logout.matchFulfilled, () => {
            localStorage.removeItem('auth');
            return initialState;
        });
    },
});

export const { reducer: authReducer, actions: authActions } = authSlice;

export const selectAuth = (state: RootState) => state.auth;
