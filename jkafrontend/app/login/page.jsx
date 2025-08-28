'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard/userdashboard';

  const togglePassword = () => setPasswordVisible(!passwordVisible);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save user data to localStorage
        localStorage.setItem('username', data.username);
        if (data.token) localStorage.setItem('token', data.token);

        // Redirect to the page user originally wanted
        router.push(redirectPath);
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Logo */}
      <div className="w-1/2 bg-blue-500 flex items-center justify-center px-10">
        <div className="flex flex-col items-center justify-center w-full text-center">
          <Image src="/jantakoawajLogo.png" alt="Logo" width={160} height={160} />
          <p className="text-white mt-2 text-2xl font-serif italic">
            जनताको आवाज, परिवर्तनको आधार
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Login to Your Account</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter password"
                className="w-full border border-gray-300 px-4 py-2 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-11 -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={togglePassword}
              >
                {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
