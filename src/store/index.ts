import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authReducer } from './slices/auth';
import { authAPI } from '@/services/auth';
import { eventAPI } from '@/services/event';
import { userAPI } from '@/services/user';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [eventAPI.reducerPath]: eventAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authAPI.middleware,
            eventAPI.middleware,
            userAPI.middleware,
        ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
