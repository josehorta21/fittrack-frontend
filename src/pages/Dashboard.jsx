import React from 'react';

function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
        <p className="text-gray-600 text-lg">You're now logged in 🎉</p>
      </div>
    </div>
  );
}

export default Dashboard;
