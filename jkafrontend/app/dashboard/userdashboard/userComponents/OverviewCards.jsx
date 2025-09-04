'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatIcon from '@mui/icons-material/Chat';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import VerifiedIcon from '@mui/icons-material/Verified';

const icons = {
  complaints: <ChatIcon />,
  votes: <HowToVoteIcon />,
  resolved: <VerifiedIcon />
}

export default function OverviewCards({ setActiveTab }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/complaints/overview/`,
          { headers: { Authorization: `Token ${token}` } }
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  const cardData = [
    { title: "Total Complaints", count: data.total_complaints, icon: icons.complaints, color: "blue", tab: "complaints" },
    { title: "Votes Cast", count: data.votes_cast, icon: icons.votes, color: "purple", tab: "voting" },
    { title: "Resolved Issues", count: data.resolved_issues, icon: icons.resolved, color: "green", tab: "complaints" },
  ];

  const getBgColor = (color) => {
    switch (color) {
      case "blue": return "bg-blue-50 text-blue-800";
      case "purple": return "bg-purple-50 text-purple-800";
      case "green": return "bg-green-50 text-green-800";
      default: return "bg-gray-50 text-gray-800";
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`${getBgColor(card.color)} p-5 rounded-lg shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition`}
          onClick={() => setActiveTab(card.tab)}
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


