'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';

export default function UserNotifications() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'status_change',
            title: 'Complaint Resolved',
            message: 'Your complaint "Streetlight not working in Ward-7" has been marked as resolved.',
            timestamp: '2025-07-10T08:45:00Z',
            read: false,
            priority: 'high',
        },
        {
            id: 2,
            type: 'system',
            title: 'Under Review',
            message: 'Your complaint "Garbage not collected" is currently under review.',
            timestamp: '2025-07-09T13:20:00Z',
            read: false,
            priority: 'medium',
        },
        {
            id: 3,
            type: 'complaint_update',
            title: 'Complaint Classified as Genuine',
            message: 'Our system has verified your complaint "Open sewer near school" as genuine.',
            timestamp: '2025-07-08T10:30:00Z',
            read: true,
            priority: 'medium',
        },
        {
            id: 4,
            type: 'complaint_update',
            title: 'Complaint Rejected',
            message: 'Your complaint "Water dripping from tap" was classified as spam and rejected.',
            timestamp: '2025-07-07T11:15:00Z',
            read: true,
            priority: 'low',
        },
        {
            id: 5,
            type: 'vote_received',
            title: 'Votes on Your Complaint',
            message: '12 people agreed with your complaint "Road blockage due to construction".',
            timestamp: '2025-07-06T09:10:00Z',
            read: false,
            priority: 'medium',
        },
        {
            id: 6,
            type: 'complaint_update',
            title: 'Public Poll Created',
            message: 'Your complaint "Speed bumps needed in Ward-9" has been posted as a public poll.',
            timestamp: '2025-07-05T15:00:00Z',
            read: true,
            priority: 'medium',
        },
    ]);


    const [filter, setFilter] = useState('all');

    const iconMap = {
        complaint_update: ChatBubbleOutlineIcon,
        vote_received: ThumbUpAltIcon,
        status_change: CheckCircleIcon,
        achievement: CheckCircleIcon,
        system: InfoOutlinedIcon,
    };

    const colorClass = (type, priority) => {
        if (priority === 'high') return 'text-red-600 bg-red-50 border-red-200';
        switch (type) {
            case 'complaint_update':
                return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'vote_received':
                return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'status_change':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'achievement':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'system':
                return 'text-gray-600 bg-gray-50 border-gray-200';
            default:
                return 'text-blue-600 bg-blue-50 border-blue-200';
        }
    };

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const filteredNotifications = notifications.filter((n) => {
        if (filter === 'unread') return !n.read;
        if (filter === 'high') return n.priority === 'high';
        return true;
    });

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <>
            <div className="p-6 pb-2">
                <Link
                    href="/complaintsPage"
                    className="text-blue-600 text-sm hover:underline flex items-center gap-1 font-medium"
                >
                    ← Back to Complaints
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm">

                <div className="px-6 pt-2 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <NotificationsIcon className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                                <p className="text-sm text-gray-600">
                                    {unreadCount > 0
                                        ? `${unreadCount} unread notifications`
                                        : 'All caught up!'}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                >
                                    <CheckCircleIcon style={{ fontSize: 16 }} />
                                    Mark all read
                                </button>
                            )}
                            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                <SettingsIcon style={{ fontSize: 20 }} />
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 mb-4">
                        {['all', 'unread', 'high'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${filter === type
                                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {type === 'all' && `All (${notifications.length})`}
                                {type === 'unread' && `Unread (${unreadCount})`}
                                {type === 'high' &&
                                    `High Priority (${notifications.filter((n) => n.priority === 'high').length})`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notification List */}
                <div className="p-6">
                    {filteredNotifications.length > 0 ? (
                        <div className="space-y-4">
                            {filteredNotifications.map((n) => {
                                const Icon = iconMap[n.type] || NotificationsIcon;
                                return (
                                    <div
                                        key={n.id}
                                        className={`relative p-4 rounded-lg border transition-all duration-200 ${n.read
                                                ? 'bg-gray-50 border-gray-200'
                                                : 'bg-white border-gray-300 shadow-sm'
                                            }`}
                                    >
                                        <div className="flex gap-4 items-start">
                                            <div className={`p-2 rounded-lg border ${colorClass(n.type, n.priority)}`}>
                                                <Icon style={{ fontSize: 20 }} />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className={`text-sm font-medium ${n.read ? 'text-gray-700' : 'text-gray-900'}`}>
                                                            {n.title}
                                                        </h4>
                                                        <p className={`text-sm mt-1 ${n.read ? 'text-gray-500' : 'text-gray-600'}`}>
                                                            {n.message}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-2">
                                                            {new Date(n.timestamp).toLocaleString()}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-2 ml-4">
                                                        {!n.read && (
                                                            <button
                                                                onClick={() => markAsRead(n.id)}
                                                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                                            >
                                                                Mark read
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => deleteNotification(n.id)}
                                                            className="p-1 text-gray-400 hover:text-red-600"
                                                        >
                                                            <CloseIcon style={{ fontSize: 16 }} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {n.priority === 'high' && (
                                                    <div className="mt-2">
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                            <ErrorOutlineIcon style={{ fontSize: 14 }} />
                                                            High Priority
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {!n.read && (
                                            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-600 rounded-full"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <NotificationsIcon style={{ fontSize: 48 }} className="text-gray-400 mb-4 mx-auto" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {filter === 'all' ? 'No notifications' : `No ${filter} notifications`}
                            </h3>
                            <p className="text-gray-600">
                                {filter === 'all'
                                    ? "You're all caught up! New notifications will appear here."
                                    : `No ${filter} notifications at the moment.`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};


