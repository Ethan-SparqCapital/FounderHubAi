import React, { useState, useEffect } from 'react';
import { Slide, TextBlock, SlideBlock } from '../types/slide';

interface ManualSlideEditorProps {
  slide: Slide;
  onSave: (updatedSlide: Slide) => void;
  onClose: () => void;
}

export default function ManualSlideEditor({ slide, onSave, onClose }: ManualSlideEditorProps) {
  const [editedBlocks, setEditedBlocks] = useState<SlideBlock[]>([]);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    setEditedBlocks(slide.blocks);
    setEditedTitle(slide.title || '');
  }, [slide]);

  const handleBlockContentChange = (index: number, newContent: string) => {
    setEditedBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      const block = newBlocks[index];
      if (block.type === 'text') {
        newBlocks[index] = {
          ...block,
          content: newContent
        };
      }
      return newBlocks;
    });
  };

  const handleAddTextBlock = () => {
    const newBlock: TextBlock = {
      id: `text-${Math.random().toString(36).substr(2, 9)}`,
      type: 'text',
      content: '',
      position: { x: 50, y: 50 + (editedBlocks.length * 100) },
      size: { width: 500, height: 80 },
      isEditable: true
    };
    setEditedBlocks([...editedBlocks, newBlock]);
  };

  const handleSave = () => {
    const updatedSlide: Slide = {
      ...slide,
      title: editedTitle,
      content: editedBlocks
        .filter((block): block is TextBlock => block.type === 'text')
        .map(block => block.content)
        .join('\n\n'),
      blocks: editedBlocks,
    };
    onSave(updatedSlide);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Edit Slide</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slide Title
          </label>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Content Blocks
            </label>
            <button
              onClick={handleAddTextBlock}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Text Block
            </button>
          </div>
          
          <div className="space-y-4">
            {editedBlocks.map((block, index) => (
              block.type === 'text' ? (
                <div key={block.id} className="relative">
                  <textarea
                    value={block.content}
                    onChange={(e) => handleBlockContentChange(index, e.target.value)}
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div key={block.id} className="p-4 border border-gray-300 rounded-md">
                  <p className="text-gray-500">Visual Block</p>
                </div>
              )
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 