import { useLoginMutation } from '@/services/auth';
import { Alert, Button, Form, Input } from 'antd';
import React, { useState } from 'react';

const LoginForm = () => {
    const [login, { isLoading }] = useLoginMutation();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onFinishHandler = async () => {
        setErrorMessage(null);

        try {
            const { success, error } = await login({
                username,
                password,
            }).unwrap();

            if (!success && error) {
                setErrorMessage(error);
            }
        } catch {
            setErrorMessage('An error has occurred. Try again');
        }
    };

    return (
        <Form
            name="login"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinishHandler}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: 'Please input your username!' },
                ]}
            >
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                ]}
            >
                <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 6 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>

            {errorMessage && <Alert type="error" message={errorMessage} />}
        </Form>
    );
};

export default LoginForm;
