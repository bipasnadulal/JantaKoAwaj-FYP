
'use client';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function AuthorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;


  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/authority/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications(res.data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); 
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  
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

  
  const markAsRead = async (id) => {
    if (!token) return;
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/authority/read/${id}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    if (!token) return;
    try {
      await Promise.all(
        notifications.filter((n) => !n.read).map((n) =>
          axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/authority/read/${id}/`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
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

  if (loading) {
    return <div className="p-4 text-gray-500">Loading notifications...</div>;
  }

  return (
    <div>
      <div className="p-6 pb-2">
        <Link
          href="/dashboard/authorityDashboard"
          className="text-blue-600 text-sm hover:underline flex items-center gap-1 font-medium"
        >
          ← Back to Dashboard
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
                <h2 className="text-xl font-bold text-gray-900">Authority Notifications</h2>
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

         
          <div className="flex gap-2 mb-4">
            {['all', 'unread', 'high'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === type
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

        
        <div className="p-6">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map((n) => {
                const Icon = iconMap[n.type] || NotificationsIcon;
                return (
                  <div
                    key={n.id}
                    className={`relative p-4 rounded-lg border transition-all duration-200 ${
                      n.read
                        ? 'bg-gray-50 border-gray-200'
                        : 'bg-white border-gray-300 shadow-sm'
                    }`}
                  >
                    <div className="flex gap-4 items-start">
                      <div
                        className={`p-2 rounded-lg border ${colorClass(
                          n.type,
                          n.priority
                        )}`}
                      >
                        <Icon style={{ fontSize: 20 }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4
                              className={`text-sm font-medium ${
                                n.read ? 'text-gray-700' : 'text-gray-900'
                              }`}
                            >
                              {n.title || 'Notification'}
                            </h4>
                            <p
                              className={`text-sm mt-1 ${
                                n.read ? 'text-gray-500' : 'text-gray-600'
                              }`}
                            >
                              {n.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {n.created_at
                                ? new Date(n.created_at).toLocaleString()
                                : 'No date'}
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
              <NotificationsIcon
                style={{ fontSize: 48 }}
                className="text-gray-400 mb-4 mx-auto"
              />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'all'
                  ? 'No notifications'
                  : `No ${filter} notifications`}
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
    </div>
  );
}


