'use client';
import React, { useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ComplaintCard from '@/app/components/ComplaintCards';
import Link from 'next/link';

const dummyComplaints = [
  {
    id: 1,
    title: 'Overflowing Garbage',
    description: 'Trash hasn’t been picked up in 5 days.',
    category: 'Public Infrastructure',
    status: 'pending',
    location: 'Kathmandu',
    agreeVotes: 10,
    disagreeVotes: 5,
    userVote: null,
    createdAt: '2025-07-01T10:00:00Z',
    isOwner: true,
    progressLogs: [
      {
        action: 'Complaint Received',
        date: '2025-07-01T10:00:00Z',
        description: 'Complaint has been registered and sent to the relevant department.'
      }
    ]
  },
  {
    id: 2,
    title: 'Potholes in Road',
    description: 'Major potholes in main road causing traffic.',
    category: 'Infrastructure',
    status: 'resolved',
    location: 'Lalitpur',
    agreeVotes: 25,
    disagreeVotes: 8,
    userVote: 'agree',
    createdAt: '2025-06-28T15:00:00Z',
    isOwner: true,
    progressLogs: [
      {
        action: 'Work Completed',
        date: '2025-07-05T09:00:00Z',
        description: 'Road repair has been completed by the municipality.'
      }
    ]
  }
];

export default function UserComplaints() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredComplaints = dummyComplaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: dummyComplaints.length,
    pending: dummyComplaints.filter((c) => c.status === 'pending').length,
    'in-progress': dummyComplaints.filter((c) => c.status === 'in-progress').length,
    resolved: dummyComplaints.filter((c) => c.status === 'resolved').length,
    rejected: dummyComplaints.filter((c) => c.status === 'rejected').length,
  };

  const handleVote = async (id, voteType) => {
    console.log(`Vote ${voteType} for complaint id ${id}`);
    // You can simulate backend update or update state here if needed
  };

  return (
    <>
    
    <div className="mb-2">
        <Link
          href="/complaintsPage"
          className="text-blue-600 text-sm hover:underline flex items-center gap-1 font-medium"
        >
          ← Back to Complaints
        </Link>
      </div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <ChatBubbleOutlineIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Complaints</h2>
              <p className="text-sm text-gray-600">Manage and track your submitted complaints</p>
            </div>
          </div>
          <a
            href="/submitComplaintForm"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <AddIcon className="w-4 h-4" />
            Add New Complaint
          </a>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                statusFilter === status
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all'
                ? 'All'
                : status.charAt(0).toUpperCase() + status.slice(1)}{' '}
              ({count})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search your complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Complaints List */}
      <div className="p-6">
        {filteredComplaints.length > 0 ? (
          <div className="space-y-4">
            {filteredComplaints.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} onVote={handleVote} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ChatBubbleOutlineIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || statusFilter !== 'all'
                ? 'No complaints found'
                : 'No complaints yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Start by submitting your first complaint to help improve your community.'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <a
                href="/submitComplaintForm"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
              >
                <AddIcon className="w-4 h-4" />
                Submit Your First Complaint
              </a>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
  
}
