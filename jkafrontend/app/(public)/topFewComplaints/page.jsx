'use client';
import React, { useEffect, useState } from 'react';
import ComplaintCard from '@/app/components/ComplaintCards';
import axios from 'axios';

export default function TopFewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchTopComplaints = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/complaints/top/');
        setComplaints(res.data);
      } catch (err) {
        console.error("Error fetching top complaints:", err);
      }
    };
    fetchTopComplaints();
  }, []);

  if (!complaints.length) return <p className="text-center py-10">No Top Complaints At The Moment</p>;

  const currentComplaint = complaints[index];

  const next = () => setIndex((prev) => (prev + 1) % complaints.length);
  const prev = () => setIndex((prev) => (prev - 1 + complaints.length) % complaints.length);

  const handleVote = (complaintId, voteType) => {
    console.log(`Vote recorded for complaint ${complaintId} - ${voteType}`);
  };

  return (
    <section className="w-full px-6 py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Top Complaints</h2>

        <div className="relative max-w-2xl mx-auto">
          <ComplaintCard complaint={currentComplaint} onVote={handleVote} />

          {/* Carousel Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[-2rem]">
            <button onClick={prev} className="text-blue-600 hover:text-blue-800 text-3xl">‹</button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-[-2rem]">
            <button onClick={next} className="text-blue-600 hover:text-blue-800 text-3xl">›</button>
          </div>
        </div>
      </div>
    </section>
  );
}
