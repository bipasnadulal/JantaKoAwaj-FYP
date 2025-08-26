'use client';
import React from 'react';

const dummyNotifications = [
  { id: 1, message: 'Complaint #12 reached 50% votes threshold', time: '2h ago' },
  { id: 2, message: 'Complaint #7 marked as In Progress by Admin', time: '5h ago' },
  { id: 3, message: 'Complaint #19 exceeded 80% votes – urgent attention needed!', time: '1d ago' },
];

export default function NotificationsPanel() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Notifications</h2>
      <ul className="space-y-3">
        {dummyNotifications.map((note) => (
          <li
            key={note.id}
            className="border-b pb-2 text-sm text-gray-700"
          >
            <p>{note.message}</p>
            <span className="text-xs text-gray-500">{note.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
