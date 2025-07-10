'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import ComplaintCard from '@/app/components/ComplaintCards';
import {
  Person, Email, LocationOn, Chat, TrendingUp, Verified,
  ArrowBack
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const isLoggedIn = true;

  const [mockUser, setMockUser] = useState({
    name: 'Ram KC',
    email: 'ramkc@gmail.com',
    province: '5',
    district:'Dang',
    postedComplaints: [
      {
        id: 1,
        title: 'Street lights not working',
        description: 'Lights near the park have been off for 5 days.',
        category: 'Public Infrastructure',
        status: 'in-progress',
        createdAt: '2025-07-01T10:30:00Z',
        location: 'Ward 5, Kathmandu',
        agreeVotes: 20,
        disagreeVotes: 5,
        userVote: null,
        progressLogs: [],
      },
    ],
    votedComplaints: [
      {
        id: 2,
        title: 'Water leakage on road',
        description: 'Leaking for more than a week; dangerous for bikers.',
        category: 'Environment',
        status: 'pending',
        createdAt: '2025-06-25T09:00:00Z',
        location: 'Ward 3, Kathmandu',
        agreeVotes: 12,
        disagreeVotes: 2,
        userVote: 'agree',
        progressLogs: [],
      },
    ],
  });

  const [formData, setFormData] = useState({ ...mockUser });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setMockUser({ ...formData });
    setIsEditing(false);
    // In actual app, trigger backend update here
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNewComplaint = () => {
    if (!isLoggedIn) {
      alert('Oops! You are not logged in. Please log in to submit a complaint.');
      return;
    }
    window.location.href = '/submitComplaintForm';
  };

  const StatBox = ({ label, value, icon, color }) => (
    <div className={`rounded-lg p-4 bg-${color}-50 text-${color}-800 flex items-center gap-3`}>
      <div className="text-xl">{icon}</div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-400 text-white px-6 py-6 relative">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold">
            <Person fontSize="large" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{mockUser.name}</h2>
          </div>
        </div>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="absolute top-6 right-6 bg-white/20 text-white px-4 py-1 rounded hover:bg-white/30 text-sm font-medium cursor-pointer"
          >
            <SaveIcon /> Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="absolute top-6 right-6 bg-white/20 text-white px-4 py-1 rounded hover:bg-white/30 text-sm font-medium cursor-pointer"
          >
            <EditIcon /> Edit Profile
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6 p-6">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          ) : (
            <p className="font-medium text-gray-800 flex items-center gap-2">
              <Person fontSize="small" />
              {mockUser.name}
            </p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          {isEditing ? (
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          ) : (
            <p className="font-medium text-gray-800 flex items-center gap-2">
              <Email fontSize="small" />
              {mockUser.email}
            </p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">Location</p>
          {isEditing ? (
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          ) : (
            <p className="font-medium text-gray-800 flex items-center gap-2">
              <LocationOn fontSize="small" />
              {mockUser.location}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 p-6 border-t bg-gray-50">
        <StatBox label="Complaints Posted" value={mockUser.postedComplaints.length} icon={<Chat />} color="blue" />
        <StatBox label="Total Votes Cast" value={45} icon={<TrendingUp />} color="purple" />
        <StatBox label="Resolved Issues" value={3} icon={<Verified />} color="green" />
      </div>
    </div>
  );

  const renderComplaints = (data) =>
    data.length > 0 ? (
      <div className="space-y-6">
        {data.map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint} onVote={() => { }} />
        ))}
      </div>
    ) : (
      <p className="text-gray-500 italic mt-4">No complaints found.</p>
    );

  return (
    <section className="px-4 lg:px-10 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
        <div>
          <h1 className="text-3xl font-bold text-blue-500">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {mockUser.name}</p>
        </div>
        <Link href="/" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
          <ArrowBack fontSize="small" />
          Go to Home
        </Link>
      </div>

      <div className="flex gap-4 border-b mb-6">
        {['profile', 'myComplaints', 'voting'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-4 py-2 text-sm font-medium capitalize ${activeTab === tab
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600'
              }`}
          >
            {tab === 'profile' && '👤 Profile'}
            {tab === 'myComplaints' && (
              <>
                <Chat />
                My Complaints ({mockUser.postedComplaints.length})
              </>
            )}
            {tab === 'voting' && (
              <>
                <HowToVoteIcon />
                Voting History ({mockUser.votedComplaints.length})
              </>
            )}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'myComplaints' && renderComplaints(mockUser.postedComplaints)}
        {activeTab === 'voting' && renderComplaints(mockUser.votedComplaints)}
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={handleNewComplaint}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm shadow cursor-pointer"
        >
          <AddIcon /> Add New Complaint
        </button>
      </div>
    </section>
  );
}
