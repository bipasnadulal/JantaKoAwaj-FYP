'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Navbar() {
  const [lang, setLang] = useState('en');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] =useState(false);

  return (
    <nav className="bg-blue-500 shadow-md py-5 fixed top-0 left-0 w-full z-50 ">
      <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-10 flex items-center justify-between'>
{/* Left: Logo and Nav */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <Link href="/">
        <Image
         src="/jantakoawajLogo.png"
          alt="Janta Ko Awaj Logo"
          width={120}
          height={120}
          className="h-14 w-14 md:h-20 md:w-20"
          />
          {/* <h1 className="font-bold text-xl md:text-2xl text-white cursor-pointer">Janta Ko Awaj</h1> */}
        </Link>
        {/* Nav Links */}
        <div className="hidden md:flex space-x-6 text-white">
          <Link href="/">Home</Link>
           <a href="#about">About Us</a>
          <Link href="/complaintsPage">Complaints</Link>
        </div>
      </div>

      {/* Right: Icons and Language switching */}
      <div className="flex items-center space-x-4">
        
        {/* Notification Icon */}
        <button className="relative text-white hover:text-blue-200 cursor-pointer">
          <NotificationsNoneIcon style={{ fontSize: 30 }} />
        </button>

        {/* Profile Icon with Dropdown*/}
        <div className="relative">
          <button className='text-white hover:text-blue-200 cursor-pointer'
          onClick={()=> {
setProfileDropdown((prev) => !prev);
setDropdownOpen(false);
}}
          >
<AccountCircleIcon style={{ fontSize: 30 }} />
          </button>
        
        {profileDropdown && (
          <div className='absolute right-0 mt-2 w-32 bg-white rounded shadow-lg z-20'>
          {/* user login */}
            <Link 
            href="/login"
            className='block w-full text-left px-4 py-2 text-sm hover:bg-blue-100 text-blue-700'
            onClick={()=>setProfileDropdown(false)}
            >Login</Link>

            {/* authority login */}
            <Link 
            href="/authoritylogin"
            className='block w-full text-left px-4 py-2 text-sm hover:bg-blue-100 text-blue-700'
            onClick={()=>setProfileDropdown(false)}
            >Authority Login</Link>
          </div>
        )}
</div>
        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => {setDropdownOpen(!dropdownOpen);
              setProfileDropdown(false);
            }}
            className="flex items-center text-white px-2 py-1 rounded hover:bg-blue-50 hover:text-blue-500 cursor-pointer"
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
        
        {/* Hamburger Menu Button for small screen size */}
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
      </div>
      
    </nav>
  );
}