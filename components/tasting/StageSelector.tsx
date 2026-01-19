'use client';

import { TASTING_STAGES, TastingStage } from '@/types/tasting';

interface StageSelectorProps {
  currentStage: TastingStage;
  onStageChange: (stage: TastingStage) => void;
  disabled?: boolean;
}

export default function StageSelector({
  currentStage,
  onStageChange,
  disabled = false,
}: StageSelectorProps) {
  const currentIndex = TASTING_STAGES.findIndex((s) => s.id === currentStage);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onStageChange(TASTING_STAGES[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < TASTING_STAGES.length - 1) {
      onStageChange(TASTING_STAGES[currentIndex + 1].id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Progress indicator */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Stage {currentIndex + 1} of {TASTING_STAGES.length}
        </span>
        <div className="flex gap-1">
          {TASTING_STAGES.map((stage, index) => (
            <div
              key={stage.id}
              className="w-8 h-1 rounded-full transition-colors"
              style={{
                backgroundColor:
                  index <= currentIndex ? stage.color : '#E5E7EB',
              }}
            />
          ))}
        </div>
      </div>

      {/* Stage tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {TASTING_STAGES.map((stage) => {
          const isActive = stage.id === currentStage;
          return (
            <button
              key={stage.id}
              onClick={() => onStageChange(stage.id)}
              disabled={disabled}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap
                transition-all duration-200
                ${
                  isActive
                    ? 'text-white shadow-md transform scale-105'
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              style={{
                backgroundColor: isActive ? stage.color : undefined,
              }}
            >
              {stage.name}
            </button>
          );
        })}
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        <button
          onClick={handlePrevious}
          disabled={disabled || currentIndex === 0}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous Stage
        </button>
        <button
          onClick={handleNext}
          disabled={disabled || currentIndex === TASTING_STAGES.length - 1}
          className="flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor:
              currentIndex === TASTING_STAGES.length - 1
                ? '#9CA3AF'
                : TASTING_STAGES[currentIndex + 1].color,
          }}
        >
          Next Stage
        </button>
      </div>

      {/* Current stage description */}
      <div
        className="p-4 rounded-lg border-l-4"
        style={{
          borderColor: TASTING_STAGES[currentIndex].color,
          backgroundColor: `${TASTING_STAGES[currentIndex].color}10`,
        }}
      >
        <h3
          className="font-semibold mb-1"
          style={{ color: TASTING_STAGES[currentIndex].color }}
        >
          {TASTING_STAGES[currentIndex].name}
        </h3>
        <p className="text-sm text-gray-600">
          {getStageDescription(currentStage)}
        </p>
      </div>
    </div>
  );
}

function getStageDescription(stage: TastingStage): string {
  const descriptions: Record<TastingStage, string> = {
    appearance:
      'Observe the color, clarity, and viscosity of the spirit. Note any visual characteristics.',
    nose_initial:
      'Take your first impressions before swirling. What aromas do you detect immediately?',
    nose_opened:
      'After swirling or adding a few drops of water, what new aromas emerge?',
    palate_attack:
      'The initial taste. Note the first flavors and sensations when the spirit hits your palate.',
    palate_mid:
      'As the spirit develops in your mouth, what flavors come through? Note the body and texture.',
    finish:
      'After swallowing, what flavors linger? How long does the finish last?',
  };

  return descriptions[stage];
}
