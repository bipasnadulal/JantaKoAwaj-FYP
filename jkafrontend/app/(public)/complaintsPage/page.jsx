'use client';
import React, { useState } from 'react';
import ComplaintCard from '@/app/components/ComplaintCards';



const initialComplaints = [
  {
    id: 1,
    title: 'Street lights not working',
    description: 'Street lights not working near the hospital.',
    category: 'Public Infrastructure',
    status: 'in-progress',
    createdAt: '2025-06-30T10:30:00Z',
    location: 'Kathmandu, Ward 7, Bagmati',
    agreeVotes: 24,
    disagreeVotes: 6,
    userVote: null,
    progressLogs: [
      {
        date: '2025-07-01',
        action: 'Complaint reviewed by admin',
        description: 'Initial review done. Found to be valid and assigned to Kathmandu Infrastructure Office.',
        file: null
      },
      {
        date: '2025-07-03',
        action: 'Field inspection done',
        description: 'Site visit completed by municipal engineers. Issue verified.',
        file: '/uploads/site_inspection.pdf'
      },
      {
        date: '2025-07-06',
        action: 'Repair initiated',
        description: 'Work started for replacing faulty streetlights.',
        file: '/uploads/work_plan.jpg'
      }
    ]
  },
  {
    id: 2,
    title: 'Garbage not collected',
    description: 'Garbage not collected for a week in our neighborhood.',
    category: 'Environment',
    status: 'pending',
    createdAt: '2025-06-28T09:00:00Z',
    location: 'Butwal, Ward 3, Lumbini',
    agreeVotes: 18,
    disagreeVotes: 2,
    userVote: null,
    progressLogs : []
  },
];

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [filters, setFilters] = useState({ category: '', status: '', sort: '' });
  const isLoggedIn = false; // Replace with your actual login check
  // const router = useRouter();

  const handleVote = async (complaintId, voteType) => {
    setComplaints((prev) =>
      prev.map((complaint) => {
        if (complaint.id !== complaintId) return complaint;
        const alreadyVoted = complaint.userVote === voteType;
        return {
          ...complaint,
          agreeVotes: voteType === 'agree' ? complaint.agreeVotes + (alreadyVoted ? -1 : 1) : complaint.agreeVotes,
          disagreeVotes: voteType === 'disagree' ? complaint.disagreeVotes + (alreadyVoted ? -1 : 1) : complaint.disagreeVotes,
          userVote: alreadyVoted ? null : voteType,
        };
      })
    );
  };

  const handleNewComplaint = () => {
    if (!isLoggedIn) {
      alert('Oops! You are not logged in. Please log in to submit a complaint.');
      return;
    }
    window.location.href = '/submitComplaintForm'; 
  };

  const filteredComplaints = complaints
    .filter((c) => (!filters.category || c.category === filters.category) &&
                   (!filters.status || c.status === filters.status))
    .sort((a, b) => (filters.sort === 'mostVoted' ? b.agreeVotes - a.agreeVotes : 0));

  return (
    <section className="min-h-screen bg-blue-50 py-10 px-4 lg:px-36 mt-32">
      {/* Title and Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-black-700 text-center md:text-left">
          Voice Your Concerns, Drive Change
        </h1>
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow transition"
          onClick={handleNewComplaint}
        >
          <span className="text-xl">+</span> Add New Complaint
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="px-4 py-2 rounded border border-gray-300"
        >
          <option value="">All Categories</option>
          <option value="Public Infrastructure">Public Infrastructure</option>
          <option value="Environment">Environment</option>
          <option value="Municipal Guard">Municipal Guard</option>
          <option value="Education">Education</option>
          <option value="Agriculture and Livestocks">Agriculture and Livestocks</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-4 py-2 rounded border border-gray-300"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="px-4 py-2 rounded border border-gray-300"
        >
          <option value="">Sort By</option>
          <option value="mostVoted">Most Voted</option>
        </select>
      </div>

      {/* Complaint Display */}
      <div className="space-y-8">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} onVote={handleVote} />
          ))
        ) : (
          <p className="text-center text-gray-600">No complaints match your filters.</p>
        )}
      </div>
    </section>
  );
}
