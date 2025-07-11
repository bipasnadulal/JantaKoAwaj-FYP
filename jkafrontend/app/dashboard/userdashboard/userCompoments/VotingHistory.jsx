'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import SearchIcon from '@mui/icons-material/Search';
import ComplaintCard from '@/app/components/ComplaintCards';

const dummyVotedComplaints = [
  {
    id: 1,
    title: 'Streetlight not working',
    description: 'Dark streets near community hall.',
    category: 'Public Infrastructure',
    status: 'in-progress',
    location: 'Bhaktapur',
    agreeVotes: 14,
    disagreeVotes: 2,
    userVote: 'agree',
    createdAt: '2025-07-01T09:00:00Z',
    progressLogs: [],
  },
  {
    id: 2,
    title: 'Noise Pollution at Night',
    description: 'Loud music till midnight from restaurants.',
    category: 'Environment',
    status: 'pending',
    location: 'Kathmandu',
    agreeVotes: 9,
    disagreeVotes: 7,
    userVote: 'disagree',
    createdAt: '2025-06-28T18:00:00Z',
    progressLogs: [],
  },
];

export default function VotingHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [voteFilter, setVoteFilter] = useState('all');

  const filtered = dummyVotedComplaints.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVote = voteFilter === 'all' || c.userVote === voteFilter;
    return matchesSearch && matchesVote;
  });

  const voteCounts = {
    all: dummyVotedComplaints.length,
    agree: dummyVotedComplaints.filter(c => c.userVote === 'agree').length,
    disagree: dummyVotedComplaints.filter(c => c.userVote === 'disagree').length,
  };

  const handleVote = async (id, voteType) => {
    console.log(`Re-voted ${voteType} on complaint id ${id}`);
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
    <div className="bg-white rounded-xl shadow-sm">

     

      <div className="px-6 pt-2 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-500 p-2 rounded-lg">
            <ThumbUpAltIcon className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Voting History</h2>
            <p className="text-sm text-gray-600">Track complaints you've voted on</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setVoteFilter('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
              voteFilter === 'all'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({voteCounts.all})
          </button>

          <button
            onClick={() => setVoteFilter('agree')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 transition ${
              voteFilter === 'agree'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ThumbUpAltIcon style={{ fontSize: 16 }} />
            Agreed ({voteCounts.agree})
          </button>

          <button
            onClick={() => setVoteFilter('disagree')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 transition ${
              voteFilter === 'disagree'
                ? 'bg-red-100 text-red-700 border border-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ThumbDownAltIcon style={{ fontSize: 16 }} />
            Disagreed ({voteCounts.disagree})
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fontSize="small" />
          <input
            type="text"
            placeholder="Search voted complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Complaint List */}
      <div className="p-6">
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} onVote={handleVote} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ThumbUpAltIcon className="text-gray-400" style={{ fontSize: 48 }} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || voteFilter !== 'all' ? 'No votes found' : 'No voting history yet'}
            </h3>
            <p className="text-gray-600">
              {searchTerm || voteFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Start voting on complaints to see your history here.'}
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
