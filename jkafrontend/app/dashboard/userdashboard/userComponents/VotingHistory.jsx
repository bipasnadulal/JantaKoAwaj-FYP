'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import SearchIcon from '@mui/icons-material/Search';
import ComplaintCard from '@/app/components/ComplaintCards';

export default function VotingHistory() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [voteFilter, setVoteFilter] = useState('all');

  
  useEffect(() => {
    const fetchVotedComplaints = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/complaints/voted/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setComplaints(data);
        } else {
          console.error('Failed to fetch voted complaints');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVotedComplaints();
  }, []);

  
  const filtered = complaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVote = voteFilter === 'all' || c.userVote === voteFilter;
    return matchesSearch && matchesVote;
  });

  const voteCounts = {
    all: complaints.length,
    agree: complaints.filter((c) => c.userVote === 'agree').length,
    disagree: complaints.filter((c) => c.userVote === 'disagree').length,
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

      <div className="bg-white rounded-xl shadow-sm p-6">
        {loading ? (
          <p className="text-gray-500 text-center">Loading voting history...</p>
        ) : filtered.length > 0 ? (
          <>
            
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

            <div className="space-y-4">
              {filtered.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          </>
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
    </>
  );
}
