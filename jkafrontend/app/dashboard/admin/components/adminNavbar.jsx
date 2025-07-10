// app/dashboard/admin/components/AdminNav.jsx
import React from 'react';
import Link from 'next/link';

export default function AdminNavbar() {
  return (
    <nav className="flex gap-4 mb-6 border-b pb-2">
      <Link href="/dashboard/admin">
        <span className="text-blue-600 font-medium hover:underline cursor-pointer">Complaints</span>
      </Link>
      <Link href="/dashboard/admin/users">
        <span className="text-blue-600 font-medium hover:underline cursor-pointer">Users</span>
      </Link>
      <Link href="/dashboard/admin/reports">
        <span className="text-blue-600 font-medium hover:underline cursor-pointer">Reports</span>
      </Link>
      <Link href="/">
        <span className="text-gray-500 hover:text-blue-500 font-medium ml-auto cursor-pointer">🏠 Go Home</span>
      </Link>
    </nav>
  );
}
