'use client';

import { useState } from 'react';
import { FlavorNote, TastingStage, getCategoryForTag } from '@/types/tasting';
import StageSelector from '@/components/tasting/StageSelector';
import FlavorTagSelector from '@/components/tasting/FlavorTagSelector';
import TimelineVisualization from '@/components/tasting/TimelineVisualization';

const SPIRIT_CATEGORIES = [
  'Scotch Whisky',
  'Irish Whiskey',
  'Bourbon',
  'Rye Whiskey',
  'Japanese Whisky',
  'Tequila',
  'Mezcal',
  'Rum',
  'Gin',
  'Vodka',
  'Cognac',
  'Armagnac',
  'Brandy',
  'Other',
];

export default function NewTastingPage() {
  const [spiritName, setSpiritName] = useState('');
  const [category, setCategory] = useState('');
  const [currentStage, setCurrentStage] = useState<TastingStage>('appearance');
  const [notes, setNotes] = useState<FlavorNote[]>([]);
  const [overallNotes, setOverallNotes] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  // Track recently used tags for this session
  const recentTags = notes.map((n) => n.tag);

  const handleDurationRecorded = (
    tag: string,
    duration: number,
    flavorCategory: string
  ) => {
    const newNote: FlavorNote = {
      tag,
      stage: currentStage,
      duration,
      timestamp: Date.now(),
      category: flavorCategory,
    };

    setNotes((prev) => [...prev, newNote]);

    // Show brief success feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 50, 10]);
    }
  };

  const handleRemoveNote = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!spiritName.trim()) {
      alert('Please enter a spirit name');
      return;
    }

    if (notes.length === 0) {
      alert('Please record at least one flavor note');
      return;
    }

    setIsSaving(true);

    // TODO: Save to Supabase
    // For now, just save to localStorage for demo
    const tasting = {
      id: Date.now().toString(),
      spirit_name: spiritName,
      category,
      date: new Date().toISOString(),
      overall_notes: overallNotes,
      rating,
      timeline_data: notes,
      created_at: new Date().toISOString(),
    };

    const existingTastings = JSON.parse(
      localStorage.getItem('tastings') || '[]'
    );
    localStorage.setItem(
      'tastings',
      JSON.stringify([...existingTastings, tasting])
    );

    alert('Tasting saved successfully!');
    window.location.href = '/tastings';
  };

  const canSave = spiritName.trim() && notes.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          New Tasting Session
        </h1>
        <p className="text-gray-600">
          Record your tasting notes using the hold-button interface. Press and
          hold each flavor to indicate its intensity.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left column - Input */}
        <div className="space-y-6">
          {/* Spirit info */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Spirit Information
            </h2>

            <div>
              <label
                htmlFor="spiritName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Spirit Name *
              </label>
              <input
                type="text"
                id="spiritName"
                value={spiritName}
                onChange={(e) => setSpiritName(e.target.value)}
                placeholder="e.g., Lagavulin 16"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select category...</option>
                {SPIRIT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating (optional)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      rating === num
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stage selector */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Tasting Stage
            </h2>
            <StageSelector
              currentStage={currentStage}
              onStageChange={setCurrentStage}
            />
          </div>

          {/* Flavor selector */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Flavor Notes
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Press and hold each flavor button to record its intensity. The
              longer you hold, the stronger the flavor.
            </p>
            <FlavorTagSelector
              onDurationRecorded={handleDurationRecorded}
              recentTags={recentTags}
            />
          </div>
        </div>

        {/* Right column - Timeline preview */}
        <div className="space-y-6">
          {/* Current notes summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Timeline Preview
              </h2>
              <button
                onClick={() => setShowTimeline(!showTimeline)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {showTimeline ? 'Hide' : 'Show'} Timeline
              </button>
            </div>

            {notes.length > 0 && (
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">
                  Recorded notes ({notes.length}):
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {notes.slice(-10).map((note, index) => (
                    <div
                      key={`${note.tag}-${note.timestamp}`}
                      className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded"
                    >
                      <span>
                        <span className="font-medium">{note.tag}</span>
                        <span className="text-gray-500 mx-2">·</span>
                        <span className="text-gray-600">
                          {(note.duration / 1000).toFixed(1)}s
                        </span>
                      </span>
                      <button
                        onClick={() => handleRemoveNote(notes.length - 10 + index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showTimeline && <TimelineVisualization notes={notes} />}
          </div>

          {/* Overall notes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Overall Notes
            </h2>
            <textarea
              value={overallNotes}
              onChange={(e) => setOverallNotes(e.target.value)}
              placeholder="Add any additional observations or thoughts about this spirit..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={!canSave || isSaving}
            className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            {isSaving ? 'Saving...' : 'Save Tasting'}
          </button>
        </div>
      </div>
    </div>
  );
}
