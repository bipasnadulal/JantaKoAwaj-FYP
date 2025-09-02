// 'use client';
// import React from 'react';

// const statuses = [
//   { label: 'Pending', value: 3, color: 'yellow' },
//   { label: 'In Progress', value: 2, color: 'blue' },
//   { label: 'Resolved', value: 3, color: 'green' }
// ];

// export default function StatusOverview() {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow mb-8">
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">Complaint Status Overview</h3>
//       <div className="flex gap-6">
//         {statuses.map((status, idx) => (
//           <div key={idx} className="flex-1">
//             <div className={`bg-${status.color}-100 text-${status.color}-800 p-4 rounded-lg text-center`}>
//               <p className="text-sm font-medium">{status.label}</p>
//               <p className="text-2xl font-bold">{status.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";

// export default function StatusOverview() {
//   const [statuses, setStatuses] = useState([]);

//   useEffect(() => {
//     async function fetchStatuses() {
//       try {
//         const res = await fetch("/api/user/status-overview");
//         const data = await res.json();
//         setStatuses([
//           { label: "Pending", value: data.pending, color: "yellow" },
//           { label: "In Progress", value: data.inProgress, color: "blue" },
//           { label: "Resolved", value: data.resolved, color: "green" },
//         ]);
//       } catch (err) {
//         console.error("Error fetching status overview:", err);
//       }
//     }

//     fetchStatuses();
//   }, []);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow mb-8">
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">
//         Complaint Status Overview
//       </h3>
//       <div className="flex gap-6">
//         {statuses.map((status, idx) => (
//           <div key={idx} className="flex-1">
//             <div
//               className={`bg-${status.color}-100 text-${status.color}-800 p-4 rounded-lg text-center`}
//             >
//               <p className="text-sm font-medium">{status.label}</p>
//               <p className="text-2xl font-bold">{status.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

