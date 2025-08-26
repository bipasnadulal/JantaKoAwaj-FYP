'use client';
import React from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
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

export default function AdminOverviewCards() {
  // Later: These will be fetched from backend
  const stats = [
    {
      label: 'Total Complaints',
      count: 120,
      icon: <ReportProblemIcon />,
      color: 'blue',
    },
    {
      label: 'Assigned Complaints',
      count: 86,
      icon: <AssignmentIcon />,
      color: 'purple',
    },
    {
      label: 'Resolved Complaints',
      count: 41,
      icon: <CheckCircleIcon />,
      color: 'green',
    },
    {
      label: 'Pending Complaints',
      count: 33,
      icon: <HourglassEmptyIcon />,
      color: 'red',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          count={stat.count}
          color={stat.color}
        />
      ))}
    </div>
  );
}
