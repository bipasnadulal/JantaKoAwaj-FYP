'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ComplaintsSummary() {
  const [stats, setStats] = useState({
    total: 0,
    statuses: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // const res = await axios.get("http://127.0.0.1:8000/api/complaints/summary/"); 
        // setStats(res.data);

        const res = await axios.get("http://backend:8000/api/complaints/summary/"); 
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching complaint summary:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="w-full px-6 py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Latest Status of Complaints from Janta Ko Aawaj
        </h2>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {stats.statuses.map((stat, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow border border-white"
            >
              <p className="text-gray-700 font-medium mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold text-blue-600">{stat.count}</h3>
              <p className="text-sm text-gray-500">{stat.percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
