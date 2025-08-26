'use client';
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function AuthoritySidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { key: 'overview', label: 'Overview', icon: <DashboardIcon /> },
    { key: 'complaints', label: 'Complaints', icon: <ReportProblemIcon /> },
    { key: 'notifications', label: 'Notifications', icon: <NotificationsIcon /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-blue-600">Authority Panel</h2>
      </div>

      <nav className="p-4 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-left text-sm font-medium transition
              ${activeTab === tab.key
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
