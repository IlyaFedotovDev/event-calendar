import { Badge, Calendar, Card, Modal, Space, Spin, Tabs } from 'antd';
import React, { useState } from 'react';
import type { Moment } from 'moment';
import moment from 'moment';
import { useGetUserEventsQuery } from '@/services/event';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectAuth } from '@/store/slices/auth';
import EventForm from './EventForm';
import { IEvent } from '@/models/IEvent';
import style from './EventsCalendar.module.scss';
import EventList from './EventList';

const eventFormatDate = 'D M YYYY';

const EventCalendar = () => {
    const [prevDate, setPrevDate] = useState<{ year: number; month: number }>({
        year: moment().year(),
        month: moment().month(),
    });
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [isBeforeDate, setIsBeforeDate] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Moment>(moment());

    const { user } = useAppSelector(selectAuth);

    const { data: userEvents, isLoading: isLoadingEvents } =
        useGetUserEventsQuery(user.username);

    const selectedMonthOrYear = (mom: Moment) => {
        const result =
            mom.month() !== prevDate.month || mom.year() !== prevDate.year;

        setPrevDate({
            year: mom.year(),
            month: mom.month(),
        });

        return result;
    };

    const onSelectHandler = (selectedMom: Moment) => {
        if (selectedMonthOrYear(selectedMom)) return;

        setSelectedDate(selectedMom);

        setIsBeforeDate(selectedMom.isBefore(moment(), 'day'));

        setModalVisible(true);
    };

    const getListEventsByDate = (mom: Moment) => {
        const listData: IEvent[] = [];

        userEvents?.forEach((event) => {
            event.date === mom.format(eventFormatDate) && listData.push(event);
        });

        return listData;
    };

    const dateCellRender = (value: Moment) => {
        const listData = getListEventsByDate(value);
        return (
            <Space direction="vertical">
                {listData.map((event) => (
                    <Badge key={event.id} color="blue" text={event.title} />
                ))}
            </Space>
        );
    };

    if (isLoadingEvents)
        return (
            <div className={style.loading}>
                <Spin size="large" />
            </div>
        );

    return (
        <div className={style.container}>
            <Card>
                <Calendar
                    onSelect={onSelectHandler}
                    dateCellRender={dateCellRender}
                />
            </Card>

            <Modal
                title={selectedDate.format('D MMMM YYYY')}
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <Tabs defaultActiveKey="item-1">
                    <Tabs.TabPane tab="Events" key="item-1">
                        <EventList
                            events={
                                modalVisible
                                    ? getListEventsByDate(selectedDate)
                                    : []
                            }
                        />
                    </Tabs.TabPane>

                    <Tabs.TabPane
                        tab="Add Event"
                        key="item-2"
                        disabled={isBeforeDate}
                    >
                        <EventForm
                            date={selectedDate.format(eventFormatDate)}
                            disabled={isBeforeDate}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
        </div>
    );
};

export default EventCalendar;
