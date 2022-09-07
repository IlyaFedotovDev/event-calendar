import EventCalendar from '@/components/EventsCalendar';
import { Layout } from 'antd';
import React, { useEffect } from 'react';

const Event = (): JSX.Element => {
    useEffect(() => {
        document.title = `Event`;
    }, []);

    return (
        <Layout>
            <EventCalendar />
        </Layout>
    );
};

export default Event;
