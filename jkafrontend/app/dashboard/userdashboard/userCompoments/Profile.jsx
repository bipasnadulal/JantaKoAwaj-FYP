'use client';
import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import infoNepal from 'info-nepal';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [user, setUser] = useState({
    name: 'Ram KC',
    email: 'ram.kc@example.com',
    phone: '9801234567',
    province: 'Bagmati Province',
    district: 'Kathmandu',
    municipality: 'Kathmandu Metropolitan City',
    complaintsPosted: 12,
    totalVotesCast: 50,
    resolvedIssues: 7,
    joinedDate: '2022-01-15',
  });

  const [form, setForm] = useState({ ...user });

  const provinces = Object.keys(infoNepal.districtsOfProvince);
  const [districts, setDistricts] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);

  // Load districts when province changes
  useEffect(() => {
    if (form.province) {
      const dList = infoNepal.districtsOfProvince[form.province] || [];
      setDistricts(dList);
      setForm((prev) => ({ ...prev, district: '', municipality: '' }));
      setMunicipalities([]);
    }
  }, [form.province]);

  // Load municipalities when district changes
  useEffect(() => {
    if (form.district) {
      const mList = infoNepal.localBodies[form.district] || [];
      setMunicipalities(mList);
      setForm((prev) => ({ ...prev, municipality: '' }));
    }
  }, [form.district]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setIsSaving(true);
      setTimeout(() => {
        setUser(form);
        setIsEditing(false);
        setIsSaving(false);
      }, 800);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setForm(user);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <Link
          href="/complaintsPage"
          className="text-blue-600 text-sm hover:underline flex items-center gap-1 font-medium"
        >
          ← Back to Complaints
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-blue-500 px-6 py-8 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white text-gray-700 flex items-center justify-center text-4xl font-bold shadow">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
              </div>
            </div>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleEditToggle}
                    disabled={isSaving}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                  >
                    <SaveIcon className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                  >
                    <CloseIcon className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="flex items-center text-white px-2 py-1 rounded hover:bg-blue-50 hover:text-blue-500 cursor-pointer"
                >
                  <EditIcon className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
          <div>
            <h3 className="font-semibold mb-2">Phone Number</h3>
            {isEditing ? (
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            ) : (
              <p>{user.phone}</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Email</h3>
            {isEditing ? (
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            ) : (
              <p>{user.email}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold mb-2">Location</h3>
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                >
                  <option value="">--Select Province--</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>

                <select
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  disabled={!districts.length}
                >
                  <option value="">--Select District--</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                <select
                  name="municipality"
                  value={form.municipality}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  disabled={!municipalities.length}
                >
                  <option value="">--Select Municipality--</option>
                  {municipalities.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            ) : (
              <p>{user.province}, {user.district}, {user.municipality}</p>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex gap-6">
          <div className="flex-1 bg-blue-100 rounded-lg p-6 text-blue-700 font-semibold flex flex-col items-center">
            <ChatBubbleOutlineIcon className="mb-1 w-6 h-6" />
            <p className="text-2xl">{user.complaintsPosted}</p>
            <p className="text-sm">Complaints Posted</p>
          </div>
          <div className="flex-1 bg-purple-100 rounded-lg p-6 text-purple-700 font-semibold flex flex-col items-center">
            <TrendingUpIcon className="mb-1 w-6 h-6" />
            <p className="text-2xl">{user.totalVotesCast}</p>
            <p className="text-sm">Total Votes Cast</p>
          </div>
        </div>
      </div>
    </div>
  );
}
