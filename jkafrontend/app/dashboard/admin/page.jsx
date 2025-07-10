// app/dashboard/admin/page.jsx
'use client';
import React from 'react';
import AdminNavbar from './components/adminNavbar';

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 px-4 lg:px-10 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-lg mb-4">Welcome back, Admin. Here's the latest on community issues.</p>

      <AdminNavbar/>

      {/* Main dashboard content goes here: complaints list, stats, etc. */}
    </main>
  );
}
