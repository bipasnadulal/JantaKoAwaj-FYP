'use client';
import React, { useState } from 'react';
import AdminSidebar from './adminComponents/AdminSidebar';
import AdminOverviewCards from './adminComponents/AdminOverviewCards';
import AdminComplaintsTable from './adminComponents/AdminComplaintsTable';
import AssignedAuthorities from './adminComponents/AssignedAuthorities';
// import ComplaintProgress from './adminComponents/ComplaintProgress';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-6 lg:px-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-600 capitalize">
            {activeTab === 'overview' && 'Admin Dashboard'}
            {activeTab === 'genuine' && 'Genuine Complaints'}
            {activeTab === 'assigned' && 'Assigned Authorities'}
            {activeTab === 'progress' && 'Follow-up & Progress'}
          </h1>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            <div className="bg-blue-500 text-white p-6 rounded-xl shadow mb-6">
              <h2 className="text-xl font-semibold">Welcome Admin</h2>
              <p className="text-sm text-blue-100">Monitor complaint flow and authority responses.</p>
            </div>
            <AdminOverviewCards />
          </>
        )}

        {activeTab === 'complaints' && <AdminComplaintsTable />}

        {activeTab === 'assigned' && <AssignedAuthorities />}

        {/* {activeTab === 'progress' && <ComplaintProgress />} */}
      </div>
    </div>
  );
}
