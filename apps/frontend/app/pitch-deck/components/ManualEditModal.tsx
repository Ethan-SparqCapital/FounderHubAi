import React, { useState, useEffect } from 'react';
import VisualBlock, { VisualBlockProps } from './VisualBlock';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import FontSize from '@tiptap/extension-font-size';
import Image from '@tiptap/extension-image';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Slide, SlideBlock, TextBlock, VisualBlockContainer, VisualBlock as VisualBlockType, EditorSlide } from '../../../types/slide';

const ResponsiveGridLayout = WidthProvider(Responsive);

const THEMES = [
  { name: 'Classic', className: 'bg-white text-black' },
  { name: 'Modern Blue', className: 'bg-blue-50 text-blue-900' },
  { name: 'Dark', className: 'bg-gray-900 text-white' },
  { name: 'Vibrant', className: 'bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200 text-gray-900' },
];

type ManualEditModalProps = {
  slide: EditorSlide;
  onClose: () => void;
  onSave: (updatedSlide: Slide) => void;
};

function getDefaultLayout(blocks: SlideBlock[]) {
  return blocks.map((block, i) => ({
    i: block.id,
    x: (i % 2) * 6,
    y: Math.floor(i / 2) * 4,
    w: 6,
    h: 4,
    minW: 3,
    minH: 2,
  }));
}

// Add this child component for text blocks
function TextBlockEditor({ id, content, onChange }: { id: string; content: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Color,
      FontSize,
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      let html = editor.getHTML();
      if (html.startsWith('<p>') && html.endsWith('</p>')) {
        const inner = html.slice(3, -4);
        if (!inner.includes('<p>') && !inner.includes('</p>')) {
          html = inner;
        }
      }
      onChange(html);
    },
  });

  if (!editor) return null;

  return (
    <div>
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap gap-1 mb-2 border-b pb-1">
        <button type="button" className={editor.isActive('bold') ? 'font-bold text-blue-600' : ''} onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></button>
        <button type="button" className={editor.isActive('italic') ? 'italic text-blue-600' : ''} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></button>
        <button type="button" className={editor.isActive('underline') ? 'underline text-blue-600' : ''} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></button>
        <button type="button" className={editor.isActive('strike') ? 'line-through text-blue-600' : ''} onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></button>
        <button type="button" className={editor.isActive('blockquote') ? 'text-blue-600' : ''} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝</button>
        <button type="button" className={editor.isActive('bulletList') ? 'text-blue-600' : ''} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button type="button" className={editor.isActive('orderedList') ? 'text-blue-600' : ''} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
        <button type="button" className={editor.isActive({ textAlign: 'left' }) ? 'text-blue-600' : ''} onClick={() => editor.chain().focus().setTextAlign('left').run()}>Left</button>
        <button type="button" className={editor.isActive({ textAlign: 'center' }) ? 'text-blue-600' : ''} onClick={() => editor.chain().focus().setTextAlign('center').run()}>Center</button>
        <button type="button" className={editor.isActive({ textAlign: 'right' }) ? 'text-blue-600' : ''} onClick={() => editor.chain().focus().setTextAlign('right').run()}>Right</button>
        <input
          type="color"
          title="Text color"
          className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer"
          onChange={e => editor.chain().focus().setColor(e.target.value).run()}
        />
        <select
          className="text-xs border rounded px-1"
          value={editor.getAttributes('fontSize').fontSize || '16px'}
          onChange={e => editor.chain().focus().setFontSize(e.target.value).run()}
        >
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="24px">24</option>
          <option value="32px">32</option>
        </select>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

// Add this child component for visual blocks
function VisualBlockEditor({ visual, onChange, onTypeChange, onRemove }: {
  visual: VisualBlockProps;
  onChange: (data: any) => void;
  onTypeChange: (type: string) => void;
  onRemove: () => void;
}) {
  const type = visual.type;
  const data = visual.data || [];
  return (
    <div className="space-y-2">
      <div className="mb-2">
        <VisualBlock type={visual.type} data={visual.data} config={visual.config} />
      </div>
      <div className="flex gap-2 items-center mb-2">
        <select
          value={type}
          onChange={e => onTypeChange(e.target.value)}
          className="border rounded px-2 py-1 text-xs"
        >
          <option value="pie">Pie</option>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="scatter">Scatter</option>
          <option value="table">Table</option>
        </select>
      </div>
      {['pie', 'bar', 'line'].includes(type) && (
        <div>
          <div className="flex flex-col gap-2">
            {data.map((d: any, i: number) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  className="border rounded px-1 text-xs w-20"
                  value={d.name}
                  placeholder="Label"
                  onChange={e => {
                    const newData = [...data];
                    newData[i] = { ...newData[i], name: e.target.value };
                    onChange(newData);
                  }}
                />
                <input
                  className="border rounded px-1 text-xs w-16"
                  type="number"
                  value={d.value}
                  placeholder="Value"
                  onChange={e => {
                    const newData = [...data];
                    newData[i] = { ...newData[i], value: Number(e.target.value) };
                    onChange(newData);
                  }}
                />
                <input
                  className="border rounded px-1 text-xs w-16"
                  type="color"
                  value={d.color || '#8884d8'}
                  onChange={e => {
                    const newData = [...data];
                    newData[i] = { ...newData[i], color: e.target.value };
                    onChange(newData);
                  }}
                />
                <button
                  className="text-xs text-gray-400 hover:text-red-600 ml-1"
                  title="Remove data point"
                  onClick={() => {
                    const newData = data.filter((_: any, idx: number) => idx !== i);
                    onChange(newData);
                  }}
                >🗑️</button>
              </div>
            ))}
            <button
              className="text-xs text-blue-600 underline mt-1 self-start"
              onClick={() => onChange([...data, { name: '', value: 0, color: '#8884d8' }])}
            >Add Data</button>
          </div>
        </div>
      )}
      {type === 'scatter' && (
        <div>
          <div className="flex flex-col gap-2">
            {data.map((d: any, i: number) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  className="border rounded px-1 text-xs w-16"
                  type="number"
                  value={d.x}
                  placeholder="X"
                  onChange={e => {
                    const newData = [...data];
                    newData[i] = { ...newData[i], x: Number(e.target.value) };
                    onChange(newData);
                  }}
                />
                <input
                  className="border rounded px-1 text-xs w-16"
                  type="number"
                  value={d.y}
                  placeholder="Y"
                  onChange={e => {
                    const newData = [...data];
                    newData[i] = { ...newData[i], y: Number(e.target.value) };
                    onChange(newData);
                  }}
                />
                <input
                  className="border rounded px-1 text-xs w-16"
                  type="color"
                  value={d.color || '#8884d8'}
                  onChange={e => {
                    const newData = [...data];
                    newData[i] = { ...newData[i], color: e.target.value };
                    onChange(newData);
                  }}
                />
              </div>
            ))}
            <button
              className="text-xs text-blue-600 underline mt-1 self-start"
              onClick={() => onChange([...data, { x: 0, y: 0, color: '#8884d8' }])}
            >Add Data</button>
          </div>
        </div>
      )}
      {type === 'table' && (
        <div className="space-y-2">
          <div className="flex gap-2 mb-1">
            <span className="text-xs font-semibold">Columns:</span>
            {visual.data?.columns?.map((col: string, i: number) => (
              <input
                key={i}
                className="border rounded px-1 text-xs w-20"
                value={col}
                onChange={e => {
                  const newColumns = [...visual.data.columns];
                  newColumns[i] = e.target.value;
                  onChange({ ...visual.data, columns: newColumns });
                }}
              />
            ))}
            <button
              className="text-xs text-blue-600 underline"
              onClick={() => onChange({ ...visual.data, columns: [...(visual.data.columns || []), ''] })}
            >Add Column</button>
            <button
              className="text-xs text-red-600 underline"
              onClick={() => onChange({ ...visual.data, columns: visual.data.columns.slice(0, -1) })}
              disabled={!visual.data.columns?.length}
            >Remove Last</button>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold">Rows:</span>
            {visual.data?.rows?.map((row: string[], i: number) => (
              <div key={i} className="flex gap-2 items-center">
                {row.map((cell, j) => (
                  <input
                    key={j}
                    className="border rounded px-1 text-xs w-20"
                    value={cell}
                    onChange={e => {
                      const newRows = visual.data.rows.map((r: string[], idx: number) =>
                        idx === i ? r.map((c, jj) => (jj === j ? e.target.value : c)) : r
                      );
                      onChange({ ...visual.data, rows: newRows });
                    }}
                  />
                ))}
                <button
                  className="text-xs text-red-600 underline"
                  onClick={() => {
                    const newRows = visual.data.rows.filter((_: any, idx: number) => idx !== i);
                    onChange({ ...visual.data, rows: newRows });
                  }}
                >Remove</button>
              </div>
            ))}
            <button
              className="text-xs text-blue-600 underline mt-1 self-start"
              onClick={() => onChange({ ...visual.data, rows: [...(visual.data.rows || []), Array(visual.data.columns?.length || 1).fill('')] })}
            >Add Row</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ManualEditModal({ slide, onClose, onSave }: ManualEditModalProps) {
  const [blocks, setBlocks] = useState<SlideBlock[]>(slide.blocks || []);
  const [layout, setLayout] = useState(getDefaultLayout(blocks));
  const [theme, setTheme] = useState(slide.theme || THEMES[0].name);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  function handleAddText() {
    const newBlock: TextBlock = {
      id: `text-${Math.random().toString(36).substr(2, 9)}`,
      type: 'text',
      content: 'New text block',
      position: { x: 50, y: 50 },
      size: { width: 500, height: 80 },
      isEditable: true
    };
    setBlocks([...blocks, newBlock]);
    setLayout([...layout, { i: newBlock.id, x: 0, y: Infinity, w: 6, h: 4, minW: 3, minH: 2 }]);
  }

  function handleAddVisual() {
    const newBlock: VisualBlockContainer = {
      id: `visual-${Math.random().toString(36).substr(2, 9)}`,
        type: 'visual',
      visual: {
        type: 'pie',
        data: [
          { name: 'A', value: 40, color: '#8884d8' },
          { name: 'B', value: 30, color: '#82ca9d' },
          { name: 'C', value: 30, color: '#ffc658' }
        ]
      },
      position: { x: 50, y: 50 },
      size: { width: 500, height: 300 }
    };
    setBlocks([...blocks, newBlock]);
    setLayout([...layout, { i: newBlock.id, x: 0, y: Infinity, w: 6, h: 4, minW: 3, minH: 2 }]);
  }

  function handleRemoveBlock(id: string) {
    setBlocks(blocks.filter(b => b.id !== id));
    setLayout(layout.filter(l => l.i !== id));
  }

  function handleVisualDataChange(idx: number, newData: any) {
    setBlocks(blocks.map((block, i) => {
      if (i === idx && block.type === 'visual') {
        return {
          ...block,
          visual: { ...block.visual, data: newData }
        } as VisualBlockContainer;
      }
      return block;
    }));
  }

  function handleVisualTypeChange(idx: number, newType: string) {
    setBlocks(blocks.map((block, i) => {
      if (i === idx && block.type === 'visual') {
        return {
          ...block,
          visual: { ...block.visual, type: newType as VisualBlockType['type'] }
        } as VisualBlockContainer;
      }
      return block;
    }));
  }

  function handleTextChange(idx: number, newContent: string) {
    setBlocks(blocks.map((block, i) => {
      if (i === idx && block.type === 'text') {
        return {
          ...block,
          content: newContent
        } as TextBlock;
      }
      return block;
    }));
  }

  // AI Action Handlers
  async function handleGenerateContent() {
    setAiLoading(true);
    setAiError(null);
    try {
      const response = await fetch('http://localhost:8000/generate-slide-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: slide.title,
          solution: slide.design || '',
          slide_title: slide.title,
          current_content: blocks.find(b => b.type === 'text')?.content || '',
        }),
      });
      if (!response.ok) throw new Error('Failed to generate content');
      const data = await response.json();
      setBlocks(blocks => blocks.map(b => b.type === 'text' ? { ...b, content: data.content } : b));
    } catch (error) {
      setAiError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setAiLoading(false);
    }
  }

  async function handleOptimizeForInvestors() {
    setAiLoading(true);
    setAiError(null);
    try {
      const response = await fetch('http://localhost:8000/generate-slide-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: slide.title,
          solution: slide.design || '',
          slide_title: slide.title,
          current_content: blocks.find(b => b.type === 'text')?.content || '',
          mode: 'optimize',
        }),
      });
      if (!response.ok) throw new Error('Failed to optimize content');
      const data = await response.json();
      setBlocks(blocks => blocks.map(b => b.type === 'text' ? { ...b, content: data.content } : b));
    } catch (error) {
      setAiError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setAiLoading(false);
    }
  }

  async function handleImproveMessaging() {
    setAiLoading(true);
    setAiError(null);
    try {
      const response = await fetch('http://localhost:8000/generate-slide-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: slide.title,
          solution: slide.design || '',
          slide_title: slide.title,
          current_content: blocks.find(b => b.type === 'text')?.content || '',
          mode: 'improve',
        }),
      });
      if (!response.ok) throw new Error('Failed to improve messaging');
      const data = await response.json();
      setBlocks(blocks => blocks.map(b => b.type === 'text' ? { ...b, content: data.content } : b));
    } catch (error) {
      setAiError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setAiLoading(false);
    }
  }

  async function handleAddDataVisualization() {
    setAiLoading(true);
    setAiError(null);
    try {
      const response = await fetch('http://localhost:8000/generate-visual-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'pie', // or let user choose
          context: blocks.find(b => b.type === 'text')?.content || '',
        }),
      });
      if (!response.ok) throw new Error('Failed to add data visualization');
      const data = await response.json();
      // Add a new visual block
      setBlocks(blocks => [...blocks, { 
        id: `visual-${Date.now()}`, 
        type: 'visual', 
        visual: { type: 'pie', data: data },
        position: { x: 50, y: 50 },
        size: { width: 500, height: 300 }
      }]);
    } catch (error) {
      setAiError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Slide</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <button onClick={handleAddText} className="bg-blue-600 text-white px-4 py-2 rounded">Add Text</button>
            <button onClick={handleAddVisual} className="bg-green-600 text-white px-4 py-2 rounded">Add Visual</button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
              className="w-full border rounded px-3 py-2"
          >
            {THEMES.map(t => (
                <option key={t.name} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>

          <div className={`border rounded-lg p-4 min-h-[400px] ${THEMES.find(t => t.name === theme)?.className}`}>
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
              onLayoutChange={newLayout => setLayout(newLayout)}
        >
          {blocks.map((block, idx) => (
                <div key={block.id} className="border rounded bg-white shadow-sm p-2">
                  <div className="flex justify-end mb-2">
                    <button onClick={() => handleRemoveBlock(block.id)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
              {block.type === 'text' ? (
                <TextBlockEditor
                  id={block.id}
                  content={block.content}
                      onChange={content => handleTextChange(idx, content)}
                />
              ) : (
                <VisualBlockEditor
                  visual={block.visual}
                      onChange={data => handleVisualDataChange(idx, data)}
                      onTypeChange={type => handleVisualTypeChange(idx, type)}
                      onRemove={() => handleRemoveBlock(block.id)}
                />
              )}
            </div>
          ))}
        </ResponsiveGridLayout>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded text-gray-600">Cancel</button>
          <button
            onClick={() => onSave({
              ...slide,
              blocks,
              theme
            })}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save Changes
          </button>
        </div>

        <div className="mb-4">
          <div className="font-semibold mb-2">AI Actions</div>
          <div className="flex flex-col gap-2">
            <button className="bg-blue-600 text-white py-2 rounded font-semibold" onClick={handleGenerateContent} disabled={aiLoading}>Generate Content</button>
            <button className="bg-green-600 text-white py-2 rounded font-semibold" onClick={handleOptimizeForInvestors} disabled={aiLoading}>Optimize for Investors</button>
            <button className="bg-purple-600 text-white py-2 rounded font-semibold" onClick={handleAddDataVisualization} disabled={aiLoading}>Add Data Visualization</button>
            <button className="bg-yellow-400 text-white py-2 rounded font-semibold" onClick={handleImproveMessaging} disabled={aiLoading}>Improve Messaging</button>
          </div>
          {aiError && <div className="text-red-600 mt-2">{aiError}</div>}
        </div>
      </div>
    </div>
  );
} 