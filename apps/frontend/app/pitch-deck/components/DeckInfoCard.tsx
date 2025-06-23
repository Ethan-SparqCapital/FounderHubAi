import React from 'react';

type Props = {
  deckTitle: string;
  deckDescription: string;
};

export default function DeckInfoCard({ deckTitle, deckDescription }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold">{deckTitle || 'DataFlow AI Pitch Deck'}</h2>
          <div className="text-gray-500 text-sm">Version 4.1 • Series A Investors</div>
        </div>
        <div className="text-blue-600 font-bold text-lg">75%</div>
      </div>
      <div className="flex items-center gap-8 mb-4">
        <div className="flex flex-col items-center">
          <span className="bg-green-100 text-green-600 rounded-full p-2 mb-1">✔️</span>
          <span className="text-xs text-gray-600">Idea</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="bg-green-100 text-green-600 rounded-full p-2 mb-1">✔️</span>
          <span className="text-xs text-gray-600">Outline</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="bg-blue-100 text-blue-600 rounded-full p-2 mb-1">▶️</span>
          <span className="text-xs text-gray-600">Slides</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="bg-gray-200 text-gray-400 rounded-full p-2 mb-1">○</span>
          <span className="text-xs text-gray-600">Review</span>
        </div>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500" style={{ width: '75%' }} />
      </div>
    </div>
  );
} 