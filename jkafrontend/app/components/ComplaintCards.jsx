'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
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

export default function ComplaintCard({ complaint, onVote }) {
  const router = useRouter();
  const [isVoting, setIsVoting] = useState(false);
  const [currentVote, setCurrentVote] = useState(complaint.userVote);
  const [showProgress, setShowProgress] = useState(false);
  const [localComplaint, setLocalComplaint] = useState(complaint);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const handleVote = async (complaintId, voteType) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push(`/login?redirect=/complaintsPage`);
      return;
    }
    if (isVoting) return;
    setIsVoting(true);

    try {
      // const response = await axios.post(
      //   `http://127.0.0.1:8000/api/complaints/${complaintId}/vote/`,
      //   { vote_type: voteType },
      //   { headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' } }
      // );
      const response = await axios.post(
        `http://backend:8000/api/complaints/${complaintId}/vote/`,
        { vote_type: voteType },
        { headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' } }
      );
      const updatedComplaint = response.data;
      setLocalComplaint(updatedComplaint);
      setCurrentVote(updatedComplaint.userVote);
      if (onVote) onVote(updatedComplaint);
    } catch (error) {
      console.error("Error while voting:", error);
    } finally {
      setIsVoting(false);
    }
  };

  const getStatusIcon = (status) => {
    if (!status) return <ErrorIcon fontSize="small" className="text-gray-500" />;
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

  const toggleStatus = async () => {
    setShowProgress(!showProgress);
    if (!showProgress && history.length === 0) {
      setLoadingHistory(true);
      try {
        // const response = await axios.get(
        //   `http://127.0.0.1:8000/api/complaints/${localComplaint.id}/history/`
        // );

        const response = await axios.get(
          `http://backend:8000/api/complaints/${localComplaint.id}/history/`
        );
        setHistory(response.data || []);
      } catch (err) {
        console.error("Error fetching complaint history:", err);
      } finally {
        setLoadingHistory(false);
      }
    }
  };

  const formatStatus = (status) =>
    status ? status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-6 pb-4">
        {/* Status & Category */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(localComplaint.status)}`}>
              {getStatusIcon(localComplaint.status)}
              {formatStatus(localComplaint.status)}
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(localComplaint.category)}`}>
              <TagIcon style={{ fontSize: '1rem' }} />
              {localComplaint.category}
            </span>
          </div>
          <div className="text-xs text-gray-500">{new Date(localComplaint.created_at).toLocaleDateString()}</div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{localComplaint.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{localComplaint.description}</p>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
          <LocationOnIcon fontSize="small" />
          <span>{localComplaint.location || 'Not Specified'}</span>
        </div>

        {/* Voting Counts */}
        <div className="mb-4 flex gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <ThumbUpIcon fontSize="small" className="text-green-500" />
            <span>{localComplaint.agreeVotes} Agree</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbDownIcon fontSize="small" className="text-red-500" />
            <span>{localComplaint.disagreeVotes} Disagree</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <button
            onClick={() => handleVote(localComplaint.id, 'agree')}
            disabled={isVoting}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition ${currentVote === 'agree'
              ? 'bg-green-500 text-white shadow-md'
              : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
              } ${isVoting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm'}`}
          >
            <ThumbUpIcon fontSize="small" /> Agree
          </button>

          <button
            onClick={() => handleVote(localComplaint.id, 'disagree')}
            disabled={isVoting}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition ${currentVote === 'disagree'
              ? 'bg-red-500 text-white shadow-md'
              : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
              } ${isVoting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm'}`}
          >
            <ThumbDownIcon fontSize="small" /> Disagree
          </button>

          <button
            onClick={toggleStatus}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm cursor-pointer bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition"
          >
            <InfoIcon fontSize="small" />
            {showProgress ? 'Hide Status' : 'View Status'}
          </button>
        </div>

        {/* Complaint history */}
        {showProgress && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            {loadingHistory ? (
              <p>Loading history...</p>
            ) : !history || history.length === 0 ? (
              <p>No updates available.</p>
            ) : (
              <div className="flex flex-col">
                {history.map((update, index) => {
                  const formattedDate = update.created_at
                    ? new Date(update.created_at).toLocaleString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                    : '';
                  const fileUrl = update.response_file
                    ? `${process.env.NEXT_PUBLIC_API_URL}${update.response_file}`
                    : null;
                  return (
                    <div
                      key={update.id}
                      className="mb-4 relative pl-6 p-3 bg-white rounded-md shadow-sm"
                    >
                      <span className="absolute left-0 top-3 w-2 h-2 bg-blue-500 rounded-full" />
                      <p className="text-xs text-gray-500 mb-1">{formattedDate}</p>
                      <p className="font-medium text-gray-800 mb-2">
                        {formatStatus(update.status)} ({update.progress || 0}%)
                      </p>
                      {update.response_text && (
                        <p className="text-gray-600 text-sm mb-1">{update.response_text}</p>
                      )}
                      {fileUrl && (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-sm"
                        >
                          Download File
                        </a>
                      )}
                      {index < history.length - 1 && <hr className="my-2 border-gray-300" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}



