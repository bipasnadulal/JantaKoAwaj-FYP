"use client";
import React, { useState } from 'react';

// Static Top 5 Complaints (Mock Data for frontend only)
const complaints = [
  {
    id: 1,
    description: "Garbage hasn't been collected in Ward 4 for a week. The area is unhygienic.",
    category: "Sanitation",
    location: "Ward 4, Kathmandu",
    postedAt: "2024-06-15T10:30:00Z",
    agreeVotes: 30,
    disagreeVotes: 10,
  },
  {
    id: 2,
    description: "Street lights are not functioning in our area for several nights.",
    category: "Infrastructure",
    location: "Ward 5, Kathmandu",
    postedAt: "2024-06-14T20:10:00Z",
    agreeVotes: 25,
    disagreeVotes: 5,
  },
  {
    id: 3,
    description: "Water supply disrupted every morning for the past week.",
    category: "Utilities",
    location: "Ward 6, Kathmandu",
    postedAt: "2024-06-13T09:00:00Z",
    agreeVotes: 40,
    disagreeVotes: 10,
  },
  {
    id: 4,
    description: "Potholes on the main road are causing traffic and accidents.",
    category: "Road",
    location: "Ward 7, Kathmandu",
    postedAt: "2024-06-12T07:45:00Z",
    agreeVotes: 50,
    disagreeVotes: 20,
  },
  {
    id: 5,
    description: "Loud construction noise early in the morning near our neighborhood.",
    category: "Environment",
    location: "Ward 8, Kathmandu",
    postedAt: "2024-06-11T21:30:00Z",
    agreeVotes: 18,
    disagreeVotes: 12,
  },
];

// Convert ISO date to readable string
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString();
};

export default function TopFewComplaints() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show 1 card at a time in carousel — loop through top 5
  const nextCard = () =>
    setCurrentIndex((prev) => (prev + 1) % complaints.length);
  const prevCard = () =>
    setCurrentIndex((prev) => (prev - 1 + complaints.length) % complaints.length);

  // Calculate vote percentages
  const getPercentages = (agree, disagree) => {
    const total = agree + disagree;
    if (total === 0) return { agree: 0, disagree: 0 };
    return {
      agree: Math.round((agree / total) * 100),
      disagree: Math.round((disagree / total) * 100),
    };
  };

  const currentComplaint = complaints[currentIndex];
  const { agree, disagree } = getPercentages(
    currentComplaint.agreeVotes,
    currentComplaint.disagreeVotes
  );

  return (
    <section className="w-full px-6 py-16 bg-gradient-to-br bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Top Few Complaints</h2>

        {/* Card */}
        <div className="relative mx-auto max-w-2xl">
          <div
            className="glass-card p-6 rounded-xl shadow-lg backdrop-blur-md bg-white/30 border border-white/20 transition-all duration-500"
          >
            <p className="text-gray-800 text-lg mb-4 font-medium">
              “{currentComplaint.description}”
            </p>
            <div className="text-sm text-gray-500 mb-2">
              Category: <span className="font-semibold text-blue-600">{currentComplaint.category}</span>
            </div>
            <div className="text-sm text-gray-500 mb-2">
              Location: <span className="font-semibold text-blue-600">{currentComplaint.location}</span>
            </div>
            <div className="text-sm text-gray-400 mb-4">
              Posted on: {formatDate(currentComplaint.postedAt)}
            </div>

            {/* Vote Section */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <button className="bg-green-500/80 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 cursor-pointer">
                Agree ({agree}%)
              </button>
              <button className="bg-red-500/80 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 cursor-pointer">
                Disagree ({disagree}%)
              </button>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[-2rem]">
            <button
              onClick={prevCard}
              className="text-blue-600 hover:text-blue-800 text-3xl bg-white/40 rounded-full px-3 py-1 shadow"
              aria-label="Previous complaint"
            >
              ‹
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-[-2rem]">
            <button
              onClick={nextCard}
              className="text-blue-600 hover:text-blue-800 text-3xl bg-white/40 rounded-full px-3 py-1 shadow"
              aria-label="Next complaint"
            >
              ›
            </button>
          </div>
        </div>

        {/* Style for glass card */}
        <style>{`
          .glass-card {
            background: rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.18);
          }
        `}</style>
      </div>
    </section>
  );
}
