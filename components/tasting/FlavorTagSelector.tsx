'use client';

import { useState, useMemo } from 'react';
import { FLAVOR_CATEGORIES } from '@/types/tasting';
import HoldButton from './HoldButton';

interface FlavorTagSelectorProps {
  onDurationRecorded: (tag: string, duration: number, category: string) => void;
  recentTags?: string[];
  disabled?: boolean;
}

export default function FlavorTagSelector({
  onDurationRecorded,
  recentTags = [],
  disabled = false,
}: FlavorTagSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Flatten all tags for search
  const allTags = useMemo(() => {
    const tags: Array<{ tag: string; category: string }> = [];
    Object.entries(FLAVOR_CATEGORIES).forEach(([category, data]) => {
      data.tags.forEach((tag) => {
        tags.push({ tag, category });
      });
    });
    return tags;
  }, []);

  // Filter tags based on search and category
  const filteredTags = useMemo(() => {
    let filtered = allTags;

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    return filtered;
  }, [allTags, searchQuery, selectedCategory]);

  // Get unique recent tags (limit to 6)
  const uniqueRecentTags = useMemo(() => {
    return [...new Set(recentTags)].slice(0, 6);
  }, [recentTags]);

  const handleDurationRecorded = (tag: string, duration: number) => {
    const tagData = allTags.find((t) => t.tag === tag);
    if (tagData) {
      onDurationRecorded(tag, duration, tagData.category);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div>
        <input
          type="text"
          placeholder="Search flavors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={disabled}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          disabled={disabled}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-gray-800 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        {Object.entries(FLAVOR_CATEGORIES).map(([category, data]) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            disabled={disabled}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize`}
            style={{
              backgroundColor:
                selectedCategory === category ? data.color : `${data.color}30`,
              color: selectedCategory === category ? '#fff' : data.color,
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Recent tags */}
      {uniqueRecentTags.length > 0 && !searchQuery && !selectedCategory && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Recently Used</h3>
          <div className="flex flex-wrap gap-3">
            {uniqueRecentTags.map((tag) => {
              const tagData = allTags.find((t) => t.tag === tag);
              const color = tagData
                ? FLAVOR_CATEGORIES[tagData.category].color
                : '#64748B';
              return (
                <HoldButton
                  key={tag}
                  flavorTag={tag}
                  onDurationRecorded={handleDurationRecorded}
                  color={color}
                  disabled={disabled}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* All tags */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          {searchQuery || selectedCategory ? 'Filtered Flavors' : 'All Flavors'}
        </h3>
        <div className="flex flex-wrap gap-3">
          {filteredTags.length > 0 ? (
            filteredTags.map(({ tag, category }) => (
              <HoldButton
                key={tag}
                flavorTag={tag}
                onDurationRecorded={handleDurationRecorded}
                color={FLAVOR_CATEGORIES[category].color}
                disabled={disabled}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">
              No flavors found. Try a different search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
