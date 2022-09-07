import { nanoid } from '@reduxjs/toolkit';

export interface IUserData {
    id: string;
    username: string;
    email: string;
    password: string;
}

export const USERS: IUserData[] = [
    {
        id: nanoid(),
        username: 'user',
        email: '',
        password: '123',
    },
    {
        id: nanoid(),
        username: 'Adrian',
        email: '',
        password: '123',
    },
    {
        id: nanoid(),
        username: 'Liam',
        email: '',
        password: '123',
    },
    {
        id: nanoid(),
        username: 'Ethan',
        email: '',
        password: '123',
    },
    {
        id: nanoid(),
        username: 'Michael',
        email: '',
        password: '123',
    },
    {
        id: nanoid(),
        username: 'Adam',
        email: '',
        password: '123',
    },
    {
        id: nanoid(),
        username: 'Noah',
        email: '',
        password: '123',
    },
    {
        id: nanoid(),
        username: 'Oliver',
        email: '',
        password: '123',
    },
    {
        id: nanoid(),
        username: 'William',
        email: '',
        password: '123',
    },
    {
        id: nanoid(),
        username: 'Isabella',
        email: '',
        password: '123',
    },
    {
        id: nanoid(),
        username: 'Mia',
        email: '',
        password: '123',
    },
    {
        id: nanoid(),
        username: 'Evelyn',
        email: '',
        password: '123',
    },
    {
        id: nanoid(),
        username: 'Harper',
        email: '',
        password: '123',
    },
];
