# Setup Guide - WSET Spirits Study Platform

## Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Open Browser**
Navigate to http://localhost:3000

## What's Working Now (Phase 1 - Week 1)

### Core Features Implemented

1. **Hold-Button Tasting Timeline** - The signature feature!
   - Press and hold flavor buttons to record intensity
   - Real-time visual feedback with progress ring
   - Haptic feedback on mobile
   - Keyboard support (spacebar to hold)

2. **Tasting Stages**
   - 6-stage tasting flow: Appearance → Nose (Initial) → Nose (Opened) → Palate (Attack) → Palate (Development) → Finish
   - Easy navigation between stages
   - Visual progress indicator

3. **Flavor Library**
   - 60+ pre-defined flavor tags organized into 8 categories:
     * Fruit (citrus, apple, berry, etc.)
     * Spice (pepper, cinnamon, vanilla, etc.)
     * Wood (oak, smoke, char, etc.)
     * Earth (peat, mineral, leather, etc.)
     * Floral (rose, jasmine, lavender, etc.)
     * Grain (malt, cereal, bread, etc.)
     * Sweet (honey, caramel, chocolate, etc.)
     * Other (salt, iodine, medicinal, etc.)
   - Color-coded by category
   - Search and filter functionality
   - Recently used tags displayed first

4. **Timeline Visualization**
   - Horizontal bar chart showing flavor intensity over time
   - Grouped by tasting stage
   - Color-coded by flavor category
   - Hover tooltips with exact durations
   - Summary statistics

5. **Flavor Wheel View**
   - Radial visualization of tasting notes
   - Aggregates flavors by category
   - Shows relative proportions
   - Interactive tooltips
   - Toggle between timeline and wheel views

6. **Tasting Management**
   - Create new tastings
   - View tasting history
   - Filter by spirit category
   - Detailed tasting view
   - Delete tastings
   - Add ratings (1-10)
   - Add overall notes

### Current Storage

- **LocalStorage** (temporary for MVP demo)
- All tastings are saved to browser localStorage
- Data persists between sessions on the same browser
- Ready for Supabase migration in Week 2

### Supported Spirit Categories

- Scotch Whisky
- Irish Whiskey
- Bourbon
- Rye Whiskey
- Japanese Whisky
- Tequila
- Mezcal
- Rum
- Gin
- Vodka
- Cognac
- Armagnac
- Brandy
- Other

## Next Phase - Week 2

### To Be Implemented

1. **Supabase Integration**
   - User authentication
   - Database for tastings
   - Profile management
   - Cloud storage

2. **Interactive Scotland Map**
   - 6 Scotch whisky regions
   - Clickable regions with information
   - Distillery pins
   - Personal coverage tracking

3. **LLM Spirit Profiles**
   - Anthropic Claude integration
   - Generate comprehensive spirit profiles
   - Smart caching system
   - WSET exam notes

4. **Personal Map Coverage**
   - Visualize tasted regions
   - Track exploration progress
   - Get suggestions for new regions

## Development Workflow

### Creating New Components

All tasting-related components go in `/components/tasting/`:

```typescript
// Example component structure
'use client';  // Required for interactive components

import { useState } from 'react';

export default function YourComponent() {
  // Component logic
}
```

### Adding New Flavor Categories

Edit `/types/tasting.ts`:

```typescript
export const FLAVOR_CATEGORIES: Record<string, {
  tags: string[];
  color: string;
}> = {
  your_category: {
    tags: ['tag1', 'tag2', 'tag3'],
    color: '#HEX_COLOR',
  },
  // ...
};
```

### Type Definitions

All tasting types are in `/types/tasting.ts`:
- `TastingStage` - The 6 stages of tasting
- `FlavorNote` - Individual flavor recording
- `Tasting` - Complete tasting session
- `TASTING_STAGES` - Stage definitions with colors
- `FLAVOR_CATEGORIES` - Flavor library

## Testing the Hold Button

1. Go to http://localhost:3000/tasting/new
2. Enter a spirit name (e.g., "Lagavulin 16")
3. Select a category (e.g., "Scotch Whisky")
4. Find a flavor button (e.g., "peat")
5. **Press and hold** the button for 1-2 seconds
6. Watch the progress ring fill up
7. Release to record
8. Check the timeline preview on the right

### Expected Behavior

- Button changes color when held
- Progress ring animates smoothly
- Duration displays in real-time
- Slight haptic feedback on mobile
- Note appears in timeline preview
- Can record same flavor multiple times

## Troubleshooting

### Development Server Won't Start

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port 3000 Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### TypeScript Errors

```bash
# Check for type errors
npx tsc --noEmit
```

### Clear Local Storage

Open browser console and run:
```javascript
localStorage.clear();
location.reload();
```

## File Structure Reference

```
SpiritStudy/
├── app/                           # Next.js App Router
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with nav
│   ├── page.tsx                  # Landing page
│   ├── tasting/
│   │   ├── new/page.tsx          # Create tasting
│   │   └── [id]/page.tsx         # View tasting
│   └── tastings/page.tsx         # History list
│
├── components/tasting/            # Tasting components
│   ├── HoldButton.tsx            # Core hold interface
│   ├── FlavorTagSelector.tsx     # Flavor picker
│   ├── StageSelector.tsx         # Stage navigation
│   ├── TimelineVisualization.tsx # Bar chart
│   └── FlavorWheel.tsx           # Radial chart
│
├── types/
│   └── tasting.ts                # TypeScript definitions
│
├── lib/                          # Future utilities
│
├── public/                       # Static assets
│
├── .env.local.example            # Environment template
├── .gitignore                    # Git ignore rules
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
├── README.md                     # Project overview
└── SETUP.md                      # This file
```

## API Keys (for Week 2)

You'll need these for full functionality:

1. **Supabase**
   - Sign up at https://supabase.com
   - Create a new project
   - Get your URL and anon key
   - Add to `.env.local`:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
     ```

2. **Anthropic (Claude)**
   - Sign up at https://anthropic.com
   - Get API key
   - Add to `.env.local`:
     ```
     ANTHROPIC_API_KEY=your_key
     ```

## Deployment (Ready for Vercel)

```bash
# Connect to GitHub
git init
git add .
git commit -m "Initial commit - Week 1 MVP complete"
git branch -M main
git remote add origin <your-github-repo>
git push -u origin main

# Deploy to Vercel
# Connect your GitHub repo at vercel.com
# Auto-deploys on push to main
```

## Performance Notes

- All components use React 19 features
- Timeline rendering optimized with memoization
- Large datasets handled efficiently
- Mobile-optimized touch events
- Smooth 60fps animations with requestAnimationFrame

## Accessibility

- Keyboard support for hold button (spacebar)
- Proper ARIA labels
- Focus management
- Color contrast compliant
- Screen reader friendly

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Questions or Issues?

Check the main README.md for project overview and architecture philosophy.
