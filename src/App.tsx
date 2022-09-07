import '@/styles/global.scss';
import 'antd/dist/antd.css';
import Header from './components/Header';
import AppRoutes from './components/AppRoutes';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { useActions } from './hooks/useActions';

export default function App() {
    const { setAuth, setUser } = useActions();

    useEffect(() => {
        const savedStateAuth = localStorage.getItem('auth');
        if (savedStateAuth) {
            const parsedSavedStateAuth = JSON.parse(savedStateAuth);
            setUser(parsedSavedStateAuth.user);
            setAuth(true);
        }
    }, [setUser, setAuth]);

    return (
        <Layout>
            <Header />
            <Layout.Content>
                <AppRoutes />
            </Layout.Content>
        </Layout>
    );
}
