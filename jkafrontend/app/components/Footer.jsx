import React from "react";

export default function Footer(){
    return(
        <footer className="bg-blue-500 text-white py-8 px-6 mt-20">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 md:px-12 lg:px-10 ">
    
    {/* Logo / Name */}
    <div>
      <h2 className="text-2xl font-bold">Janta ko Aawaj</h2>
      <p className="text-sm mt-2 opacity-80">
        Where Every Voice Matters.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-1 text-sm">
        <li><a href="/" className="hover:underline">Home</a></li>
        <li><a href="/about" className="hover:underline">About Us</a></li>
        <li><a href="/complaints" className="hover:underline">Complaints</a></li>
        <li><a href="/submit" className="hover:underline">Submit Complaint</a></li>
        <li><a href="/contact" className="hover:underline">Contact</a></li>
      </ul>
    </div>

    {/* Credits + Disclaimer */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Info</h3>
      <p className="text-sm mb-2">
        Developed as part of a Final Year Project at NCCS.
      </p>
      <p className="text-xs text-gray-200">
        Disclaimer: This platform is currently for academic and demonstration use only.
      </p>
    </div>
  </div>

  {/* Bottom line */}
  <div className="mt-8 text-center text-xs text-blue-100 border-t border-blue-500 pt-4">
    © 2025 Janta ko Aawaj. All rights reserved.
  </div>
</footer>

    )
}