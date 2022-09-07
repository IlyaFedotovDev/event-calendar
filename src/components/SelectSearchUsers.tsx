import { useAppSelector } from '@/hooks/useAppSelector';
import IUser from '@/models/IUser';
import {
    useGetUsersQuery,
    useLazyGetUsersByUsernameQuery,
} from '@/services/user';
import { selectAuth } from '@/store/slices/auth';
import debounce from '@/utils/debaunce';
import { Select, Spin } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { SelectProps } from 'antd/es/select';

interface selectOptions {
    label: string;
    value: string;
}

function SelectSearchUsers<T>({ children, ...props }: SelectProps<T>) {
    const [options, setOptions] = useState<selectOptions[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');

    const { user } = useAppSelector(selectAuth);

    const {
        data: randomUsers,
        isLoading: isUsersLoading,
        isSuccess: isUsersLoaded,
    } = useGetUsersQuery();

    const [
        getUsersByUsername,
        {
            isSuccess: isUserByUsernameLoaded,
            isFetching: isFetchingUserByUsername,
            data: usersByUsername,
        },
    ] = useLazyGetUsersByUsernameQuery();

    const prepareOptions = useCallback(
        (users: IUser[]) => {
            const options = users
                .filter((u) => u.username !== user.username)
                .map((u) => {
                    return { label: u.username, value: u.username };
                });
            return options;
        },
        [user.username],
    );

    useEffect(() => {
        if (searchValue === '' && isUsersLoaded) {
            const options = prepareOptions(randomUsers);
            setOptions(options);
        }
    }, [
        searchValue,
        randomUsers,
        isUsersLoaded,
        user.username,
        prepareOptions,
    ]);

    useEffect(() => {
        if (searchValue !== '' && isUserByUsernameLoaded) {
            const options = prepareOptions(usersByUsername as IUser[]);
            setOptions(options);
        }
    }, [searchValue, isUserByUsernameLoaded, usersByUsername, prepareOptions]);

    const debaunceGetUserByUsername = useMemo(() => {
        return debounce<(value: string) => void>((value) => {
            console.log(1);
            getUsersByUsername(value);
        }, 800);
    }, [getUsersByUsername]);

    const onSearcHandler = (value: string) => {
        setSearchValue(value);
        if (value !== '') {
            setOptions([]);
            debaunceGetUserByUsername(value);
        }
    };

    return (
        <Select<T>
            mode="multiple"
            allowClear
            placeholder="Select guests"
            searchValue={searchValue}
            autoClearSearchValue={true}
            loading={isUsersLoading || isFetchingUserByUsername}
            onSearch={onSearcHandler}
            notFoundContent={
                isUsersLoading || isFetchingUserByUsername ? (
                    <Spin size="small" />
                ) : null
            }
            options={options}
            {...props}
        >
            {children}
        </Select>
    );
}

export default SelectSearchUsers;
