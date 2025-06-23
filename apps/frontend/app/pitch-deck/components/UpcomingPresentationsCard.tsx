import React from 'react';

const presentations = [
  { name: 'Benchmark Capital', date: '2024-06-12', type: 'In-person', percent: 85 },
  { name: 'Sequoia Capital', date: '2024-06-18', type: 'Virtual', percent: 60 },
  { name: 'Board Meeting', date: '2024-06-25', type: 'In-person', percent: 40 },
];

export default function UpcomingPresentationsCard() {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h3 className="font-semibold mb-2">Upcoming Presentations</h3>
      <div className="flex flex-col gap-2">
        {presentations.map((p) => (
          <div key={p.name} className="bg-purple-50 rounded p-3 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="font-medium text-purple-900">{p.name}</span>
              <span className="text-xs text-gray-500">{p.date} • {p.type}</span>
            </div>
            <div className="text-xs text-purple-700 mt-1">{p.percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
} 