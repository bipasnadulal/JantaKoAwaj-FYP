'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from './userCompoments/Sidebar';
import OverviewCards from './userCompoments/OverviewCards';
import StatusOverview from './userCompoments/StatusOverview';
import RecentActivity from './userCompoments/RecentActivity';
import Profile from './userCompoments/Profile';
import UserComplaints from './userCompoments/UserComplaints';
import AddIcon from '@mui/icons-material/Add';
import VotingHistory from './userCompoments/VotingHistory';
import UserNotifications from './userCompoments/UserNotifications';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-6 lg:px-10">
        {/* Top Header (except profile) */}
        {activeTab !== 'profile' && (
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600 capitalize">
              {activeTab === 'overview' && (
                <Link
                  href="/complaintsPage"
                  className="text-blue-600 text-sm hover:underline flex items-center gap-1 font-medium"
                >
                  ← Back to Complaints
                </Link>
              )}
            </h1>

            {/* Add Complaint Button only on Overview */}
            {activeTab === 'overview' && (
              <Link
                href="/submitComplaintForm"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-blue-700 transition"
              >
                <AddIcon fontSize="small" />
                Add New Complaint
              </Link>
            )}
          </div>
        )}

        {/* Main Tab Content */}
        {activeTab === 'overview' && (
          <>
            <div className="bg-blue-500 text-white p-6 rounded-xl shadow mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Welcome back, Ram KC</h2>
                  <p className="text-sm text-blue-100">You've made a positive impact in your community.</p>
                </div>
              </div>
            </div>
            <OverviewCards />
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <StatusOverview />
              <RecentActivity />
            </div>
          </>
        )}

        {activeTab === 'profile' && (
          <div className="w-full">
            <Profile />
          </div>
        )}

        {activeTab === 'complaints' && (
          <div className="w-full">
            <UserComplaints />
          </div>
        )}

        {/* Placeholder for Voting History */}
        {activeTab === 'voting' && (
          <div className="w-full   ">
            <VotingHistory/>
          </div>
        )}

        {/* Placeholder for Notifications */}
        {activeTab === 'notifications' && (
          <div className="w-full">
            <UserNotifications/>
          </div>
        )}
      </div>
    </div>
  );
}
