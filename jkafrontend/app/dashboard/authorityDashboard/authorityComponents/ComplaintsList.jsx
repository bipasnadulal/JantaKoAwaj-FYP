'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ComplaintsList() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status'); 

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/complaints/assigned/`;
        if (status) {
          url += `?status=${status}`;
        }

        const res = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access')}`, 
          },
        });

        if (!res.ok) throw new Error('Failed to fetch complaints');

        const data = await res.json();
        setComplaints(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [status]);

  if (loading) return <p>Loading complaints...</p>;

  if (complaints.length === 0)
    return <p>No complaints found {status ? `for "${status}"` : ''}.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        {status ? `${status.charAt(0).toUpperCase() + status.slice(1)} Complaints` : 'All Complaints'}
      </h2>

      <div className="bg-white rounded-lg shadow p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created</th>
              {/* <th className="p-2 border">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="p-2 border">{c.title}</td>
                <td className="p-2 border">{c.category}</td>
                <td className="p-2 border capitalize">{c.status}</td>
                <td className="p-2 border">{new Date(c.created_at).toLocaleString()}</td>
                {/* <td className="p-2 border">
                  <Link
                    href={`/complaints/${c.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
