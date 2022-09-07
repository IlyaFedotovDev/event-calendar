import { USERS } from '@/mockDB/users';
import IUser from '@/models/IUser';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/users',
    }),

    endpoints: (builder) => ({
        getUsersByUsername: builder.query<IUser[], string>({
            queryFn: (username) => {
                return new Promise((resolve) => {
                    const reg = new RegExp(username, 'i');
                    const findedUsers = USERS.filter((user) => {
                        return reg.test(user.username);
                    });
                    setTimeout(() => {
                        resolve({
                            data: findedUsers,
                        });
                    }, 2000);
                });
            },
        }),

        getUsers: builder.query<IUser[] | [], number | void>({
            queryFn: (number) => {
                return new Promise((resolve) => {
                    const findedUsers = USERS.slice(0, number || 10);
                    setTimeout(() => {
                        resolve({
                            data: findedUsers,
                        });
                    }, 2000);
                });
            },
        }),
    }),
});

export const { useLazyGetUsersByUsernameQuery, useGetUsersQuery } = userAPI;
