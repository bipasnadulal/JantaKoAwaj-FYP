// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import ComplaintCard from '@/app/components/ComplaintCards';

// export default function ComplaintsPage() {
//   const [complaints, setComplaints] = useState([]);
//   const [filters, setFilters] = useState({ category: '', status: '', sort: '' });
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);


//     const fetchComplaints = async () => {
//       try {
//         const res = await fetch('http://127.0.0.1:8000/api/complaints/list/', {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Token ${token}`,
//           },
//         });

//         if (!res.ok) {
//           throw new Error('Failed to fetch complaints');
//         }

//         const data = await res.json();
//         // filter to show only genuine complaints
//         const genuineComplaints = data.filter((c) => c.status === 'genuine');
//         setComplaints(genuineComplaints);
//       } catch (err) {
//         console.error('Error fetching complaints:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   const handleVote = (complaintId, voteType) => {
//     setComplaints((prev) =>
//       prev.map((complaint) => {
//         if (complaint.id !== complaintId) return complaint;
//         const alreadyVoted = complaint.userVote === voteType;
//         return {
//           ...complaint,
//           agreeVotes: voteType === 'agree' ? complaint.agreeVotes + (alreadyVoted ? -1 : 1) : complaint.agreeVotes,
//           disagreeVotes: voteType === 'disagree' ? complaint.disagreeVotes + (alreadyVoted ? -1 : 1) : complaint.disagreeVotes,
//           userVote: alreadyVoted ? null : voteType,
//         };
//       })
//     );
//   };

//   const handleNewComplaint = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login?redirect=/submitComplaintForm');
//       return;
//     }
//     router.push('/submitComplaintForm');
//   };

//   const filteredComplaints = complaints
//     .filter((c) => (!filters.category || c.category === filters.category) &&
//       (!filters.status || c.status === filters.status))
//     .sort((a, b) => (filters.sort === 'mostVoted' ? b.agreeVotes - a.agreeVotes : 0));

//   return (
//     <section className="min-h-screen bg-blue-50 py-10 px-4 lg:px-36 mt-32">

//       <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//         <h1 className="text-3xl font-bold text-black-700 text-center md:text-left">
//           Voice Your Concerns, Drive Change
//         </h1>
//         <button
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow transition"
//           onClick={handleNewComplaint}
//         >
//           <span className="text-xl">+</span> Add New Complaint
//         </button>
//       </div>

//       {/* Filter Section */}
//       <div className="flex flex-wrap gap-4 mb-8 justify-center">
//         <select
//           value={filters.category}
//           onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//           className="px-4 py-2 rounded border border-gray-300"
//         >
//           <option value="">All Categories</option>
//           <option value="Public Infrastructure">Public Infrastructure</option>
//           <option value="Environment">Environment</option>
//           <option value="Municipal Guard">Municipal Guard</option>
//           <option value="Education">Education</option>
//           <option value="Agriculture and Livestocks">Agriculture and Livestocks</option>
//         </select>

//         <select
//           value={filters.status}
//           onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//           className="px-4 py-2 rounded border border-gray-300"
//         >
//           <option value="">All Status</option>
//           <option value="under review">Under Review</option>
//           <option value="in-progress">In Progress</option>
//           <option value="resolved">Resolved</option>
//         </select>

//         <select
//           value={filters.sort}
//           onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
//           className="px-4 py-2 rounded border border-gray-300"
//         >
//           <option value="">Sort By</option>
//           <option value="mostVoted">Most Voted</option>
//         </select>
//       </div>

//       {/* Complaint Display */}
//       <div className="space-y-8">
//         {loading ? (
//           <p className="text-center text-gray-600">Loading complaints...</p>
//         ) : filteredComplaints.length > 0 ? (
//           filteredComplaints.map((complaint) => (
//             <ComplaintCard key={complaint.id} complaint={complaint} onVote={handleVote} />
//           ))
//         ) : (
//           <p className="text-center text-gray-600">No complaints found.</p>
//         )}
//       </div>
//     </section>
//   );
// }


// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import ComplaintCard from '@/app/components/ComplaintCards';

// export default function ComplaintsPage() {
//   const [complaints, setComplaints] = useState([]);
//   const [filters, setFilters] = useState({ category: '', status: '', sort: '' });
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const res = await fetch('http://127.0.0.1:8000/api/complaints/list/', {
//           headers: { 'Content-Type': 'application/json' }, // no token needed
//         });

//         if (!res.ok) throw new Error('Failed to fetch complaints');

//         const data = await res.json();

//         // store all complaints
//         setComplaints(data);
//       } catch (err) {
//         console.error('Error fetching complaints:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   const handleNewComplaint = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login?redirect=/submitComplaintForm');
//       return;
//     }
//     router.push('/submitComplaintForm');
//   };

//   // Filter & sort
//   const filteredComplaints = complaints
//     .filter((c) => (!filters.category || c.category === filters.category) &&
//       (!filters.status || c.status === filters.status))
//     .sort((a, b) => (filters.sort === 'mostVoted' ? b.agreeVotes - a.agreeVotes : 0));

//   return (
//     <section className="min-h-screen bg-blue-50 py-10 px-4 lg:px-36 mt-32">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//         <h1 className="text-3xl font-bold text-black-700 text-center md:text-left">
//           Voice Your Concerns, Drive Change
//         </h1>
//         <button
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow transition"
//           onClick={handleNewComplaint}
//         >
//           <span className="text-xl">+</span> Add New Complaint
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 mb-8 justify-center">
//         <select
//           value={filters.category}
//           onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//           className="px-4 py-2 rounded border border-gray-300"
//         >
//           <option value="">All Categories</option>
//           <option value="Public Infrastructure">Public Infrastructure</option>
//           <option value="Environment">Environment</option>
//           <option value="Municipal Guard">Municipal Guard</option>
//           <option value="Education">Education</option>
//           <option value="Agriculture and Livestocks">Agriculture and Livestocks</option>
//         </select>

//         <select
//           value={filters.status}
//           onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//           className="px-4 py-2 rounded border border-gray-300"
//         >
//           <option value="">All Status</option>
//           <option value="under review">Under Review</option>
//           <option value="in-progress">In Progress</option>
//           <option value="resolved">Resolved</option>
//           <option value="rejected">Rejected</option>
//         </select>

//         <select
//           value={filters.sort}
//           onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
//           className="px-4 py-2 rounded border border-gray-300"
//         >
//           <option value="">Sort By</option>
//           <option value="mostVoted">Most Voted</option>
//         </select>
//       </div>

//       {/* Complaint list */}
//       <div className="space-y-8">
//         {loading ? (
//           <p className="text-center text-gray-600">Loading complaints...</p>
//         ) : filteredComplaints.length > 0 ? (
//           filteredComplaints.map((complaint) => (
//             <ComplaintCard key={complaint.id} complaint={complaint} />
//           ))
//         ) : (
//           <p className="text-center text-gray-600">No complaints found.</p>
//         )}
//       </div>
//     </section>
//   );
// }

'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ComplaintCard from '@/app/components/ComplaintCards';

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [filters, setFilters] = useState({ category: '', status: '', sort: '' });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/complaints/list/', {
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Failed to fetch complaints');

        const data = await res.json();
        setComplaints(data);
      } catch (err) {
        console.error('Error fetching complaints:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleNewComplaint = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login?redirect=/submitComplaintForm');
      return;
    }
    router.push('/submitComplaintForm');
  };

  // Update complaint after vote
  const handleVoteUpdate = (updatedComplaint) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((c) =>
        c.id === updatedComplaint.id ? updatedComplaint : c
      )
    );
  };

  // Filter & sort
  const filteredComplaints = complaints
    .filter(
      (c) =>
        (!filters.category || c.category === filters.category) &&
        (!filters.status || c.status === filters.status)
    )
    .sort((a, b) =>
      filters.sort === 'mostVoted' ? b.agreeVotes - a.agreeVotes : 0
    );

  return (
    <section className="min-h-screen bg-blue-50 py-10 px-4 lg:px-36 mt-32">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-black-700 text-center md:text-left">
          Voice Your Concerns, Drive Change
        </h1>
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow transition"
          onClick={handleNewComplaint}
        >
          <span className="text-xl">+</span> Add New Complaint
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="px-4 py-2 rounded border border-gray-300"
        >
          <option value="">All Categories</option>
          <option value="Public Infrastructure">Public Infrastructure</option>
          <option value="Environment">Environment</option>
          <option value="Municipal Guard">Municipal Guard</option>
          <option value="Education">Education</option>
          <option value="Agriculture and Livestocks">Agriculture and Livestocks</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-4 py-2 rounded border border-gray-300"
        >
          <option value="">All Status</option>
          <option value="under review">Under Review</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="px-4 py-2 rounded border border-gray-300"
        >
          <option value="">Sort By</option>
          <option value="mostVoted">Most Voted</option>
        </select>
      </div>

      {/* Complaint list */}
      <div className="space-y-8">
        {loading ? (
          <p className="text-center text-gray-600">Loading complaints...</p>
        ) : filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              onVote={handleVoteUpdate} // <-- pass handler
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No complaints found.</p>
        )}
      </div>
    </section>
  );
}

