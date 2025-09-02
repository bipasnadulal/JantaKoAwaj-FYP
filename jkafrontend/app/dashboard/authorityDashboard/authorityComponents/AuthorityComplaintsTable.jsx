'use client';
import React, { useState, useEffect } from 'react';
import ComplaintDetailDrawer from './ComplaintDetailDrawer';


export default function AuthorityComplaintsTable() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await fetch("http://127.0.0.1:8000/api/complaints/assigned/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", res.status); // Log status

        const data = await res.json();
        console.log("Complaints data:", data); // Log data

        if (res.ok) {
          setComplaints(data);
        } else {
          setComplaints([]);
          console.error("Error fetching complaints:", data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchComplaints();
  }, []);


  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Assigned Complaints</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-2">Title</th>
              <th className="text-left px-4 py-2">Category</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Progress</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {complaints.map((complaint) => (
              <tr key={complaint.id} className="border-b">
                <td className="px-4 py-2 font-medium">{complaint.title}</td>
                <td className="px-4 py-2">{complaint.category}</td>
                <td className="px-4 py-2 capitalize">{complaint.status}</td>
                <td className="px-4 py-2">{complaint.progress ?? 0}%</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedComplaint(complaint)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View / Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ComplaintDetailDrawer
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
      />
    </div>
  );
}
