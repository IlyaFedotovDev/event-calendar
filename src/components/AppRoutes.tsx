import Login from '@/pages/Login';
import Event from '@/pages/Events';
import { ROUTEPATH } from '@/routes';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import NotFound from '@/pages/NotFound';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path={ROUTEPATH.EVENT} element={<Event />} />
            </Route>

            <Route path={ROUTEPATH.LOGIN} element={<Login />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
