import React, { useEffect } from 'react';
import { ROUTEPATH } from '@/routes';
import { useNavigate } from 'react-router-dom';
import { Card, Layout, Row } from 'antd';
import style from './Ligin.module.scss';
import LoginForm from '@/components/LoginForm';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectAuth } from '@/store/slices/auth';

const Login = (): JSX.Element => {
    const { isAuthenticated } = useAppSelector(selectAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate(ROUTEPATH.EVENT, { replace: true });
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        document.title = `Login`;
    }, []);

    return (
        <Layout>
            <Row justify="center" align="middle" className={style.content}>
                <Card>
                    <LoginForm />
                </Card>
            </Row>
        </Layout>
    );
};

export default Login;
