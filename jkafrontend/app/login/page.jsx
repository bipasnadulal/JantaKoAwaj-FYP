'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePassword = () => setPasswordVisible(!passwordVisible);

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Logo */}
      <div className="w-1/2 bg-blue-500 flex items-center justify-center px-10">
        <div className="flex flex-col items-center justify-center w-full text-center">
          <Image src="/jantakoawajLogo.png" alt="Logo" width={160} height={160} />
          <p className="text-white mt-2 text-2xl font-serif italic">जनताको आवाज, परिवर्तनको आधार</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Login to Your Account</h2>
          <form className="space-y-5">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="Enter phone number"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter password"
                className="w-full border border-gray-300 px-4 py-2 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              />
              <span
                className="absolute right-3 top-11 -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={togglePassword}
              >
                {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
              <div className="flex justify-end mt-1">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
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
