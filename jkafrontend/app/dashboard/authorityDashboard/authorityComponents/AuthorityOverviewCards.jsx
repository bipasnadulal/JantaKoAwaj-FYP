'use client';
import React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const StatCard = ({ icon, label, count, color }) => (
  <div className={`bg-${color}-50 text-${color}-800 rounded-xl p-5 shadow-sm flex items-center gap-4`}>
    <div className={`bg-${color}-100 text-${color}-700 p-3 rounded-full`}>
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-medium">{label}</h4>
      <p className="text-xl font-bold">{count}</p>
    </div>
  </div>
);

export default function AuthorityOverviewCards() {
  // Dummy stats for now
  const stats = [
    { label: 'Total Complaints', count: 18, icon: <AssignmentIcon />, color: 'blue' },
    { label: 'Resolved Complaints', count: 7, icon: <CheckCircleIcon />, color: 'green' },
    { label: 'Pending Complaints', count: 6, icon: <HourglassEmptyIcon />, color: 'red' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
