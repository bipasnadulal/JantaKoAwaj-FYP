'use client';
import React, { useState } from 'react';
import ComplaintDetailDrawer from './ComplaintDetailDrawer';

const dummyComplaints = [
  {
    id: 1,
    title: 'School lacks benches',
    category: 'Education',
    status: 'pending',
    progress: 10,
    description: 'No benches and electricity in Ward 3 school',
    logs: ['Complaint submitted by user'],
  },
  {
    id: 2,
    title: 'Overflowing drainage',
    category: 'Environment',
    status: 'in-progress',
    progress: 50,
    description: 'Drainage clogged in market area',
    logs: ['Team dispatched'],
  },
];

export default function AuthorityComplaintsTable() {
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Assigned Complaints</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-2">Title</th>
              <th className="text-left px-4 py-2">Category</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Progress</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {dummyComplaints.map((complaint) => (
              <tr key={complaint.id} className="border-b">
                <td className="px-4 py-2 font-medium">{complaint.title}</td>
                <td className="px-4 py-2">{complaint.category}</td>
                <td className="px-4 py-2 capitalize">{complaint.status}</td>
                <td className="px-4 py-2">{complaint.progress}%</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedComplaint(complaint)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View / Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Complaint Drawer */}
      <ComplaintDetailDrawer
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
      />
    </div>
  );
}
