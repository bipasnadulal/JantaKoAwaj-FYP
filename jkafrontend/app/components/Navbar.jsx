'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Navbar() {
  const [lang, setLang] = useState('en');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className="bg-blue-500 shadow-md px-4 py-3 flex items-center justify-between">
      {/* Left: Logo and Nav */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <Link href="/">
          <h1 className="font-bold text-xl md:text-2xl text-white cursor-pointer">Janta Ko Awaj</h1>
        </Link>
        {/* Nav Links */}
        <div className="hidden md:flex space-x-6 text-white">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/complaints">Complaints</Link>
        </div>
      </div>

      {/* Right: Icons and Language */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="relative text-white hover:text-blue-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        {/* Profile Icon */}
        <button className="text-white hover:text-blue-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            {lang === 'en' ? 'English' : 'नेपाली'}
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white rounded shadow-lg z-10">
              <button
                className={`block w-full text-left px-4 py-2 text-sm ${lang === 'en' ? 'bg-blue-100' : ''} hover:bg-blue-100 text-blue-700`}
                onClick={() => { setLang('en'); setDropdownOpen(false); }}
              >
                English
              </button>
              <button
                className={`block w-full text-left px-4 py-2 text-sm ${lang === 'np' ? 'bg-blue-100' : ''} hover:bg-blue-100 text-blue-700`}
                onClick={() => { setLang('np'); setDropdownOpen(false); }}
              >
                नेपाली
              </button>
            </div>
          )}
        </div>
        
        {/* Hamburger Menu Button */}
        <button
          className="md:hidden flex items-center text-white focus:outline-none ml-2"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label="Open navigation menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileNavOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-500 z-20 flex flex-col items-center md:hidden shadow-lg animate-fade-in">
          <Link
            href="/"
            className="w-full text-center py-3 text-white hover:bg-blue-600"
            onClick={() => setMobileNavOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="w-full text-center py-3 text-white hover:bg-blue-600"
            onClick={() => setMobileNavOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/complaints"
            className="w-full text-center py-3 text-white hover:bg-blue-600"
            onClick={() => setMobileNavOpen(false)}
          >
            Complaints
          </Link>
        </div>
      )}
    </nav>
  );
}
