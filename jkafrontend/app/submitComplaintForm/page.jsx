'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import infoNepal from 'info-nepal';
import { containerClasses } from '@mui/material';

export default function SubmitComplaintForm() {
  const [form, setForm] = useState({
    category: '',
    title: '',
    description: '',
    province: '',
    district: '',
    municipality: '',
    ward: '',
  });

  const router = useRouter();

  const [showPreview, setShowPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [districts, setDistricts] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);

  const categories = [
    'Education',
    'Environment',
    'Municipal Guard',
    'Agriculture and Livestocks',
    'Public Infrastructure',
  ];

  const provinces = Object.keys(infoNepal.districtsOfProvince);

  //based on the selected province districts are updated/displayed on the dropdown
  useEffect(() => {
    if (form.province) {
      const dists = infoNepal.districtsOfProvince[form.province] || [];
      setDistricts(dists);
      setForm((prev) => ({ ...prev, district: '', municipality: '' }));
      setMunicipalities([]);
    }
  }, [form.province]);

  //based on the districts selected, municipalities are displayed or updated
  useEffect(() => {
    if (form.district) {
      const munis = infoNepal.localBodies[form.district] || [];
      setMunicipalities(munis);
      setForm((prev) => ({ ...prev, municipality: '' }));
    }
  }, [form.district]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePreview = (e) => {
    e.preventDefault();
    if (
      form.category &&
      form.title &&
      form.description &&
      form.province &&
      form.district &&
      form.municipality &&
      form.ward
    ) {
      setShowPreview(true);
    } else {
      alert('Please fill out all fields before previewing.');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));

    if (!token) {
      router.push('/login?redirect=/submitComplaintForm');
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/complaints/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(form), // no need to include user
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || 'Failed to submit complaint');
      }

      const data = await res.json();
      console.log('Complaint submitted successfully:', data);

      setSubmitted(true);
      setShowPreview(false);
      setForm({
        category: '',
        title: '',
        description: '',
        province: '',
        district: '',
        municipality: '',
        ward: '',
      });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-6 lg:px-10">
      <div className="max-w-3xl w-full">
        <Link href="/" className="text-blue-600 hover:underline inline-flex items-center mb-6">
          <span className="text-xl mr-2">←</span> Back to Home
        </Link>

        <h2 className="text-3xl font-bold text-blue-700 mb-8">Submit a Public Complaint</h2>

        {/* FORM */}
        {!showPreview && !submitted && (
          <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg" onSubmit={handlePreview}>

            <div>
              <label className="block mb-1 font-medium">Complaint Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block mb-1 font-medium">Title of the Problem</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                placeholder="e.g., Broken street light near school"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium">Complaint Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                className="w-full border px-4 py-2 rounded"
                placeholder="Explain the issue in detail..."
              />
            </div>

            {/* Province */}
            <div>
              <label className="block mb-1 font-medium">Province</label>
              <select
                name="province"
                value={form.province}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="">-- Select Province --</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block mb-1 font-medium">District</label>
              <select
                name="district"
                value={form.district}
                onChange={handleChange}
                disabled={!districts.length}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="">-- Select District --</option>
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Municipality */}
            <div>
              <label className="block mb-1 font-medium">Municipality</label>
              <select
                name="municipality"
                value={form.municipality}
                onChange={handleChange}
                disabled={!municipalities.length}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="">-- Select Municipality --</option>
                {municipalities.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Ward */}
            <div>
              <label className="block mb-1 font-medium">Ward Number</label>
              <select
                name="ward"
                value={form.ward}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="">-- Select Ward No --</option>
                {[...Array(35)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Ward {i + 1}</option>
                ))}
              </select>
            </div>

            {/* Preview */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
            >
              Preview Complaint
            </button>
          </form>
        )}

        {/* Preview Section */}
        {showPreview && !submitted && (
          <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
            <h3 className="text-xl font-bold text-blue-700 mb-4">Preview Your Complaint</h3>
            <p><strong>Category:</strong> {form.category}</p>
            <p><strong>Title:</strong> {form.title}</p>
            <p><strong>Description:</strong> {form.description}</p>
            <p><strong>Province:</strong> {form.province}</p>
            <p><strong>District:</strong> {form.district}</p>
            <p><strong>Municipality:</strong> {form.municipality}</p>
            <p><strong>Ward No:</strong> {form.ward}</p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Confirm and Submit
              </button>
              <button
                onClick={() => setShowPreview(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Go Back and Edit
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {submitted && (
          <div className="bg-green-100 border border-green-300 text-green-800 p-6 rounded-lg shadow-md mt-4">
            <h3 className="text-2xl font-bold mb-2">Your complaint has been submitted successfully!</h3>
            <p>
              Our system will verify the complaint for genuineness.
              Once approved, it will be published and forwarded to the concerned authority.
              Thank you for raising your voice responsibly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
