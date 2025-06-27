'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
    province: '',
    district: '',
    ward: '',
  });

  const districts = [
  "Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Khotang", "Morang", "Okhaldhunga", "Panchthar", "Sankhuwasabha", "Solukhumbu", "Sunsari", "Taplejung", "Terhathum", "Udayapur",
  "Bara", "Dhanusha", "Mahottari", "Parsa", "Rautahat", "Saptari", "Sarlahi", "Siraha",
  "Bhaktapur", "Chitwan", "Dhading", "Dolakha", "Kathmandu", "Kavrepalanchok", "Lalitpur", "Makwanpur", "Nuwakot", "Ramechhap", "Rasuwa", "Sindhuli", "Sindhupalchok",
  "Baglung", "Gorkha", "Kaski", "Lamjung", "Manang", "Mustang", "Myagdi", "Nawalpur", "Parbat", "Syangja", "Tanahun",
  "Arghakhanchi", "Banke", "Bardiya", "Dang", "Eastern Rukum", "Gulmi", "Kapilvastu", "Palpa", "Parasi", "Pyuthan", "Rolpa", "Rupandehi",
  "Dailekh", "Dolpa", "Humla", "Jajarkot", "Jumla", "Kalikot", "Mugu", "Salyan", "Surkhet", "Western Rukum",
  "Achham", "Baitadi", "Bajhang", "Bajura", "Dadeldhura", "Darchula", "Doti", "Kailali", "Kanchanpur"
];

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};
    if (!form.username) err.username = 'Username is required';
    if (!form.phone || !/^9[678]\d{8}$/.test(form.phone)) {
  err.phone = 'Enter a valid Nepali mobile number (starts with 98/97/96)';
}
    if (!form.password || form.password.length < 6) err.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) err.confirmPassword = 'Passwords do not match';
    if (!form.province) err.province = 'Province is required';
    if (!form.district) err.district = 'District is required';
    if (!form.ward || isNaN(form.ward)) err.ward = 'Valid ward number is required';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      console.log('Form Submitted:', form);
      // Adding backend request here
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Register</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Phone Number */}
<div>
  <label className="block text-sm font-medium mb-1">Phone Number</label>
  <input
    type="text"
    name="phone"
    placeholder="e.g., 9801234567"
    className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
    value={form.phone}
    onChange={handleChange}
  />
  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
</div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Province */}
<div>
  <label className="block text-sm font-medium mb-1">Province</label>
  <select
    name="province"
    className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
    value={form.province}
    onChange={handleChange}
  >
    <option value="">-- Select Province --</option>
    <option value="Koshi">Koshi Province</option>
    <option value="Madhesh">Madhesh Province</option>
    <option value="Bagmati">Bagmati Province</option>
    <option value="Gandaki">Gandaki Province</option>
    <option value="Lumbini">Lumbini Province</option>
    <option value="Karnali">Karnali Province</option>
    <option value="Sudurpashchim">Sudurpashchim Province</option>
  </select>
  {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
</div>

          {/* District */}
<div>
  <label className="block text-sm font-medium mb-1">District</label>
  <select
    name="district"
    className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
    value={form.district}
    onChange={handleChange}
  >
    <option value="">-- Select District --</option>
    {districts.map((dist) => (
      <option key={dist} value={dist}>{dist}</option>
    ))}
  </select>
  {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
</div>

          {/* Ward Number */}
<div>
  <label className="block text-sm font-medium mb-1">Ward Number</label>
  <select
    name="ward"
    className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
    value={form.ward}
    onChange={handleChange}
  >
    <option value="">-- Select Ward No --</option>
    {[...Array(35)].map((_, i) => (
      <option key={i + 1} value={i + 1}>
        Ward {i + 1}
      </option>
    ))}
  </select>
  {errors.ward && <p className="text-red-500 text-sm mt-1">{errors.ward}</p>}
</div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>

        {/* Already have account */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
