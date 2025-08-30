// 'use client';
// import React from 'react';
// import {
//   Dashboard, Person, Chat, HowToVote, Notifications,
//   Logout
// } from '@mui/icons-material';

// const menuItems = [
//   { key: 'overview', label: 'Overview', icon: <Dashboard fontSize="small" /> },
//   { key: 'profile', label: 'Profile', icon: <Person fontSize="small" /> },
//   { key: 'complaints', label: 'My Complaints', icon: <Chat fontSize="small" /> },
//   { key: 'voting', label: 'Voting History', icon: <HowToVote fontSize="small" /> },
//   { key: 'notifications', label: 'Notifications', icon: <Notifications fontSize="small" /> },
// ];

// export default function Sidebar({ activeTab, setActiveTab }) {
//   return (
//     <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
//       <div>
//         <div className="mb-10">
//           <h2 className="text-xl font-bold text-blue-600">Dashboard</h2>
//           <p className="text-sm text-gray-500">Complaint Portal</p>
//         </div>

//         <div className="mb-8 flex items-center gap-3">
//           <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
//             <Person />
//           </div>
//           <div>
//             <p className="font-semibold text-sm text-gray-700">Ram KC</p>
//             <p className="text-xs text-gray-400">ramkc@example.com</p>
//           </div>
//         </div>

//         <nav className="space-y-2">
//           {menuItems.map((item) => (
//             <button
//               key={item.key}
//               onClick={() => setActiveTab(item.key)}
//               className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
//                 activeTab === item.key
//                   ? 'bg-blue-100 text-blue-700'
//                   : 'text-gray-600 hover:bg-gray-100'
//               }`}
//             >
//               {item.icon}
//               {item.label}
//             </button>
//           ))}
//         </nav>
//       </div>

//       <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 cursor-pointer">
//         <Logout fontSize="small" /> Logout
//       </button>
//     </aside>
//   );
// }

'use client';
import React, { useEffect, useState } from 'react';
import { Person, Dashboard, Chat, HowToVote, Notifications, Logout } from '@mui/icons-material';
import axios from 'axios';

const menuItems = [
  { key: 'overview', label: 'Overview', icon: <Dashboard fontSize="small" /> },
  { key: 'profile', label: 'Profile', icon: <Person fontSize="small" /> },
  { key: 'complaints', label: 'My Complaints', icon: <Chat fontSize="small" /> },
  { key: 'voting', label: 'Voting History', icon: <HowToVote fontSize="small" /> },
  { key: 'notifications', label: 'Notifications', icon: <Notifications fontSize="small" /> },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const [user, setUser] = useState({ username: '', phone: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/user/`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => console.error('Error fetching user details:', err));
    }
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
      <div>
        <div className="mb-10">
          <h2 className="text-xl font-bold text-blue-600">Dashboard</h2>
          <p className="text-sm text-gray-500">Complaint Portal</p>
        </div>

        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <Person />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-700">{user.username}</p>
            <p className="text-xs text-gray-400">{user.phone}</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${activeTab === item.key
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 cursor-pointer"
      >
        <Logout fontSize="small" /> Logout
      </button>
    </aside>
  );
}
