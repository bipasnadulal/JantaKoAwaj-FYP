'use client';
import React, { useState } from 'react';
import ComplaintDetailDrawer from './ComplaintDetailDrawer';

const dummyComplaints = [
  {
    id: 1,
    title: 'Lack of proper school facilities',
    description: 'Local school lacks benches and electricity.',
    category: 'Education',
    assignedAuthority: 'Education',
    status: 'pending',
    location: 'Ward 3, Kathmandu',
    progress: 10,
    progressLogs: ['Reported by citizen', 'Assigned to Education Dept.'],
  },
  {
    id: 2,
    title: 'Illegal tree cutting in community forest',
    description: 'Unauthorized deforestation noticed recently.',
    category: 'Environment',
    assignedAuthority: 'Environment',
    status: 'in-progress',
    location: 'Ward 7, Bhaktapur',
    progress: 45,
    progressLogs: ['Initial report submitted', 'Investigation started'],
  },
  {
    id: 3,
    title: 'Irregular patrolling in public parks',
    description: 'Safety issues due to lack of security guards.',
    category: 'Municipal Guard',
    assignedAuthority: 'Municipal Guard',
    status: 'resolved',
    location: 'Ward 2, Lalitpur',
    progress: 100,
    progressLogs: ['Complaint received', 'Guards deployed'],
  },
  {
    id: 4,
    title: 'Diseased crops due to poor support',
    description: 'No pesticides or fertilizers provided for months.',
    category: 'Agriculture and Livestock',
    assignedAuthority: 'Agriculture and Livestock',
    status: 'in-progress',
    location: 'Ward 1, Nuwakot',
    progress: 50,
    progressLogs: ['Inspected field', 'Sent notice to supplier'],
  },
  {
    id: 5,
    title: 'Broken road in residential area',
    description: 'Potholes and poor drainage causing accidents.',
    category: 'Public Infrastructure',
    assignedAuthority: 'Public Infrastructure',
    status: 'pending',
    location: 'Ward 4, Pokhara',
    progress: 0,
    progressLogs: [],
  },
  {
    id: 6,
    title: 'Overflowing drainage in market',
    description: 'Health risk due to poor drainage.',
    category: 'Environment',
    assignedAuthority: 'Environment',
    status: 'in-progress',
    location: 'Ward 6, Kathmandu',
    progress: 70,
    progressLogs: ['Team dispatched', 'Partial cleanup done'],
  },
];

const authorities = [
  'All',
  'Education',
  'Environment',
  'Municipal Guard',
  'Agriculture and Livestock',
  'Public Infrastructure',
];

export default function ComplaintsTable() {
  const [filterAuthority, setFilterAuthority] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredComplaints = dummyComplaints.filter(
    (complaint) =>
      filterAuthority === 'All' || complaint.assignedAuthority === filterAuthority
  );

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Complaints Table</h2>
          <select
            value={filterAuthority}
            onChange={(e) => setFilterAuthority(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            {authorities.map((auth) => (
              <option key={auth} value={auth}>
                {auth}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="text-left px-4 py-2">Title</th>
                <th className="text-left px-4 py-2">Category</th>
                <th className="text-left px-4 py-2">Assigned To</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Progress</th>
                <th className="text-left px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id} className="border-b">
                  <td className="px-4 py-2 font-medium">{complaint.title}</td>
                  <td className="px-4 py-2">{complaint.category}</td>
                  <td className="px-4 py-2">{complaint.assignedAuthority}</td>
                  <td className="px-4 py-2 capitalize">{complaint.status}</td>
                  <td className="px-4 py-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          complaint.progress === 100
                            ? 'bg-green-500'
                            : complaint.progress >= 50
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${complaint.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleViewDetails(complaint)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredComplaints.length === 0 && (
                <tr>
                  <td className="px-4 py-3 text-center text-gray-500" colSpan="6">
                    No complaints found for this authority.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer Component */}
      <ComplaintDetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        complaint={selectedComplaint}
      />
    </>
  );
}
