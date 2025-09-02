'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const StatCard = ({ icon, label, count, color, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-${color}-50 text-${color}-800 rounded-xl p-5 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition`}
  >
    <div className={`bg-${color}-100 text-${color}-700 p-3 rounded-full`}>
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-medium">{label}</h4>
      <p className="text-xl font-bold">{count}</p>
    </div>
  </div>
);

export default function AuthorityOverviewCards({ setActiveTab, setComplaintStatus }) {
  const router = useRouter();
  const [counts, setCounts] = useState({ all: 0, resolved: 0, pending: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/complaints/counts/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch counts');
        const data = await res.json();
        setCounts({
          all: data.total,
          resolved: data.resolved,
          pending: data.pending,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    { label: 'Total Complaints', count: counts.all, icon: <AssignmentIcon />, color: 'blue', status: 'all' },
    { label: 'Resolved Complaints', count: counts.resolved, icon: <CheckCircleIcon />, color: 'green', status: 'resolved' },
    { label: 'Pending Complaints', count: counts.pending, icon: <HourglassEmptyIcon />, color: 'red', status: 'pending' },
  ];

  const handleCardClick = (status) => {
    if (status === 'all') {
      setActiveTab('complaints');  
    } else {
      setComplaintStatus(status);  
      setActiveTab('complaints_status'); 
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          {...stat}
          onClick={() => handleCardClick(stat.status)}
        />
      ))}
    </div>
  );
}
