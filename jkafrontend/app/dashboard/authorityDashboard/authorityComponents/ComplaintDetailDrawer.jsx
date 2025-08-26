'use client';
import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function ComplaintDetailDrawer({ complaint, onClose }) {
  const [status, setStatus] = useState(complaint?.status || '');
  const [progress, setProgress] = useState(complaint?.progress || 0);

  if (!complaint) return null;

  const handleSave = () => {
    // Later: send updates to backend
    onClose();
  };

  return (
    <Drawer anchor="right" open={!!complaint} onClose={onClose}>
      <div className="w-[400px] max-w-full p-6 flex flex-col gap-4 bg-white min-h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-600">Complaint Details</h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Info */}
        <p><strong>Title:</strong> {complaint.title}</p>
        <p><strong>Description:</strong> {complaint.description}</p>
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

          <label className="block text-sm font-medium">Upload Response</label>
          <input type="file" className="w-full border px-3 py-2 rounded" />
        </div>

        <button
          onClick={handleSave}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Save Updates
        </button>
      </div>
    </Drawer>
  );
}
