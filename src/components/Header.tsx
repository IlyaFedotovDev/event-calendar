import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTEPATH } from '@/routes/index';
import { Row, Col, Layout, Button, Avatar, Space } from 'antd';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectAuth } from '@/store/slices/auth';
import { useLazyLogoutQuery } from '@/services/auth';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [logout, { isFetching: isFetchingLogout }] = useLazyLogoutQuery();

    const { user, isAuthenticated } = useAppSelector(selectAuth);

    const onClickLogout = () => {
        logout();
    };

    const onClickLogin = () => {
        if (location.pathname !== ROUTEPATH.LOGIN) navigate(ROUTEPATH.LOGIN);
    };

    return (
        <Layout.Header>
            <Row justify="end">
                <Col>
                    {isAuthenticated ? (
                        <Space>
                            <Avatar>{user?.username}</Avatar>

                            <Button
                                type="primary"
                                onClick={onClickLogout}
                                loading={isFetchingLogout}
                            >
                                Log out
                            </Button>
                        </Space>
                    ) : (
                        <Button onClick={onClickLogin}>Log in</Button>
                    )}
                </Col>
            </Row>
        </Layout.Header>
    );
};

export default Header;
