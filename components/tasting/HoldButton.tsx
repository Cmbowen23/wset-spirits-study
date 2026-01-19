'use client';

import { useState, useRef, useEffect } from 'react';

interface HoldButtonProps {
  flavorTag: string;
  onDurationRecorded: (tag: string, duration: number) => void;
  color: string;
  disabled?: boolean;
}

export default function HoldButton({
  flavorTag,
  onDurationRecorded,
  color,
  disabled = false,
}: HoldButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const MIN_DURATION = 100; // 100ms minimum to avoid accidental taps
  const MAX_DISPLAY_DURATION = 10000; // 10 seconds for progress ring

  const startHolding = () => {
    if (disabled) return;

    setIsHolding(true);
    startTimeRef.current = performance.now();

    // Haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    // Start animation loop
    const updateDuration = () => {
      if (startTimeRef.current) {
        const elapsed = performance.now() - startTimeRef.current;
        setDuration(elapsed);
        setProgress(Math.min((elapsed / MAX_DISPLAY_DURATION) * 100, 100));
        animationFrameRef.current = requestAnimationFrame(updateDuration);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateDuration);
  };

  const stopHolding = () => {
    if (!isHolding || !startTimeRef.current) return;

    // Cancel animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const finalDuration = performance.now() - startTimeRef.current;

    // Only record if held long enough
    if (finalDuration >= MIN_DURATION) {
      onDurationRecorded(flavorTag, finalDuration);

      // Haptic feedback on success
      if ('vibrate' in navigator) {
        navigator.vibrate([10, 50, 10]);
      }
    }

    // Reset state
    setIsHolding(false);
    setDuration(0);
    setProgress(0);
    startTimeRef.current = null;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Keyboard support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' && !isHolding) {
      e.preventDefault();
      startHolding();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === ' ' && isHolding) {
      e.preventDefault();
      stopHolding();
    }
  };

  const formatDuration = (ms: number): string => {
    if (ms < 1000) {
      return `${Math.round(ms)}ms`;
    }
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <button
      type="button"
      className={`
        relative w-20 h-20 rounded-full
        font-medium text-sm
        transition-all duration-150
        select-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
        ${isHolding ? 'scale-105 shadow-lg' : 'shadow-md hover:shadow-lg'}
      `}
      style={{
        backgroundColor: isHolding ? color : `${color}20`,
        borderColor: color,
        borderWidth: 2,
        color: isHolding ? '#fff' : color,
      }}
      onMouseDown={startHolding}
      onMouseUp={stopHolding}
      onMouseLeave={stopHolding}
      onTouchStart={startHolding}
      onTouchEnd={stopHolding}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      aria-label={`Hold button for ${flavorTag}`}
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 80 80"
        style={{ pointerEvents: 'none' }}
      >
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke={color}
          strokeWidth="4"
          opacity="0.2"
        />
        {isHolding && (
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 36}`}
            strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.05s linear',
            }}
          />
        )}
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-1">
        <span className="text-xs leading-tight break-words text-center">
          {flavorTag}
        </span>
        {isHolding && (
          <span className="text-[10px] font-bold mt-1">
            {formatDuration(duration)}
          </span>
        )}
      </div>
    </button>
  );
}
