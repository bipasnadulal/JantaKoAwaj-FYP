'use client';
import React from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function ComplaintDetailDrawer({ open, onClose, complaint }) {
  if (!complaint) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="w-[400px] max-w-full p-6 flex flex-col gap-4 bg-white min-h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-600">Complaint Details</h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Complaint Info */}
        <div className="space-y-2 text-gray-800">
          <p><strong>Title:</strong> {complaint.title}</p>
          <p><strong>Category:</strong> {complaint.category}</p>
          <p><strong>Assigned To:</strong> {complaint.authority || 'N/A'}</p>
          <p><strong>Status:</strong> <span className="capitalize">{complaint.status}</span></p>
          <p><strong>Location:</strong> {complaint.location}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
        </div>

        {/* Progress Logs */}
        {complaint.progressLogs?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-1">Progress Logs:</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              {complaint.progressLogs.map((log, i) => (
                <li key={i}>• {log}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Drawer>
  );
}
