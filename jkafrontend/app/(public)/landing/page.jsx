'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CampaignIcon from '@mui/icons-material/Campaign';
import PollIcon from '@mui/icons-material/Poll';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VibrationIcon from '@mui/icons-material/Vibration';
import TimelineIcon from '@mui/icons-material/Timeline';

export default function Landing() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleNewComplaint = () => {
    if (!isLoggedIn) {
      // Redirect to login with redirect query param
      router.push('/login?redirect=/submitComplaintForm');
      return;
    }
    router.push('/submitComplaintForm');
  };

  return (
    <>
      {/* Landing Page / Hero Section */}
      <section className="flex flex-col md:flex-row min-h-screen items-center justify-center px-6 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-10 flex flex-col md:flex-row items-center justify-center w-full">
          <div className="md:w-1/2 space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-6xl font-bold text-gray-800">Janta ko Aawaj</h1>
            <p className="text-2xl text-gray-800 italic">Where Every Voice Matters.</p>
            <p className="text-3xl text-gray-600">
              An interactive C2G2C platform to raise, vote, and track public concerns, peacefully and transparently.
            </p>
            <div className="space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                onClick={handleNewComplaint}
              >
                Submit Complaint
              </button>
              <a
                href="/complaintsPage"
                className="text-blue-500 px-4 py-2 rounded border-2 text-center hover:bg-blue-500 hover:text-white"
              >
                View Complaints
              </a>
            </div>
          </div>
          <div className="md:w-1/2 -top-6 md:mt-0">
            <img src="/raiseVoice1.png" alt="Raise your voice" className="w-full" />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="w-full bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Key Features</h2>

            {/* First row: 3 features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center bg-blue-50 p-8 rounded shadow-md">
                <CampaignIcon className="mb-4" style={{ fontSize: '4rem', color: '#db2777' }} />
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Raise Your Voice</h3>
                <p className="text-gray-700 text-center">
                  Submit genuine complaints directly from your phone or computer.
                </p>
              </div>

              <div className="flex flex-col items-center bg-blue-50 p-8 rounded shadow-md">
                <PollIcon className="mb-4" style={{ fontSize: '4rem', color: '#A9A9A9' }} />
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Community Voting</h3>
                <p className="text-gray-700 text-center">
                  Vote to agree or disagree on public complaints and help prioritize issues.
                </p>
              </div>

              <div className="flex flex-col items-center bg-blue-50 p-8 rounded shadow-md">
                <PsychologyIcon className="mb-4" style={{ fontSize: '4rem', color: '#1E40AF' }} />
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Smart Filtering</h3>
                <p className="text-gray-700 text-center">
                  Our system filters out spam and fake complaints using machine learning.
                </p>
              </div>
            </div>

            {/* Second row: 2 features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
              <div className="flex flex-col items-center bg-blue-50 p-8 rounded shadow-md">
                <VibrationIcon className="mb-4" style={{ fontSize: '4rem', color: '#3b3b3b' }} />
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Automated Alerts</h3>
                <p className="text-gray-700 text-center">
                  Authorities and media get notified when issues reach vote thresholds.
                </p>
              </div>

              <div className="flex flex-col items-center bg-blue-50 p-8 rounded shadow-md">
                <TimelineIcon className="mb-4" style={{ fontSize: '4rem', color: '#1E3A8A' }} />
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Real-time Tracking</h3>
                <p className="text-gray-700 text-center">
                  Track your complaint’s status and see what actions are being taken.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
