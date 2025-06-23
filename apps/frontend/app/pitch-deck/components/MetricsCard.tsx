import React from 'react';

export default function MetricsCard() {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h3 className="font-semibold mb-2">Presentation Metrics</h3>
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex justify-between"><span>Total Views</span><span className="font-bold">247</span></div>
        <div className="flex justify-between"><span>Avg. Time</span><span className="font-bold">8.5 min</span></div>
        <div className="flex justify-between"><span>Completion Rate</span><span className="text-green-600 font-bold">78%</span></div>
        <div className="flex justify-between"><span>Investor Interest</span><span className="text-blue-600 font-bold">High</span></div>
      </div>
    </div>
  );
} 