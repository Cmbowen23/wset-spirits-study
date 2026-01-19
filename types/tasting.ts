export type TastingStage =
  | 'appearance'
  | 'nose_initial'
  | 'nose_opened'
  | 'palate_attack'
  | 'palate_mid'
  | 'finish';

export interface FlavorNote {
  tag: string;
  stage: TastingStage;
  duration: number; // milliseconds
  timestamp: number; // when recorded
  category: string;
}

export interface Tasting {
  id: string;
  user_id: string;
  spirit_name: string;
  category?: string;
  date: string;
  overall_notes?: string;
  rating?: number;
  image_url?: string;
  timeline_data: FlavorNote[];
  created_at: string;
  updated_at: string;
}

export const TASTING_STAGES: Array<{
  id: TastingStage;
  name: string;
  color: string;
}> = [
  { id: 'appearance', name: 'Appearance', color: '#A78BFA' },
  { id: 'nose_initial', name: 'Nose (Initial)', color: '#60A5FA' },
  { id: 'nose_opened', name: 'Nose (Opened)', color: '#34D399' },
  { id: 'palate_attack', name: 'Palate (Attack)', color: '#FBBF24' },
  { id: 'palate_mid', name: 'Palate (Development)', color: '#F59E0B' },
  { id: 'finish', name: 'Finish', color: '#EF4444' },
];

export const FLAVOR_CATEGORIES: Record<string, {
  tags: string[];
  color: string;
}> = {
  fruit: {
    tags: ['citrus', 'apple', 'pear', 'stone fruit', 'tropical', 'dried fruit', 'berry'],
    color: '#EC4899',
  },
  spice: {
    tags: ['pepper', 'cinnamon', 'nutmeg', 'clove', 'ginger', 'vanilla'],
    color: '#F97316',
  },
  wood: {
    tags: ['oak', 'cedar', 'pine', 'smoke', 'char', 'toast'],
    color: '#78350F',
  },
  earth: {
    tags: ['peat', 'mineral', 'mushroom', 'leather', 'tobacco'],
    color: '#92400E',
  },
  floral: {
    tags: ['rose', 'jasmine', 'honeysuckle', 'lavender'],
    color: '#D946EF',
  },
  grain: {
    tags: ['malt', 'cereal', 'bread', 'corn'],
    color: '#EAB308',
  },
  sweet: {
    tags: ['honey', 'caramel', 'toffee', 'chocolate', 'molasses'],
    color: '#A16207',
  },
  other: {
    tags: ['salt', 'iodine', 'seaweed', 'medicinal', 'solvent'],
    color: '#64748B',
  },
};

export function getCategoryForTag(tag: string): string {
  for (const [category, data] of Object.entries(FLAVOR_CATEGORIES)) {
    if (data.tags.includes(tag)) {
      return category;
    }
  }
  return 'other';
}
