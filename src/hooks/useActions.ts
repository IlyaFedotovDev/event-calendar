import { allActionCreators } from '@/store/allActionCreators';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useAppDispatch } from './useAppDispatch';

export const useActions = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators(allActionCreators, dispatch);
};
