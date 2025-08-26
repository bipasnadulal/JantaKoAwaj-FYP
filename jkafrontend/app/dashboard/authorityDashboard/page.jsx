'use client';
import React, { useState } from 'react';
import AuthoritySidebar from './authorityComponents/AuthoritySidebar';
import AuthorityOverviewCards from './authorityComponents/AuthorityOverviewCards';
import AuthorityComplaintsTable from './authorityComponents/AuthorityComplaintsTable';
import NotificationsPanel from './authorityComponents/NotificationsPanel';

export default function AuthorityDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AuthoritySidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-6 lg:px-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-600 capitalize">
            {activeTab === 'overview' && 'Authority Dashboard'}
            {activeTab === 'complaints' && 'Assigned Complaints'}
            {activeTab === 'notifications' && 'Notifications'}
          </h1>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            <div className="bg-blue-500 text-white p-6 rounded-xl shadow mb-6">
              <h2 className="text-xl font-semibold">Welcome Authority</h2>
              <p className="text-sm text-blue-100">Handle assigned complaints with transparency.</p>
            </div>
            <AuthorityOverviewCards/>
          </>
        )}

        {activeTab === 'complaints' && <AuthorityComplaintsTable />}
        {activeTab === 'notifications' && <NotificationsPanel />}
      </div>
    </div>
  );
}
