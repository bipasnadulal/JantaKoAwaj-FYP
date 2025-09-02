'use client';
import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ComplaintDetailDrawer({ complaint, onClose, onUpdated, onNotificationsRefresh }) {
  const [status, setStatus] = useState(complaint?.status || '');
  const [progress, setProgress] = useState(complaint?.progress || 0);
  const [responseText, setResponseText] = useState('');
  const [responseFile, setResponseFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (complaint) {
      setStatus(complaint.status || '');
      setProgress(complaint.progress || 0);
      setResponseText(complaint.response_text || '');
    }
  }, [complaint]);

  

  if (!complaint) return null;

  


  // const handleSave = async () => {
  //   if (!responseText.trim()) {
  //     setError('Official written response is required.');
  //     return;
  //   }
  //   setError('');
  //   setLoading(true);

  //   try {
  //     const formData = new FormData();
  //     formData.append('status', status);
  //     formData.append('progress', progress);
  //     formData.append('response_text', responseText);
  //     if (responseFile) formData.append('response_file', responseFile);

  //     const token = localStorage.getItem('access');

  //     const res = await fetch(
  //       `http://127.0.0.1:8000/api/complaints/${complaint.id}/update/`,
  //       {
  //         method: 'PATCH',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           // Do NOT include 'Content-Type': 'multipart/form-data'
  //           // fetch automatically sets correct boundaries when using FormData
  //         },
  //         body: formData,
  //       }
  //     );

  //     if (!res.ok) {
  //       const errData = await res.json();
  //       setError(errData.error || 'Failed to update complaint.');
  //       return;
  //     }

  //     const updatedComplaint = await res.json();

  //     // Refresh parent table if callback provided
  //     if (onUpdated) onUpdated(updatedComplaint);
  //     if (onNotificationsRefresh) {
  //       onNotificationsRefresh();  // fetch the latest notifications from your backend
  //     }

  //     onClose();
  //   } catch (err) {
  //     console.error(err);
  //     setError('Network error. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSave = async () => {
    if (!responseText.trim()) {
      setError('Official written response is required.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('status', status);
      formData.append('progress', progress);
      formData.append('response_text', responseText);
      if (responseFile) formData.append('response_file', responseFile);

      const token = localStorage.getItem('access');

      const res = await fetch(
        `http://127.0.0.1:8000/api/complaints/${complaint.id}/update/`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || 'Failed to update complaint.');
        return;
      }

      const updatedComplaint = await res.json();

      // Refresh parent table
      if (onUpdated) onUpdated(updatedComplaint);

      // Refresh local state with updated complaint
      setStatus(updatedComplaint.status || '');
      setProgress(updatedComplaint.progress || 0);
      setResponseText(updatedComplaint.response_text || '');

      if (onNotificationsRefresh) onNotificationsRefresh();

      // Optionally close drawer
      onClose();
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <Drawer anchor="right" open={!!complaint} onClose={onClose}>
      <div className="w-[400px] max-w-full p-6 flex flex-col gap-4 bg-white min-h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-600">
            Complaint Details
          </h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Info */}
        <p><strong>Title:</strong> {complaint.title}</p>
        <p><strong>Description:</strong> {complaint.description}</p>

        {/* Location */}
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="font-medium text-gray-700">
            <LocationOnIcon /> <b>Location</b>
          </p>
          <p><strong>Province:</strong> {complaint.province}</p>
          <p><strong>District:</strong> {complaint.district}</p>
          <p><strong>Municipality:</strong> {complaint.municipality}</p>
          <p><strong>Ward:</strong> {complaint.ward}</p>
        </div>

        <p><strong>Status:</strong> {status}</p>

        {/* Update Section */}
        <div className="space-y-3 mt-4">
          <label className="block text-sm font-medium">Update Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <label className="block text-sm font-medium">Progress (%)</label>
          <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            min="0"
            max="100"
          />

          <label className="block text-sm font-medium">
            Official Response (required)
          </label>
          <textarea
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            className="w-full border px-3 py-2 rounded min-h-[100px]"
            placeholder="Write your official response here..."
            required
          />

          <label className="block text-sm font-medium">
            Upload Official File (optional)
          </label>
          <input
            type="file"
            onChange={(e) => setResponseFile(e.target.files[0])}
            className="w-full border px-3 py-2 rounded"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className={`mt-4 text-white px-4 py-2 rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600'
            }`}
        >
          {loading ? 'Saving...' : 'Save Updates'}
        </button>
      </div>
    </Drawer>
  );
}
