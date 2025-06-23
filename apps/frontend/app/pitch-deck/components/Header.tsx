import React from 'react';

export default function Header() {
  return (
    <header className="flex items-center justify-between h-20 px-8 bg-white border-b">
      <div>
        <select className="bg-gray-100 border rounded px-3 py-2 text-gray-700 font-medium">
          <option>My Startup</option>
        </select>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-700">Demo User</span>
        <span className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">D</span>
      </div>
    </header>
  );
} 