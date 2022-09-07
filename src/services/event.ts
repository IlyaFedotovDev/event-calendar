import { EVENTS } from '@/mockDB/events';
import { IEvent } from '@/models/IEvent';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventAPI = createApi({
    reducerPath: 'eventAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/events',
    }),
    tagTypes: ['Events'],

    endpoints: (builder) => ({
        getUserEvents: builder.query<IEvent[], string>({
            queryFn: (username) => {
                return new Promise((resolve) => {
                    const userEvents = EVENTS.filter((event) => {
                        return (
                            event.autor === username ||
                            event.guests.includes(username)
                        );
                    });
                    setTimeout(() => {
                        resolve({
                            data: userEvents,
                        });
                    }, 2000);
                });
            },
            providesTags: ['Events'],
        }),

        addEvent: builder.mutation<boolean, IEvent>({
            queryFn: (event) => {
                return new Promise((resolve) => {
                    EVENTS.push(event);
                    localStorage.setItem('events', JSON.stringify(EVENTS));
                    setTimeout(() => {
                        resolve({
                            data: true,
                        });
                    }, 2000);
                });
            },
            invalidatesTags: ['Events'],
        }),
    }),
});

export const { useGetUserEventsQuery, useAddEventMutation } = eventAPI;
