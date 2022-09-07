import { Layout, Typography } from 'antd';
import React, { useEffect } from 'react';

const NotFound = (): JSX.Element => {
    useEffect(() => {
        document.title = `Page not found`;
    }, []);

    return (
        <Layout
            style={{
                height: 'calc(100vh - var(--header-height))',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography.Title>Page not found</Typography.Title>
        </Layout>
    );
};

export default NotFound;
