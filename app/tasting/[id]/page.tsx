'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Tasting } from '@/types/tasting';
import TimelineVisualization from '@/components/tasting/TimelineVisualization';
import FlavorWheel from '@/components/tasting/FlavorWheel';

export default function TastingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [tasting, setTasting] = useState<Tasting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'timeline' | 'wheel'>('timeline');

  useEffect(() => {
    // TODO: Fetch from Supabase
    // For now, load from localStorage
    const stored = localStorage.getItem('tastings');
    if (stored) {
      const tastings: Tasting[] = JSON.parse(stored);
      const found = tastings.find((t) => t.id === params.id);
      setTasting(found || null);
    }
    setIsLoading(false);
  }, [params.id]);

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this tasting?')) {
      return;
    }

    // TODO: Delete from Supabase
    const stored = localStorage.getItem('tastings');
    if (stored) {
      const tastings: Tasting[] = JSON.parse(stored);
      const filtered = tastings.filter((t) => t.id !== params.id);
      localStorage.setItem('tastings', JSON.stringify(filtered));
    }

    router.push('/tastings');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!tasting) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tasting Not Found
          </h2>
          <a
            href="/tastings"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Return to History
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {tasting.spirit_name}
            </h1>
            <p className="text-gray-600">{formatDate(tasting.date)}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/tastings')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Back
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-50 font-medium"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {tasting.category && (
            <div className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
              {tasting.category}
            </div>
          )}
          {tasting.rating && (
            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded">
              <svg
                className="w-5 h-5 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-yellow-900">
                {tasting.rating}/10
              </span>
            </div>
          )}
        </div>
      </div>

      {/* View toggle */}
      <div className="mb-6">
        <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
              viewMode === 'timeline'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Timeline View
          </button>
          <button
            onClick={() => setViewMode('wheel')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
              viewMode === 'wheel'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Wheel View
          </button>
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {viewMode === 'timeline' ? (
          <TimelineVisualization notes={tasting.timeline_data} />
        ) : (
          <FlavorWheel notes={tasting.timeline_data} />
        )}
      </div>

      {/* Overall notes */}
      {tasting.overall_notes && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Overall Notes
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap">
            {tasting.overall_notes}
          </p>
        </div>
      )}
    </div>
  );
}
