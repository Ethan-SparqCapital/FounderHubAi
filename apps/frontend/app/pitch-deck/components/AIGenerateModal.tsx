import React, { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onGenerate: (problem: string, solution: string) => void;
  loading: boolean;
};

export default function AIGenerateModal({ open, onClose, onGenerate, loading }: Props) {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Generate Slides with AI</h3>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Problem</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-2"
            value={problem}
            onChange={e => setProblem(e.target.value)}
            placeholder="Describe the problem your startup solves"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Solution</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={solution}
            onChange={e => setSolution(e.target.value)}
            placeholder="Describe your solution"
            rows={3}
            disabled={loading}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => onGenerate(problem, solution)}
            disabled={loading || !problem || !solution}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
} 