'use client';

import { useMemo } from 'react';
import { FlavorNote, TASTING_STAGES, FLAVOR_CATEGORIES } from '@/types/tasting';

interface TimelineVisualizationProps {
  notes: FlavorNote[];
  maxDuration?: number;
}

export default function TimelineVisualization({
  notes,
  maxDuration,
}: TimelineVisualizationProps) {
  // Calculate max duration if not provided
  const calculatedMaxDuration = useMemo(() => {
    if (maxDuration) return maxDuration;
    if (notes.length === 0) return 10000;

    const max = Math.max(...notes.map((n) => n.duration));
    return Math.max(max * 1.2, 1000); // Add 20% padding, minimum 1 second
  }, [notes, maxDuration]);

  // Group notes by stage
  const notesByStage = useMemo(() => {
    const grouped: Record<string, FlavorNote[]> = {};
    TASTING_STAGES.forEach((stage) => {
      grouped[stage.id] = notes
        .filter((n) => n.stage === stage.id)
        .sort((a, b) => a.timestamp - b.timestamp);
    });
    return grouped;
  }, [notes]);

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getBarWidth = (duration: number): string => {
    return `${(duration / calculatedMaxDuration) * 100}%`;
  };

  if (notes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500">
          No flavor notes recorded yet. Hold buttons to start tracking!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timeline header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Tasting Timeline</h3>
        <div className="text-sm text-gray-600">
          Max: {formatDuration(calculatedMaxDuration)}
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="space-y-4">
        {TASTING_STAGES.map((stage) => {
          const stageNotes = notesByStage[stage.id];
          const hasNotes = stageNotes.length > 0;

          return (
            <div key={stage.id} className="space-y-2">
              {/* Stage label */}
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {stage.name}
                </span>
                <span className="text-xs text-gray-500">
                  ({stageNotes.length})
                </span>
              </div>

              {/* Timeline bars */}
              <div className="relative pl-6">
                {hasNotes ? (
                  <div className="space-y-1">
                    {stageNotes.map((note, index) => {
                      const categoryColor =
                        FLAVOR_CATEGORIES[note.category]?.color || '#64748B';

                      return (
                        <div
                          key={`${note.tag}-${note.timestamp}-${index}`}
                          className="group relative"
                        >
                          {/* Bar */}
                          <div
                            className="h-8 rounded-r-lg transition-all duration-200 hover:brightness-110 flex items-center px-3 cursor-pointer"
                            style={{
                              backgroundColor: categoryColor,
                              width: getBarWidth(note.duration),
                              minWidth: '60px',
                            }}
                          >
                            <span className="text-xs font-medium text-white truncate">
                              {note.tag}
                            </span>
                          </div>

                          {/* Tooltip on hover */}
                          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                              {note.tag}: {formatDuration(note.duration)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-8 flex items-center">
                    <span className="text-xs text-gray-400 italic">
                      No notes for this stage
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Flavor Categories
        </h4>
        <div className="flex flex-wrap gap-3">
          {Object.entries(FLAVOR_CATEGORIES).map(([category, data]) => (
            <div key={category} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: data.color }}
              />
              <span className="text-xs text-gray-600 capitalize">
                {category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{notes.length}</div>
          <div className="text-xs text-gray-600">Total Notes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {new Set(notes.map((n) => n.category)).size}
          </div>
          <div className="text-xs text-gray-600">Categories</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {formatDuration(
              notes.reduce((sum, n) => sum + n.duration, 0) / notes.length
            )}
          </div>
          <div className="text-xs text-gray-600">Avg Duration</div>
        </div>
      </div>
    </div>
  );
}
