import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { FiUsers, FiMic, FiStar, FiLogOut, FiBarChart2 } from 'react-icons/fi';

async function handleLogout() {
  'use server';
  (await cookies()).set('admin_auth', '', { maxAge: -1, path: '/' });
  redirect('/admin/login');
}

export default function DashboardPage() {
  // Server-side cookie check
  const cookieStore = cookies();
  const isAdmin = cookieStore.get('admin_auth')?.value === '1';
  if (!isAdmin) {
    redirect('/admin/login');
  }

  // Placeholder data
  const kpis = [
    { label: 'Total Users', value: 128, icon: <FiUsers className="w-6 h-6 text-indigo-500" /> },
    { label: 'Interviews', value: 42, icon: <FiMic className="w-6 h-6 text-emerald-500" /> },
    { label: 'Avg. Score', value: '8.2', icon: <FiStar className="w-6 h-6 text-yellow-500" /> },
  ];
  const recentInterviews = [
    { id: 1, user: 'Alice', date: '2024-06-09', score: 9.1 },
    { id: 2, user: 'Bob', date: '2024-06-08', score: 7.8 },
    { id: 3, user: 'Charlie', date: '2024-06-07', score: 8.5 },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">Monitor platform activity and manage your app.</p>
          </div>
          <form action={handleLogout}>
            <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
              <FiLogOut /> Logout
            </button>
          </form>
        </div>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center gap-4">
              <div>{kpi.icon}</div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{kpi.label}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Chart & Table Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Chart Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center justify-center min-h-[220px]">
            <FiBarChart2 className="w-12 h-12 text-indigo-400 mb-2" />
            <div className="text-gray-500 dark:text-gray-400">(Chart coming soon)</div>
          </div>

          {/* Recent Interviews Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Interviews</h2>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-2 pr-4">User</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Score</th>
                </tr>
              </thead>
              <tbody>
                {recentInterviews.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2 pr-4">{row.user}</td>
                    <td className="py-2 pr-4">{row.date}</td>
                    <td className="py-2 pr-4 font-semibold">{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
} 