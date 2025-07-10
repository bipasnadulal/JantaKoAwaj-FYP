'use client';
import React, { useState } from 'react';
import ComplaintCard from '@/app/components/ComplaintCards';

// Mock data (top complaints)
const complaints = [
  {
    id: 1,
    title: 'Garbage not collected',
    description: "Garbage hasn't been collected in Ward 4 for a week. The area is unhygienic.",
    category: "Environment",
    location: "Ward 4, Kathmandu",
    status: 'pending',
    createdAt: "2024-06-15T10:30:00Z",
    agreeVotes: 20,
    disagreeVotes: 5,
    userVote: null,
    progressLogs: [],
  },
  {
    id: 2,
    title: 'Street Light Issue',
    description: "Street lights are not functioning in our area for several nights.",
    category: "Public Infrastructure",
    location: "Ward 5, Kathmandu",
    status: 'in-progress',
    createdAt: "2024-06-14T20:10:00Z",
    agreeVotes: 30,
    disagreeVotes: 4,
    userVote: null,
    progressLogs: [],
  },
  
];

export default function TopFewComplaints() {
  const [index, setIndex] = useState(0);
  const currentComplaint = complaints[index];

  const next = () => setIndex((prev) => (prev + 1) % complaints.length);
  const prev = () => setIndex((prev) => (prev - 1 + complaints.length) % complaints.length);

  const handleVote = async (complaintId, voteType) => {
    console.log(`Vote recorded for complaint ${complaintId} - ${voteType}`);
    //  can enhance this later to track or update state
  };

  return (
    <section className="w-full px-6 py-16 bg-gray-50 from-blue-50 to-blue-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Top Few Complaints</h2>

        <div className="relative max-w-2xl mx-auto">
          <ComplaintCard complaint={currentComplaint} onVote={handleVote} />

          {/* Carousel Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[-2rem]">
            <button onClick={prev} className="text-blue-600 hover:text-blue-800 text-3xl">
              ‹
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-[-2rem]">
            <button onClick={next} className="text-blue-600 hover:text-blue-800 text-3xl">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


// const complaints = [
//   {
//     id: 1,
//     description: "Garbage hasn't been collected in Ward 4 for a week. The area is unhygienic.",
//     category: "Environment",
//     location: "Ward 4, Kathmandu",
//     postedAt: "2024-06-15T10:30:00Z",
//     agreeVotes: 20,
//     disagreeVotes: 5
//   },
//   {
//     id: 2,
//     description: "Street lights are not functioning in our area for several nights.",
//     category: "Public Infrastructure",
//     location: "Ward 5, Kathmandu",
//     postedAt: "2024-06-14T20:10:00Z",
//     agreeVotes: 30,
//     disagreeVotes: 4
//   },
//   {
//     id: 3,
//     description: "Water supply disrupted every morning for the past week.",
//     category: "Nagar Prahari",
//     location: "Ward 6, Kathmandu",
//     postedAt: "2024-06-13T09:00:00Z",
//     agreeVotes: 25,
//     disagreeVotes: 10
//   },
//   {
//     id: 4,
//     description: "Potholes on the main road are causing traffic and accidents.",
//     category: "Public Infrastructure",
//     location: "Ward 7, Kathmandu",
//     postedAt: "2024-06-12T07:45:00Z",
//     agreeVotes: 28,
//     disagreeVotes: 6
//   },
//   {
//     id: 5,
//     description: "Loud construction noise early in the morning near our neighborhood.",
//     category: "Environment",
//     location: "Ward 8, Kathmandu",
//     postedAt: "2024-06-11T21:30:00Z",
//     agreeVotes: 15,
//     disagreeVotes: 7
//   }
// ];

// const formatDate = (isoString) => {
//   const date = new Date(isoString);
//   return date.toLocaleString();
// };

// export default function TopFewComplaints() {
//   const [index, setIndex] = useState(0);
//   const current = complaints[index];
//   const totalVotes = current.agreeVotes + current.disagreeVotes;
//   const agreePercent = totalVotes ? Math.round((current.agreeVotes / totalVotes) * 100) : 0;
//   const disagreePercent = 100 - agreePercent;

//   const next = () => setIndex((prev) => (prev + 1) % complaints.length);
//   const prev = () => setIndex((prev) => (prev - 1 + complaints.length) % complaints.length);

//   return (
//     <section className="w-full px-6 py-16 bg-gradient-to-br from-blue-50 to-blue-100">
//       <div className="max-w-4xl mx-auto text-center">
//         <h2 className="text-3xl font-bold text-blue-800 mb-10">Top Few Complaints</h2>

//         <div className="relative max-w-2xl mx-auto">
//           <div className="glass-card p-6 rounded-xl shadow-lg border border-white/30 transition-all duration-300">
//             <p className="text-gray-800 text-lg font-medium mb-3">“{current.description}”</p>

//             <div className="flex justify-center gap-4 text-sm text-gray-600 mb-2">
//               <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
//                 <TagIcon fontSize="small" /> {current.category}
//               </span>
//               <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
//                 <LocationOnIcon fontSize="small" /> {current.location}
//               </span>
//             </div>

//             <p className="text-xs text-gray-400 mb-4">Posted on: {formatDate(current.postedAt)}</p>

//             {/* Community Voting Progress */}
//             <div className="mb-3">
//               <div className="flex justify-between text-xs text-gray-500 mb-1">
//                 <span>Community Support</span>
//                 <span>{totalVotes} votes</span>
//               </div>
//               <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
//                 <div
//                   className="bg-green-500 h-2 transition-all duration-500"
//                   style={{ width: `${agreePercent}%` }}
//                 ></div>
//               </div>
//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>{agreePercent}% Agree</span>
//                 <span>{disagreePercent}% Disagree</span>
//               </div>
//             </div>

//             {/* Vote Buttons */}
//             <div className="flex justify-center gap-4 mt-4">
//               <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
//                 <ThumbUpIcon fontSize="small" />
//                 Agree
//               </button>
//               <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
//                 <ThumbDownIcon fontSize="small" />
//                 Disagree
//               </button>
//             </div>
//           </div>

//           {/* Carousel Controls */}
//           <div className="absolute top-1/2 -translate-y-1/2 left-[-2rem]">
//             <button onClick={prev} className="text-blue-600 hover:text-blue-800 text-3xl">
//               ‹
//             </button>
//           </div>
//           <div className="absolute top-1/2 -translate-y-1/2 right-[-2rem]">
//             <button onClick={next} className="text-blue-600 hover:text-blue-800 text-3xl">
//               ›
//             </button>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .glass-card {
//           background: rgba(255, 255, 255, 0.25);
//           backdrop-filter: blur(10px);
//           border-radius: 16px;
//           box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
//         }
//       `}</style>
//     </section>
//   );
// }
