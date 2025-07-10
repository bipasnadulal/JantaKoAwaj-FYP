'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import infoNepal from 'info-nepal';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '', phone: '', password: '',
    confirmPassword: '', province: '',
    district: '', municipality: '', ward: ''
  });
  const [errors, setErrors] = useState({});
  const [districts, setDistricts] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);

  const provinces = Object.keys(infoNepal.districtsOfProvince);

  useEffect(() => {
    if (form.province) {
      const dlist = infoNepal.districtsOfProvince[form.province] || [];
      setDistricts(dlist);
      setForm(f => ({ ...f, district: '', municipality: '' }));
      setMunicipalities([]);
    }
  }, [form.province]);

  useEffect(() => {
    if (form.district) {
      const mlist = infoNepal.localBodies[form.district] || [];
      setMunicipalities(mlist);
      setForm(f => ({ ...f, municipality: '' }));
    }
  }, [form.district]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.username) err.username = 'Username is required';
    if (!/^9[678]\d{8}$/.test(form.phone))
      err.phone = 'Enter valid Nepali mobile (98/97/96...)';
    if (form.password.length < 6)
      err.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword)
      err.confirmPassword = 'Passwords must match';
    if (!form.province) err.province = 'Province is required';
    if (!form.district) err.district = 'District is required';
    if (!form.municipality)
      err.municipality = 'Municipality is required';
    if (!form.ward) err.ward = 'Ward number is required';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (!Object.keys(errs).length) {
      console.log('Form submitted:', form);
      // send data to backend here
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username, Phone, Password, Confirm Password */}
          {['username','phone','password','confirmPassword'].map((field) => (
            <div key={field}>
              <label className="capitalize">{field.replace(/([A-Z])/g,' $1')}</label>
              <input
                type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                name={field}
                value={form[field]}
                placeholder={field==='phone'?'98XXXXXXXX':''}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
              {errors[field] && <p className="text-red-500">{errors[field]}</p>}
            </div>
          ))}

          {/* Province */}
          <div>
            <label>Province</label>
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
            {errors.province && <p className="text-red-500">{errors.province}</p>}
          </div>

          {/* District */}
          <div>
            <label>District</label>
            <select
              name="district"
              value={form.district}
              onChange={handleChange}
              disabled={!districts.length}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">--Select District--</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.district && <p className="text-red-500">{errors.district}</p>}
          </div>

          {/* Municipality */}
          <div>
            <label>Municipality</label>
            <select
              name="municipality"
              value={form.municipality}
              onChange={handleChange}
              disabled={!municipalities.length}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">--Select Municipality--</option>
              {municipalities.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            {errors.municipality && (
              <p className="text-red-500">{errors.municipality}</p>
            )}
          </div>

          {/* Ward */}
          <div>
            <label>Ward Number</label>
            <select
              name="ward"
              value={form.ward}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">--Select Ward--</option>
              {[...Array(35)].map((_, i) => (
                <option key={i + 1} value={i + 1}>Ward {i + 1}</option>
              ))}
            </select>
            {errors.ward && <p className="text-red-500">{errors.ward}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
