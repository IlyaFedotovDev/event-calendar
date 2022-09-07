import { Navigate, Outlet } from 'react-router-dom';
import { ROUTEPATH } from '@/routes';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectAuth } from '@/store/slices/auth';

const PrivateRoutes = () => {
    const { isAuthenticated } = useAppSelector(selectAuth);

    return isAuthenticated ? <Outlet /> : <Navigate to={ROUTEPATH.LOGIN} />;
};

export default PrivateRoutes;
