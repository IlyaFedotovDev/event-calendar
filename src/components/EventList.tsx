import { IEvent } from '@/models/IEvent';
import { Badge, Card, Space, Typography } from 'antd';
import React from 'react';

interface EventsListProps {
    events: IEvent[];
}

const EventList = ({ events }: EventsListProps) => {
    if (!events.length) {
        return (
            <Typography.Paragraph>
                Add an event for this day
            </Typography.Paragraph>
        );
    }

    return (
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
            {events.map((event) => {
                return (
                    <Card key={event.id}>
                        <Typography.Title level={2}>
                            <Badge color="blue" text={event.title} />
                        </Typography.Title>

                        <Typography.Paragraph>
                            {event.description}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            {'Autor: ' + event.autor}
                        </Typography.Paragraph>
                        {event.guests.length ? (
                            <Typography.Paragraph>
                                {'Guest: ' + event.guests.join(', ')}
                            </Typography.Paragraph>
                        ) : null}
                    </Card>
                );
            })}
        </Space>
    );
};

export default EventList;
