'use client';
import React, { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TagIcon from '@mui/icons-material/LocalOffer';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import { useRouter } from 'next/navigation';

export default function ComplaintCard({ complaint, onVote }) {
  const router = useRouter();
  const [isVoting, setIsVoting] = useState(false);
  const [currentVote, setCurrentVote] = useState(complaint.userVote);
  const [showProgress, setShowProgress] = useState(false);

  const totalVotes = complaint.agreeVotes + complaint.disagreeVotes;
  const agreePercentage = totalVotes > 0 ? (complaint.agreeVotes / totalVotes) * 100 : 0;

  const handleVote = async (voteType) => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login with query param to come back here
      router.push(`/login?redirect=/complaintsPage`);
      return;
    }

    if (isVoting) return;
    setIsVoting(true);
    try {
      await onVote(complaint.id, voteType);
      setCurrentVote(currentVote === voteType ? null : voteType);
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <HourglassEmptyIcon fontSize="small" className="text-yellow-500" />;
      case 'in-progress': return <TrendingUpIcon fontSize="small" className="text-blue-500" />;
      case 'resolved': return <CheckCircleIcon fontSize="small" className="text-green-500" />;
      case 'rejected': return <CancelIcon fontSize="small" className="text-red-500" />;
      default: return <ErrorIcon fontSize="small" className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Public Infrastructure': 'bg-orange-100 text-orange-800',
      'Municipal Guard': 'bg-red-100 text-red-800',
      'Environment': 'bg-green-100 text-green-800',
      'Education': 'bg-blue-100 text-blue-800',
      'Agriculture and Livestocks': 'bg-purple-100 text-purple-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
              {getStatusIcon(complaint.status)}
              {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(complaint.category)}`}>
              <TagIcon style={{ fontSize: '1rem' }} />
              {complaint.category}
            </span>
          </div>
          <div className="text-xs text-gray-500">{new Date(complaint.created_at).toLocaleDateString()}</div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{complaint.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{complaint.description}</p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <LocationOnIcon fontSize="small" />
            <span>{complaint.location}</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        {/* Voting Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Community Support</span>
            <span>{totalVotes} votes</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${agreePercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{agreePercentage.toFixed(0)}% agree</span>
            <span>{(100 - agreePercentage).toFixed(0)}% disagree</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <button
            onClick={() => handleVote('agree')}
            disabled={isVoting}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition ${currentVote === 'agree'
              ? 'bg-green-500 text-white shadow-md'
              : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
              } ${isVoting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm'}`}
          >
            <ThumbUpIcon fontSize="small" />
            Agree
          </button>

          <button
            onClick={() => handleVote('disagree')}
            disabled={isVoting}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition ${currentVote === 'disagree'
              ? 'bg-red-500 text-white shadow-md'
              : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
              } ${isVoting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm'}`}
          >
            <ThumbDownIcon fontSize="small" />
            Disagree
          </button>

          <button
            onClick={() => setShowProgress(!showProgress)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm cursor-pointer bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition"
          >
            <InfoIcon fontSize="small" />
            {showProgress ? 'Hide Status' : 'View Status'}
          </button>
        </div>
      </div>
    </div>
  );
}
