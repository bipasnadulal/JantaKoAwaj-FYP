'use client';
import React from 'react';

const activityLog = [
  { date: '2025-07-08', action: 'Posted a new complaint: Streetlight issue' },
  { date: '2025-07-09', action: 'Voted Agree on complaint: Road Potholes' },
  { date: '2025-07-10', action: 'Complaint resolved: Garbage Issue' },
];

export default function RecentActivity() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
      <ul className="space-y-3">
        {activityLog.map((item, idx) => (
          <li key={idx} className="text-sm text-gray-600">
            <span className="font-medium text-blue-600">{item.date}:</span> {item.action}
          </li>
        ))}
      </ul>
    </div>
  );
}
