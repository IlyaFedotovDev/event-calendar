import { IEvent } from '@/models/IEvent';
import { nanoid } from '@reduxjs/toolkit';

export let EVENTS: IEvent[] = [
    {
        autor: 'user',
        date: '7 9 2022',
        title: 'test title',
        description: 'test description',
        id: nanoid(),
        guests: ['Adam', 'Adrian'],
    },
    {
        autor: 'user',
        date: '7 9 2022',
        title: 'test title',
        description: 'test description',
        id: nanoid(),
        guests: ['Adam'],
    },
    {
        autor: 'user',
        date: '7 9 2022',
        title: 'test title',
        description: 'test description',
        id: nanoid(),
        guests: ['Adrian'],
    },
    {
        autor: 'user',
        date: '7 9 2022',
        title: 'test title',
        description: 'test description',
        id: nanoid(),
        guests: [],
    },
    {
        autor: 'user',
        date: '7 9 2022',
        title: 'test title',
        description: 'test description',
        id: nanoid(),
        guests: [],
    },
];

if (localStorage.getItem('events')) {
    EVENTS = [...JSON.parse(localStorage.getItem('events') as string)];
}
