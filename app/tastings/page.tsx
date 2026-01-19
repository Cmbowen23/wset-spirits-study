'use client';

import { useEffect, useState } from 'react';
import { Tasting } from '@/types/tasting';
import Link from 'next/link';

export default function TastingsPage() {
  const [tastings, setTastings] = useState<Tasting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('');

  useEffect(() => {
    // TODO: Fetch from Supabase
    // For now, load from localStorage
    const stored = localStorage.getItem('tastings');
    if (stored) {
      const parsed = JSON.parse(stored);
      setTastings(parsed.sort((a: Tasting, b: Tasting) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    }
    setIsLoading(false);
  }, []);

  const categories = Array.from(new Set(tastings.map((t) => t.category).filter(Boolean)));

  const filteredTastings = filterCategory
    ? tastings.filter((t) => t.category === filterCategory)
    : tastings;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tasting History
        </h1>
        <p className="text-gray-600">
          Review your past tastings and track your spirits journey.
        </p>
      </div>

      {/* Filters */}
      {categories.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterCategory('')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filterCategory === ''
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({tastings.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat as string)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat} ({tastings.filter((t) => t.category === cat).length})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tastings grid */}
      {filteredTastings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No tastings yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start your spirits journey by recording your first tasting.
          </p>
          <Link
            href="/tasting/new"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create First Tasting
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTastings.map((tasting) => (
            <Link
              key={tasting.id}
              href={`/tasting/${tasting.id}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tasting.spirit_name}
                  </h3>
                  {tasting.rating && (
                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
                      <svg
                        className="w-4 h-4 text-yellow-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-yellow-900">
                        {tasting.rating}
                      </span>
                    </div>
                  )}
                </div>

                {tasting.category && (
                  <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mb-3">
                    {tasting.category}
                  </div>
                )}

                <div className="text-sm text-gray-600 mb-3">
                  {formatDate(tasting.date)}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span>{tasting.timeline_data.length} notes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                    <span>
                      {new Set(tasting.timeline_data.map((n) => n.stage)).size}{' '}
                      stages
                    </span>
                  </div>
                </div>

                {tasting.overall_notes && (
                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                    {tasting.overall_notes}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
