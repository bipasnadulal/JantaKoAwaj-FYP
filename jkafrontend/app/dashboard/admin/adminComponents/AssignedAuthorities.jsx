'use client';
import React from 'react';
import Link from 'next/link';

const authorities = [
  {
    name: 'Education',
    total: 24,
    inProgress: 12,
    resolved: 9,
    notSolved: 3,
    slug: 'education'
  },
  {
    name: 'Environment',
    total: 30,
    inProgress: 15,
    resolved: 10,
    notSolved: 5,
    slug: 'environment'
  },
  {
    name: 'Municipal Guard',
    total: 18,
    inProgress: 7,
    resolved: 9,
    notSolved: 2,
    slug: 'municipal-guard'
  },
  {
    name: 'Agriculture',
    total: 20,
    inProgress: 10,
    resolved: 5,
    notSolved: 5,
    slug: 'agriculture'
  },
  {
    name: 'Public Infrastructure',
    total: 26,
    inProgress: 10,
    resolved: 12,
    notSolved: 4,
    slug: 'infrastructure'
  },
];

export default function AssignedAuthorities() {
  return (
    <section className="p-6 lg:px-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Assigned Authorities Overview</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {authorities.map((auth) => (
          <div
            key={auth.name}
            className="bg-white/80 backdrop-blur shadow-lg rounded-xl border border-gray-200 p-6 text-gray-800 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-blue-600">{auth.name}</h3>
              <Link
                href={`/dashboard/admin/authority/${auth.slug}`}
                className="text-sm text-blue-500 hover:underline"
              >
                View Details →
              </Link>
            </div>
            <ul className="text-sm space-y-1">
              <li>Total Complaints: <span className="font-medium">{auth.total}</span></li>
              <li>In Progress: <span className="font-medium text-yellow-600">{auth.inProgress}</span></li>
              <li>Resolved: <span className="font-medium text-green-600">{auth.resolved}</span></li>
              <li>Not Solved: <span className="font-medium text-red-600">{auth.notSolved}</span></li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
