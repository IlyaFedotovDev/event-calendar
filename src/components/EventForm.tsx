import { useAppSelector } from '@/hooks/useAppSelector';
import { useAddEventMutation } from '@/services/event';
import { selectAuth } from '@/store/slices/auth';
import { nanoid } from '@reduxjs/toolkit';
import { Button, Form, Input } from 'antd';
import React from 'react';
import SelectSearchUsers from './SelectSearchUsers';

interface EventFormPorps {
    date: string;
    disabled?: boolean;
}

const EventForm = ({ date, disabled }: EventFormPorps) => {
    const [addEvent, { isLoading: isLoadingAddEvent }] = useAddEventMutation();

    const { user } = useAppSelector(selectAuth);

    const [form] = Form.useForm();

    const onFinishHandler = async ({
        title,
        description,
        guests = [],
    }: {
        title: string;
        description: string;
        guests: string[];
    }) => {
        try {
            const newEvent = {
                autor: user.username,
                date: date,
                title,
                description,
                guests,
                id: nanoid(),
            };

            await addEvent(newEvent);
            form.resetFields();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Form
                form={form}
                name="event"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinishHandler}
                autoComplete="off"
                disabled={disabled}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input title',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input description',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Guests" name="guests">
                    <SelectSearchUsers />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 6 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoadingAddEvent}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default EventForm;
