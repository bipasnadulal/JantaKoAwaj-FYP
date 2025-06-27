import React from "react";


const complaintStats = {
  total: 62504,
  statuses: [
    { label: "Complaint Registered", count: 62504, percentage: 100 },
    { label: "Resolved by Authority", count: 40190, percentage: 64.17 },
    { label: "Reviewed, No Action", count: 10406, percentage: 16.73 },
    { label: "Under Processing", count: 9788, percentage: 15.65 },
    { label: "Not Addressed", count: 881, percentage: 1.41 },
  ],
};



export default function ComplaintsSummary() {
  return (
    <section className="w-full px-6 py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Latest Status of Complaints from Janta Ko Aawaj
        </h2>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {complaintStats.statuses.map((stat, index) => (
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
