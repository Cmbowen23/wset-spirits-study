'use client';

import { useMemo } from 'react';
import { FlavorNote, FLAVOR_CATEGORIES } from '@/types/tasting';

interface FlavorWheelProps {
  notes: FlavorNote[];
}

export default function FlavorWheel({ notes }: FlavorWheelProps) {
  // Aggregate durations by category
  const categoryData = useMemo(() => {
    const aggregated: Record<string, number> = {};

    notes.forEach((note) => {
      if (!aggregated[note.category]) {
        aggregated[note.category] = 0;
      }
      aggregated[note.category] += note.duration;
    });

    const total = Object.values(aggregated).reduce((sum, val) => sum + val, 0);

    return Object.entries(aggregated)
      .map(([category, duration]) => ({
        category,
        duration,
        percentage: (duration / total) * 100,
        color: FLAVOR_CATEGORIES[category]?.color || '#64748B',
      }))
      .sort((a, b) => b.duration - a.duration);
  }, [notes]);

  const size = 400;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 40;

  if (notes.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500">No data to display</p>
      </div>
    );
  }

  // Calculate arc paths
  let currentAngle = -90; // Start at top

  const arcs = categoryData.map((data) => {
    const angleSize = (data.percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angleSize;

    currentAngle = endAngle;

    // Convert to radians
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Calculate arc path
    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const largeArcFlag = angleSize > 180 ? 1 : 0;

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ');

    // Calculate label position
    const midAngle = (startAngle + endAngle) / 2;
    const labelRadius = radius * 0.7;
    const labelX = centerX + labelRadius * Math.cos((midAngle * Math.PI) / 180);
    const labelY = centerY + labelRadius * Math.sin((midAngle * Math.PI) / 180);

    return {
      ...data,
      pathData,
      labelX,
      labelY,
      startAngle,
      endAngle,
    };
  });

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="drop-shadow-lg"
        >
          {/* Background circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 5}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="2"
          />

          {/* Arc segments */}
          {arcs.map((arc) => (
            <g key={arc.category}>
              <path
                d={arc.pathData}
                fill={arc.color}
                stroke="white"
                strokeWidth="2"
                className="transition-opacity hover:opacity-80 cursor-pointer"
              >
                <title>
                  {arc.category}: {arc.percentage.toFixed(1)}% (
                  {formatDuration(arc.duration)})
                </title>
              </path>

              {/* Label (only if segment is large enough) */}
              {arc.percentage > 8 && (
                <text
                  x={arc.labelX}
                  y={arc.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-semibold capitalize pointer-events-none"
                  fill="white"
                >
                  {arc.category}
                </text>
              )}
            </g>
          ))}

          {/* Center circle with total */}
          <circle cx={centerX} cy={centerY} r={60} fill="white" />
          <text
            x={centerX}
            y={centerY - 10}
            textAnchor="middle"
            className="text-2xl font-bold"
            fill="#1F2937"
          >
            {notes.length}
          </text>
          <text
            x={centerX}
            y={centerY + 15}
            textAnchor="middle"
            className="text-xs"
            fill="#6B7280"
          >
            Total Notes
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoryData.map((data) => (
          <div
            key={data.category}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
          >
            <div
              className="w-6 h-6 rounded flex-shrink-0 mt-0.5"
              style={{ backgroundColor: data.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 capitalize truncate">
                {data.category}
              </div>
              <div className="text-xs text-gray-600">
                {data.percentage.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500">
                {formatDuration(data.duration)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
