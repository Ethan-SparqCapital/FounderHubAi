'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DeckInfoCard from './components/DeckInfoCard';
import AIAnalysisCard from './components/AIAnalysisCard';
import MetricsCard from './components/MetricsCard';
import UpcomingPresentationsCard from './components/UpcomingPresentationsCard';
import SlideManagement from './components/SlideManagement';
import AIGenerateModal from './components/AIGenerateModal';
import VisualBlockComponent from './components/VisualBlock';
import ManualEditModal from './components/ManualEditModal';
import { TextBlock, VisualBlockContainer, SlideBlock, Slide, VisualBlock, BaseBlock, EditorSlide } from '../../types/slide';

/* START OF AI IMPLEMENTATION */
// Define standard slide types
const STANDARD_SLIDES = [
  'The Problem',
  'Our Solution',
  'Product Demo',
  'Market Opportunity',
  'Traction',
  'Customer Love',
  'Competitive Landscape',
  'Business Model',
  'Financial Projections',
  'Go-to-Market Strategy',
  'Team',
  'Funding Ask',
  'Thank You'
] as const;

function getSampleData(type: string) {
  switch (type) {
    case 'pie':
      return [
        { name: 'Founders', value: 60 },
        { name: 'Investors', value: 20 },
        { name: 'ESOP', value: 20 },
      ];
    case 'bar':
      return [
        { name: 'Q1', value: 100 },
        { name: 'Q2', value: 300 },
        { name: 'Q3', value: 700 },
        { name: 'Q4', value: 1200 },
      ];
    case 'line':
      return [
        { name: 'Jan', value: 30 },
        { name: 'Feb', value: 45 },
        { name: 'Mar', value: 60 },
        { name: 'Apr', value: 80 },
      ];
    case 'scatter':
      return [
        { x: 10, y: 20 },
        { x: 25, y: 40 },
        { x: 40, y: 30 },
        { x: 55, y: 60 },
      ];
    case 'table':
      return {
        columns: ['Feature', 'Status', 'ETA'],
        rows: [
          ['User Onboarding', 'Complete', 'N/A'],
          ['AI Suggestions', 'In Progress', 'Q3'],
          ['Team Collaboration', 'Planned', 'Q4'],
        ],
      };
    default:
      return [];
  }
}

export default function PitchDeckBuilder() {
  // ===== STATE =====
  const [deckTitle, setDeckTitle] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);

  /* START OF OMIT - Placeholder implementation state */
  // const [showEditModal, setShowEditModal] = useState(false);
  /* END OF OMIT */

  /* START OF AI IMPLEMENTATION */
  // AI implementation state
  const [slides, setSlides] = useState<Slide[]>([]);
  const [selectedSlide, setSelectedSlide] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  /* END OF AI IMPLEMENTATION */

  // State for metrics and feedback separately
  const [metrics, setMetrics] = useState({
    score: 0,
    narrative_flow: 'Not analyzed',
    visual_design: 'Not analyzed',
    data_credibility: 'Not analyzed'
  });
  const [aiFeedback, setAiFeedback] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [slidesModified, setSlidesModified] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [lastFeedbackSlidesHash, setLastFeedbackSlidesHash] = useState('');

  // ===== EFFECTS =====
  // Load state from sessionStorage on initial render
  useEffect(() => {
    const savedSlides = sessionStorage.getItem('slides');
    const savedMetrics = sessionStorage.getItem('metrics');
    const savedAiFeedback = sessionStorage.getItem('aiFeedback');
    const savedDeckTitle = sessionStorage.getItem('deckTitle');
    const savedDeckDescription = sessionStorage.getItem('deckDescription');

    if (savedSlides) {
      const parsedSlides = JSON.parse(savedSlides);
      setSlides(parsedSlides);
      setLastFeedbackSlidesHash(generateSlidesHash(parsedSlides));
    }
    if (savedMetrics) {
      setMetrics(JSON.parse(savedMetrics));
    }
    if (savedAiFeedback) {
      setAiFeedback(savedAiFeedback);
    }
    if (savedDeckTitle) {
      setDeckTitle(savedDeckTitle);
    }
    if (savedDeckDescription) {
      setDeckDescription(savedDeckDescription);
    }
  }, []);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('slides', JSON.stringify(slides));
    sessionStorage.setItem('metrics', JSON.stringify(metrics));
    sessionStorage.setItem('aiFeedback', aiFeedback);
    sessionStorage.setItem('deckTitle', deckTitle);
    sessionStorage.setItem('deckDescription', deckDescription);
  }, [slides, metrics, aiFeedback, deckTitle, deckDescription]);

  // Add type definitions for metrics
  type NarrativeFlow = 'Really Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
  type VisualDesign = 'Amateur' | 'Basic' | 'Decent' | 'Polished' | 'Professional';
  type DataCredibility = 'Low' | 'Average' | 'High';

  // Function to generate a hash of slides content to detect changes
  const generateSlidesHash = (slidesToHash: Slide[]) => {
    return slidesToHash.map(slide => `${slide.title}:${slide.content}:${slide.design}`).join('|');
  };

  // Function to check if slides have been modified since last feedback
  const hasSlidesChanged = () => {
    const currentHash = generateSlidesHash(slides);
    return currentHash !== lastFeedbackSlidesHash;
  };

  // Consolidated function to update AI analysis and feedback
  const updateAIAnalysis = async (slidesToAnalyze: Slide[], getFeedback: boolean = false) => {
    setAnalysisLoading(true);
    try {
      const response = await fetch('http://localhost:8000/analyze-pitch-deck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          slides: slidesToAnalyze.map(s => ({ title: s.title, content: s.content || '' })),
          metricScales: {
            narrative_flow: ['Really Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'],
            visual_design: ['Amateur', 'Basic', 'Decent', 'Polished', 'Professional'],
            data_credibility: ['Low', 'Average', 'High']
          },
          getFeedback
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze pitch deck');
      }

      const data = await response.json();
      
      // Update metrics
      setMetrics({
        score: data.score || 0,
        narrative_flow: (data.narrative_flow as NarrativeFlow) || 'Not analyzed',
        visual_design: (data.visual_design as VisualDesign) || 'Not analyzed',
        data_credibility: (data.data_credibility as DataCredibility) || 'Not analyzed'
      });

      // Update feedback if requested
      if (getFeedback && data.feedback) {
        setAiFeedback(data.feedback);
        // Update the hash to mark that feedback has been generated for current slides
        setLastFeedbackSlidesHash(generateSlidesHash(slidesToAnalyze));
      }

      return data;
    } catch (error) {
      console.error('Analysis error:', error);
      setMetrics({
        score: 0,
        narrative_flow: 'Not analyzed',
        visual_design: 'Not analyzed',
        data_credibility: 'Not analyzed'
      });
      if (getFeedback) {
        setAiFeedback('Failed to generate feedback. Please try again.');
      }
      throw error;
    } finally {
      setAnalysisLoading(false);
    }
  };

  // Add a simple parser for design cues
  function parseDesign(design: string) {
    const cues = {
      bgColor: '',
      textColor: '',
      layout: '',
      visuals: [],
      headline: '',
    };
    if (!design) return cues;
    if (/blue background/i.test(design)) cues.bgColor = 'bg-blue-600';
    if (/white text/i.test(design)) cues.textColor = 'text-white';
    if (/two columns|2 columns/i.test(design)) cues.layout = 'grid grid-cols-2 gap-4';
    if (/pie chart/i.test(design)) cues.visuals.push('pie');
    if (/bar chart/i.test(design)) cues.visuals.push('bar');
    if (/bold.*headline|large font/i.test(design)) cues.headline = 'font-bold text-2xl';
    return cues;
  }

  /* START OF OMIT - Placeholder AI suggestions logic */
  // const defaultSuggestions = [
  //   { type: 'Content', text: 'Add more specific metrics to strengthen credibility' },
  //   { type: 'Content', text: 'Consider including customer testimonial quote' },
  //   { type: 'Design', text: 'Simplify the visual layout for better readability' },
  //   { type: 'Design', text: 'Add competitive differentiation callout' },
  // ];

  // async function fetchAISuggestion(type: 'Content' | 'Design'): Promise<{ type: string; text: string }> {
  //   // Simulate fetching a new suggestion of the given type
  //   if (type === 'Content') {
  //     return { type: 'Content', text: 'Add a compelling statistic to the slide' };
  //   } else {
  //     return { type: 'Design', text: 'Use a blue background with white text for emphasis' };
  //   }
  // }
  // async function fetchAISuggestions(slideIdx: number) {
  //   setAiSuggestions(defaultSuggestions);
  // }
  /* END OF OMIT */

  /* START OF AI IMPLEMENTATION */
  const [aiSuggestions, setAiSuggestions] = useState<{ type: string; text: string }[]>([]);
  async function fetchAISuggestion(type: 'Content' | 'Design', slide: Slide): Promise<{ type: string; text: string }> {
    // Call backend to get a new suggestion for the given type and slide
    const response = await fetch('http://localhost:8000/generate-suggestion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slide_title: slide.title,
        content: slide.content,
        design: slide.design,
        type,
      }),
    });
    if (!response.ok) throw new Error('Failed to fetch suggestion');
    const data = await response.json();
    return { type, text: data.suggestion };
  }
  async function fetchAISuggestions(slideIdx: number) {
    if (slideIdx >= 0 && slideIdx < slides.length) {
    const slide = slides[slideIdx];
      const suggestions = [];
      // Get content suggestion
      const contentSuggestion = await fetchAISuggestion('Content', slide);
      suggestions.push(contentSuggestion);
      // Get design suggestion
      const designSuggestion = await fetchAISuggestion('Design', slide);
      suggestions.push(designSuggestion);
      setAiSuggestions(suggestions);
    }
  }
  const handleSuggestionClick = async (suggestion: { type: string; text: string }, idx: number) => {
    let updatedSlides = [...slides];
    if (selectedSlide === null) return;
    let slide = updatedSlides[selectedSlide];
    // Detect if suggestion is for a visual
    const visualType = getVisualTypeFromSuggestion(suggestion.text);
    if (visualType) {
      // For visuals, append the suggestion to the content textbox for now (or handle as needed)
      slide.content = (slide.content || '') + '\n' + suggestion.text;
    } else if (suggestion.type === 'Content') {
      // Append suggestion to content textbox only
      slide.content = (slide.content || '') + '\n' + suggestion.text;
    } else if (suggestion.type === 'Design') {
      // Append suggestion to design textbox only
      slide.design = (slide.design || '') + '\n' + suggestion.text;
    }
    updatedSlides[selectedSlide] = { ...slide };
    setSlides(updatedSlides);
    setSlidesModified(true); // Mark slides as modified
    // Replace only the clicked suggestion with a new one of the same type
    const newSuggestion = await fetchAISuggestion(suggestion.type as 'Content' | 'Design', slide);
    setAiSuggestions(prev => prev.map((s, i) => (i === idx ? newSuggestion : s)));
  };
  /* END OF AI IMPLEMENTATION */

  // ===== HANDLERS =====
  /* START OF OMIT - Placeholder implementation handler */
  // const handleGenerateSlides = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch('http://localhost:8000/generate-slides', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         problem: deckTitle,
  //         solution: deckDescription,
  //       }),
  //     });
      
  //     if (!response.ok) {
  //       throw new Error('Failed to generate slides');
  //     }
      
  //     const data = await response.json();
  //     // For placeholder, extract problem/solution from first two slides
  //     setSlides(data.slides.map((title: string) => {
  //       if (title.startsWith('The Problem:')) {
  //         return { title: 'The Problem', content: title.replace('The Problem:', '').trim() };
  //       } else if (title.startsWith('Our Solution:')) {
  //         return { title: 'Our Solution', content: title.replace('Our Solution:', '').trim() };
  //       }
  //       return { title, content: '' };
  //     }));
  //   } catch (error) {
  //     setError(error instanceof Error ? error.message : 'An error occurred');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  /* END OF OMIT */

  /* START OF AI IMPLEMENTATION */
  // AI implementation handlers
  const handleGenerateSlides = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/generate-slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problem: deckTitle,
          solution: deckDescription,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate slides');
      }
      
      const data = await response.json();
      
      // Initialize content map for each standard slide
      const contentMap = STANDARD_SLIDES.reduce((acc, slideTitle) => {
        acc[slideTitle] = [];
        return acc;
      }, {} as Record<string, string[]>);

      // Group content by slide type
      data.slides.forEach((item: string) => {
        for (const slideTitle of STANDARD_SLIDES) {
          if (item.toLowerCase().includes(slideTitle.toLowerCase())) {
            // Remove the slide title if it exists at the start
            const content = item.replace(new RegExp(`^${slideTitle}:?\\s*`, 'i'), '').trim();
            if (content) {
              contentMap[slideTitle].push(content);
            }
            break;
          }
        }
      });

      // Create slides with editable text blocks
      const newSlides = STANDARD_SLIDES.map(slideTitle => {
        const contents = contentMap[slideTitle];
        const combinedContent = contents.join('\n\n');
        
        // Create individual text blocks for each content piece
        const blocks: SlideBlock[] = contents.map((content, index) => ({
          id: `text-${Math.random().toString(36).substr(2, 9)}`,
          type: 'text' as const,
          content: content,
          position: { x: 50, y: 50 + (index * 100) },
          size: { width: 500, height: 80 },
          isEditable: true
        }));

        return {
          title: slideTitle,
          content: combinedContent,
          design: '',
          blocks: blocks.length > 0 ? blocks : [{
            id: `text-${Math.random().toString(36).substr(2, 9)}`,
            type: 'text' as const,
            content: '',
            position: { x: 50, y: 50 },
            size: { width: 500, height: 80 },
            isEditable: true
          }]
        };
      });

      setSlides(newSlides);
      setSlidesModified(true);
      // Update analysis with feedback
      await updateAIAnalysis(newSlides, true);

      // Generate design suggestions for each slide
      for (const slide of newSlides) {
        try {
          const designResponse = await fetch('http://localhost:8000/generate-design-suggestions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              problem: deckTitle,
              solution: deckDescription,
              slide_title: slide.title,
              current_content: slide.content,
            }),
          });
          
          if (designResponse.ok) {
            const designData = await designResponse.json();
            setSlides(prevSlides => 
              prevSlides.map(s => 
                s.title === slide.title 
                  ? { ...s, design: designData.suggestions }
                  : s
              )
            );
          }
        } catch (error) {
          console.error(`Error generating design for slide ${slide.title}:`, error);
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle editing a text block
  const handleEditBlock = (slideIndex: number, blockIndex: number, newContent: string) => {
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      const slide = { ...newSlides[slideIndex] };
      const blocks = [...slide.blocks];
      const block = blocks[blockIndex];
      
      if (block.type === 'text') {
        blocks[blockIndex] = {
          ...block,
          content: newContent
        };
      }
      
      slide.blocks = blocks;
      slide.content = blocks
        .filter((b): b is TextBlock => b.type === 'text')
        .map(b => b.content)
        .join('\n\n');
      newSlides[slideIndex] = slide;
      return newSlides;
    });
  };

  const handleGenerateContent = async (slideIndex: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/generate-slide-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: deckTitle,
          solution: deckDescription,
          slide_title: slides[slideIndex]?.title,
          current_content: slides[slideIndex]?.content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate content');
      }

      const data = await response.json();
      setSlides(prevSlides => {
        const newSlides = [...prevSlides];
        newSlides[slideIndex] = {
          ...newSlides[slideIndex],
          content: data.content,
        };
        return newSlides;
      });
      setSlidesModified(true); // Mark slides as modified
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDesign = async (slideIndex: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/generate-design-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: deckTitle,
          solution: deckDescription,
          slide_title: slides[slideIndex]?.title,
          current_content: slides[slideIndex]?.content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate design');
      }

      const data = await response.json();
      setSlides(prevSlides => {
        const newSlides = [...prevSlides];
        newSlides[slideIndex] = {
          ...newSlides[slideIndex],
          design: data.suggestions,
        };
        return newSlides;
      });
      setSlidesModified(true); // Mark slides as modified
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  /* END OF AI IMPLEMENTATION */

  // Update handleAIGenerate to use the new functionality (works for both placeholder and AI implementation).
  const handleAIGenerate = async (problem: string, solution: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/generate-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem, solution }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate slides');
      }

      const data = await response.json();
      const newSlides = data.slides.map((slideContent: string, index: number) => ({
        title: STANDARD_SLIDES[index] || `Slide ${index + 1}`,
        content: slideContent,
        design: '',
        imageUrl: '',
        videoUrl: '',
        comments: [],
        blocks: [],
        visuals: []
      }));

      setSlides(newSlides);
      setDeckTitle(problem);
      setDeckDescription(solution);
      setSlidesModified(true); // Mark slides as modified
      setShowAIModal(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  /* START OF OMIT - Placeholder implementation handler */
  const handleEditSlide = (index: number) => {
    setSelectedSlide(index);
    setShowEditModal(true);
  };
  /* END OF OMIT */

  /* START OF OMIT - Placeholder local/dev-only upload logic */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || selectedSlide === null) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const updatedSlides = [...slides];
    if (file.type.startsWith('image/')) {
      updatedSlides[selectedSlide] = {
        ...updatedSlides[selectedSlide],
        imageUrl: url,
        videoUrl: undefined,
      };
    } else if (file.type.startsWith('video/')) {
      updatedSlides[selectedSlide] = {
        ...updatedSlides[selectedSlide],
        videoUrl: url,
        imageUrl: undefined,
      };
    }
    setSlides(updatedSlides);
  };
  /* END OF OMIT - Placeholder local/dev-only upload logic */

  // Add state for manual edit modal
  const [showManualEditModal, setShowManualEditModal] = useState(false);

  // Helper to export slides
  const handleExport = async (type: 'pdf' | 'ppt') => {
    setError(null);
    if (!slides || slides.length === 0) {
      setError('No slides have been generated yet.');
      return;
    }
    try {
      const endpoint = type === 'pdf' ? '/export-pdf' : '/export-ppt';
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slides: slides.map(s => ({ title: s.title, content: s.content || '' })) }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Export failed');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = type === 'pdf' ? 'pitch_deck.pdf' : 'pitch_deck.pptx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Export failed');
    }
  };

  useEffect(() => {
    fetch('http://localhost:8000/get-slides?userId=demo')
      .then(res => res.json())
      .then(data => setSlides(data.slides || []));
  }, []);

  // Update handleShowAIFeedback
  const handleShowAIFeedback = async () => {
    // Check if slides have changed since last feedback
    if (!hasSlidesChanged() && aiFeedback) {
      // If slides haven't changed and we have existing feedback, just show the modal
      setShowFeedbackModal(true);
      return;
    }

    try {
      await updateAIAnalysis(slides, true);
      setSlidesModified(false);
      setShowFeedbackModal(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  // Helper to detect chart/table suggestions
  function getVisualTypeFromSuggestion(suggestion: string): VisualBlock['type'] | null {
    if (/pie chart/i.test(suggestion)) return 'pie';
    if (/bar graph|bar chart/i.test(suggestion)) return 'bar';
    if (/line graph|line chart/i.test(suggestion)) return 'line';
    if (/scatter ?plot|scatter ?chart/i.test(suggestion)) return 'scatter';
    if (/table/i.test(suggestion)) return 'table';
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 md:p-10 space-y-6">
          {/* Top Section: Deck Info, AI Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DeckInfoCard deckTitle={deckTitle} deckDescription={deckDescription} />
            </div>
            <div>
              <AIAnalysisCard
                score={metrics.score}
                onShowFeedback={handleShowAIFeedback}
                analysisLoading={analysisLoading}
              />
            </div>
          </div>
          {/* Slide Management Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Slide Management</h2>
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => setShowAIModal(true)}
                >
                  AI Generate
                </button>
                <button
                  className="bg-gray-200 px-4 py-2 rounded text-gray-700"
                  onClick={() => handleExport('pdf')}
                >
                  Export PDF
                </button>
                <button
                  className="bg-gray-200 px-4 py-2 rounded text-gray-700"
                  onClick={() => handleExport('ppt')}
                >
                  Export PPT
                </button>
              </div>
            </div>
            <SlideManagement slides={slides} onEditSlide={handleEditSlide} />
          </div>
        </main>
      </div>
      <AIGenerateModal
        open={showAIModal}
        onClose={() => setShowAIModal(false)}
        onGenerate={handleAIGenerate}
        loading={loading}
      />
      {/* START OF AI IMPLEMENTATION - Slide Edit Modal with AI actions */}
      {showEditModal && selectedSlide !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl relative overflow-y-auto max-h-[80vh]">
            <h3 className="text-lg font-semibold mb-2">Edit Slide</h3>
            <div className="text-xs text-gray-500 mb-4">{slides[selectedSlide]?.title || ''} • Status: final</div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Slide Content</label>
              <textarea
                className="w-full border rounded px-3 py-2 min-h-[120px]"
                value={slides[selectedSlide]?.content || ''}
                onChange={e => {
                  const updatedSlides = [...slides];
                  updatedSlides[selectedSlide] = {
                    ...updatedSlides[selectedSlide],
                    content: e.target.value,
                  };
                  setSlides(updatedSlides);
                }}
                placeholder="Edit slide content here..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Design</label>
              <textarea
                className="w-full border rounded px-3 py-2 min-h-[80px]"
                value={slides[selectedSlide]?.design || ''}
                onChange={e => {
                  const updatedSlides = [...slides];
                  updatedSlides[selectedSlide] = {
                    ...updatedSlides[selectedSlide],
                    design: e.target.value,
                  };
                  setSlides(updatedSlides);
                }}
                placeholder="Describe or customize the slide design (layout, colors, visuals, etc.)"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Add Image or Video</label>
              <input
                type="file"
                accept="image/*,video/*"
                className="mb-2"
                onChange={handleFileChange}
              />
              {slides[selectedSlide]?.imageUrl && (
                <img src={slides[selectedSlide].imageUrl} alt="Preview" className="max-h-40 rounded mb-2" />
              )}
              {slides[selectedSlide]?.videoUrl && (
                <video src={slides[selectedSlide].videoUrl} controls className="max-h-40 rounded mb-2" />
              )}
              <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center py-8 cursor-pointer text-gray-400">
                <span className="text-3xl mb-2">🖼️</span>
                <span>Click to upload image or video</span>
                <span className="text-xs mt-1">PNG, JPG, MP4 up to 10MB</span>
              </div>
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-1">Preview</label>
              {(() => {
                const design = slides[selectedSlide]?.design || '';
                const cues = parseDesign(design);
                const visuals = slides[selectedSlide]?.visuals || [];
                return (
                  <div className={`rounded-lg flex flex-col items-center justify-center py-8 min-h-[120px] ${cues.bgColor} ${cues.textColor} ${cues.layout} relative`}>
                    <span className={`mb-2 ${cues.headline}`}>{slides[selectedSlide]?.title}</span>
                    {slides[selectedSlide]?.content && (
                      <div className="text-left" dangerouslySetInnerHTML={{ __html: slides[selectedSlide].content }} />
                    )}
                    {visuals.map((visual, idx) => (
                      <div key={idx} className="my-2">
                        <VisualBlockComponent
                          type={visual.type}
                          data={visual.data || getSampleData(visual.type)}
                          config={visual.config}
                        />
                      </div>
                    ))}
                    {/* Edit button at bottom right */}
                    <button
                      className="absolute bottom-2 right-2 bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 shadow"
                      onClick={() => setShowManualEditModal(true)}
                    >
                      <span role="img" aria-label="magic-wand">✨</span> Edit
                    </button>
                  </div>
                );
              })()}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Add Comment</label>
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Add a comment..."
                value={''}
                onChange={() => {}}
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between gap-2 mt-6">
              <div className="flex flex-col gap-2 w-full md:w-1/2">
                <div className="bg-blue-50 rounded-lg p-3 mb-1">
                  <div className="font-semibold text-blue-700 mb-1">AI Suggestions</div>
                  <div className="flex flex-col gap-2">
                    {aiSuggestions.map((s, i) => (
                      <button
                        key={i}
                        className="bg-blue-100 rounded p-2 text-sm text-left hover:bg-blue-200 transition flex items-center gap-2"
                        onClick={() => handleSuggestionClick(s, i)}
                      >
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${s.type === 'Content' ? 'bg-green-200 text-green-800' : 'bg-purple-200 text-purple-800'}`}>{s.type}</span>
                        <span>{s.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 flex flex-col gap-2">
                  <div className="font-semibold text-gray-700 mb-1">AI Actions</div>
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      setError(null);
                      try {
                        // Generate content
                        const contentResponse = await fetch('http://localhost:8000/generate-slide-content', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            problem: deckTitle,
                            solution: deckDescription,
                            slide_title: slides[selectedSlide]?.title,
                          }),
                        });
                        if (!contentResponse.ok) {
                          const errorData = await contentResponse.json();
                          throw new Error(errorData.detail || 'Failed to generate content');
                        }
                        const contentData = await contentResponse.json();
                        // Generate design
                        const designResponse = await fetch('http://localhost:8000/generate-design-suggestions', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            problem: deckTitle,
                            solution: deckDescription,
                            slide_title: slides[selectedSlide]?.title,
                            current_content: contentData.content,
                          }),
                        });
                        let design = '';
                        if (designResponse.ok) {
                          const designData = await designResponse.json();
                          design = designData.suggestions;
                        }
                        setSlides(prevSlides => {
                          const newSlides = [...prevSlides];
                          newSlides[selectedSlide] = {
                            ...newSlides[selectedSlide],
                            content: contentData.content,
                            design,
                          };
                          return newSlides;
                        });
                        setSlidesModified(true); // Mark slides as modified
                      } catch (error) {
                        setError(error instanceof Error ? error.message : 'An error occurred');
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    {loading ? 'Generating...' : 'Generate Content'}
                  </button>
                  <button
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      setError(null);
                      try {
                        const response = await fetch('http://localhost:8000/optimize-for-investors', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            problem: deckTitle,
                            solution: deckDescription,
                            slide_title: slides[selectedSlide]?.title,
                            content: slides[selectedSlide]?.content,
                          }),
                        });
                        if (!response.ok) {
                          const errorData = await response.json();
                          throw new Error(errorData.detail || 'Failed to optimize for investors');
                        }
                        const data = await response.json();
                        setSlides(prevSlides => {
                          const newSlides = [...prevSlides];
                          newSlides[selectedSlide] = {
                            ...newSlides[selectedSlide],
                            content: data.content,
                          };
                          return newSlides;
                        });
                        setSlidesModified(true); // Mark slides as modified
                      } catch (error) {
                        setError(error instanceof Error ? error.message : 'An error occurred');
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    {loading ? 'Optimizing...' : 'Optimize for Investors'}
                  </button>
                  <button
                    className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-60"
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      setError(null);
                      try {
                        const response = await fetch('http://localhost:8000/add-data-visualization', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            problem: deckTitle,
                            solution: deckDescription,
                            slide_title: slides[selectedSlide]?.title,
                            content: slides[selectedSlide]?.content,
                          }),
                        });
                        if (!response.ok) {
                          const errorData = await response.json();
                          throw new Error(errorData.detail || 'Failed to add data visualization');
                        }
                        const data = await response.json();
                        setSlides(prevSlides => {
                          const newSlides = [...prevSlides];
                          newSlides[selectedSlide] = {
                            ...newSlides[selectedSlide],
                            content: data.content,
                          };
                          return newSlides;
                        });
                        setSlidesModified(true); // Mark slides as modified
                      } catch (error) {
                        setError(error instanceof Error ? error.message : 'An error occurred');
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    {loading ? 'Adding...' : 'Add Data Visualization'}
                  </button>
                  <button
                    className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 disabled:opacity-60"
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      setError(null);
                      try {
                        const response = await fetch('http://localhost:8000/improve-messaging', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            problem: deckTitle,
                            solution: deckDescription,
                            slide_title: slides[selectedSlide]?.title,
                            content: slides[selectedSlide]?.content,
                          }),
                        });
                        if (!response.ok) {
                          const errorData = await response.json();
                          throw new Error(errorData.detail || 'Failed to improve messaging');
                        }
                        const data = await response.json();
                        setSlides(prevSlides => {
                          const newSlides = [...prevSlides];
                          newSlides[selectedSlide] = {
                            ...newSlides[selectedSlide],
                            content: data.content,
                          };
                          return newSlides;
                        });
                        setSlidesModified(true); // Mark slides as modified
                      } catch (error) {
                        setError(error instanceof Error ? error.message : 'An error occurred');
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    {loading ? 'Improving...' : 'Improve Messaging'}
                  </button>
                </div>
                <div className="bg-white rounded-lg p-3 flex flex-col gap-2">
                  <div className="font-semibold text-gray-700 mb-1">Templates</div>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200">B2B SaaS Template</button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200">Consumer App Template</button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200">Hardware Startup Template</button>
                </div>
              </div>
              <div className="flex flex-row md:flex-col gap-2 w-full md:w-1/2 md:items-end md:justify-end mt-4 md:mt-0">
                <button className="w-full md:w-auto bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button
                  className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={async () => {
                    if (selectedSlide === null) return;
                    const updatedSlides = [...slides];
                    // If blocks exist, extract content and visuals from blocks
                    const blocks = updatedSlides[selectedSlide].blocks;
                    let content = updatedSlides[selectedSlide].content || '';
                    let visuals = updatedSlides[selectedSlide].visuals || [];
                    if (blocks && Array.isArray(blocks)) {
                      content = '';
                      visuals = [];
                      blocks.forEach(block => {
                        if (block.type === 'text') {
                          let html = block.content || '';
                          if (html.startsWith('<p>') && html.endsWith('</p>')) {
                            const inner = html.slice(3, -4);
                            if (!inner.includes('<p>') && !inner.includes('</p>')) {
                              html = inner;
                            }
                          }
                          content += html + '\n';
                        } else if (block.type === 'visual') {
                          visuals.push(block.visual);
                        }
                      });
                      content = content.trim();
                    }
                    updatedSlides[selectedSlide] = {
                      ...updatedSlides[selectedSlide],
                      content,
                      visuals,
                    };
                    setSlides(updatedSlides);
                    setSlidesModified(true);
                    setShowEditModal(false);
                    // Persist updated slides to backend
                    await fetch('http://localhost:8000/save-slides', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        userId: 'demo', // Replace with real user/session ID if you have auth
                        slides: updatedSlides,
                      }),
                    });
                  }}
                >
                  Save Changes
                </button>
                <button className="w-full md:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded">Share</button>
              </div>
            </div>
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </div>
        </div>
      )}
      {/* END OF AI IMPLEMENTATION - Slide Edit Modal with AI actions */}
      {/* Manual Edit Modal */}
      {showManualEditModal && selectedSlide !== null && (
        <ManualEditModal
          slide={{
            ...slides[selectedSlide],
            blocks: [
              {
                id: `text-${Math.random().toString(36).substr(2, 9)}`,
                type: 'text',
                content: slides[selectedSlide].title,
                position: { x: 50, y: 50 },
                size: { width: 500, height: 80 },
                isEditable: true
              } as TextBlock,
              ...(slides[selectedSlide].content ? [{
                id: `text-${Math.random().toString(36).substr(2, 9)}`,
                type: 'text',
                content: slides[selectedSlide].content,
                position: { x: 50, y: 150 },
                size: { width: 500, height: 80 },
                isEditable: true
              } as TextBlock] : []),
              ...(slides[selectedSlide].visuals?.map((v, i) => ({
                id: `visual-${i}`,
                type: 'visual',
                visual: v,
                position: { x: 50, y: 250 + (i * 100) },
                size: { width: 500, height: 80 }
              } as VisualBlockContainer)) || [])
            ]
          } as EditorSlide}
          onClose={() => setShowManualEditModal(false)}
          onSave={async updatedSlide => {
            const updatedSlides = [...slides];
            updatedSlides[selectedSlide] = {
              ...updatedSlide,
              title: updatedSlide.blocks?.find(b => b.type === 'text')?.content || slides[selectedSlide].title,
              content: updatedSlide.blocks
                ?.filter((b): b is TextBlock => b.type === 'text')
                .slice(1) // Skip the title block
                .map(b => b.content)
                .join('\n\n') || '',
              design: updatedSlide.design || '',
              blocks: updatedSlide.blocks || [],
              visuals: updatedSlide.blocks
                ?.filter(b => b.type === 'visual')
                .map(b => (b as VisualBlockContainer).visual) || []
            } as Slide;
            setSlides(updatedSlides);
            setSlidesModified(true);
            setShowManualEditModal(false);
            
            // Persist updated slides to backend
            await fetch('http://localhost:8000/save-slides', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: 'demo',
                slides: updatedSlides,
              }),
            });

            // Update analysis with feedback
            await updateAIAnalysis(updatedSlides, true);
          }}
        />
      )}
      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">AI Feedback</h3>
            {analysisLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">Generating feedback...</span>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">Overall Score</h4>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-blue-600 mr-2">{metrics.score}</span>
                    <span className="text-gray-600">/ 100</span>
                  </div>
                </div>

                {/* Narrative Flow */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2 text-green-700">Narrative Flow</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{metrics.narrative_flow}</p>
                </div>

                {/* Visual Design */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2 text-blue-700">Visual Design</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{metrics.visual_design}</p>
                </div>

                {/* Data Credibility */}
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2 text-yellow-700">Data Credibility</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{metrics.data_credibility}</p>
                </div>

                {/* Specific Feedback and Suggestions */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2 text-purple-700">Specific Feedback & Suggestions</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{aiFeedback}</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
              disabled={analysisLoading}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 