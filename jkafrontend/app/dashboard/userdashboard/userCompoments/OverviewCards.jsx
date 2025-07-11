'use client';
import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import VerifiedIcon from '@mui/icons-material/Verified';

const cardData = [
  { title: 'Total Complaints', count: 8, icon: <ChatIcon />, color: 'blue' },
  { title: 'Votes Cast', count: 42, icon: <HowToVoteIcon />, color: 'purple' },
  { title: 'Resolved Issues', count: 3, icon: <VerifiedIcon />, color: 'green' }
];

export default function OverviewCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`bg-${card.color}-50 text-${card.color}-800 p-5 rounded-lg shadow-sm flex items-center gap-4`}
        >
          <div className="text-3xl">{card.icon}</div>
          <div>
            <h4 className="text-sm font-medium">{card.title}</h4>
            <p className="text-xl font-bold">{card.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
