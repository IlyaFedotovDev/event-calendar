import { IUserData, USERS } from '@/mockDB/users';
import IUser from '@/models/IUser';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IRequestLogin {
    username: string;
    password: string;
}

export interface IResponseLogin {
    success: boolean;
    user: IUser;
    error?: string;
}

// fake api

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/auth',
    }),

    endpoints: (builder) => ({
        login: builder.mutation<IResponseLogin, IRequestLogin>({
            // query: (data) => ({ url: `/login`, method: 'POST', body: data }),
            queryFn: (data) => {
                return new Promise((resolve) => {
                    const findedUser = USERS.find((user: IUserData) => {
                        return (
                            user.username === data.username &&
                            user.password === data.password
                        );
                    });
                    setTimeout(() => {
                        if (findedUser) {
                            const { id, email, username } = findedUser;
                            const user: IUser = { id, email, username };
                            resolve({
                                data: {
                                    user,
                                    success: true,
                                },
                            });
                        } else {
                            resolve({
                                data: {
                                    success: false,
                                    user: { id: '', username: '', email: '' },
                                    error: 'Incorrect username or password',
                                },
                            });
                        }
                    }, 2000);
                });
            },
        }),

        logout: builder.query<{ success: boolean }, void>({
            // query: () => `/logout`,
            queryFn: () => {
                return new Promise((resolve) => {
                    setTimeout(() => resolve({ data: { success: true } }), 800);
                });
            },
        }),
    }),
});

export const { useLoginMutation, useLazyLogoutQuery } = authAPI;
