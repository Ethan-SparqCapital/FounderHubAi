import React from 'react';

export type Slide = {
  title: string;
  content?: string;
  design?: string;
  imageUrl?: string;
  videoUrl?: string;
  comments?: string[];
};

type Props = {
  slides: Slide[];
  onEditSlide?: (index: number) => void;
};

export default function SlideManagement({ slides, onEditSlide }: Props) {
  if (!slides || slides.length === 0) {
    return <div className="text-gray-400 text-center py-8">No slides generated yet.</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {slides.map((slide, idx) => (
        <div key={idx} className="bg-white border rounded-lg p-4 shadow-sm relative">
          <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">final</div>
          <h4 className="font-semibold mb-2">{slide.title}</h4>
          {slide.content && <div className="text-gray-700 text-sm mb-2">{slide.content}</div>}
          {slide.design && <div className="text-gray-500 text-xs">{slide.design}</div>}
          <button
            className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
            onClick={() => onEditSlide && onEditSlide(idx)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
} 