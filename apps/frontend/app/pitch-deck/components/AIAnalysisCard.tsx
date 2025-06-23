import React from 'react';

type Props = {
  score: number | null;
  onShowFeedback: () => void;
  analysisLoading: boolean;
};

export default function AIAnalysisCard({ score, onShowFeedback, analysisLoading }: Props) {
  const displayScore = score !== null ? Math.round(score / 10) : null;
  
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h3 className="font-semibold mb-2">AI Analysis</h3>
      <div className="flex items-center mb-2">
        <span className="text-2xl font-bold text-red-500 mr-2">{displayScore !== null ? displayScore : '--'}</span>
        <span className="text-gray-500">/ 10</span>
      </div>
      <button 
        className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700 disabled:opacity-50" 
        onClick={onShowFeedback}
        disabled={analysisLoading}
      >
        {analysisLoading ? 'Generating feedback...' : 'Show AI Feedback'}
      </button>
    </div>
  );
} 