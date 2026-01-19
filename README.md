# WSET Spirits Study Platform

Interactive study platform for WSET spirits certification (Levels 1-3) featuring a unique hold-button tasting timeline, interactive regional maps, LLM-generated spirit knowledge, and comprehensive production education.

## Features

### Week 1 MVP - Tasting Timeline (COMPLETED)

- **Hold-Button Interface**: Record flavor intensity by pressing and holding buttons
- **Timeline Visualization**: See your tasting unfold in a horizontal timeline
- **Flavor Wheel View**: Toggle between timeline and radial wheel visualization
- **Stage-Based Tasting**: Track notes through 6 tasting stages (Appearance, Nose Initial/Opened, Palate Attack/Development, Finish)
- **Tasting History**: Review all your past tastings
- **Local Storage**: Tastings saved locally (Supabase integration ready)

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React** 19 with client-side interactivity

### Planned Integrations:
- **Supabase** (authentication, database, storage)
- **Anthropic API** (Claude for spirit knowledge generation)
- **Leaflet/Mapbox** (interactive maps)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional for now):
```bash
cp .env.local.example .env.local
# Edit .env.local with your API keys when ready
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx             # Root layout with navigation
│   ├── page.tsx               # Landing page
│   ├── tasting/
│   │   ├── new/page.tsx       # Create new tasting
│   │   └── [id]/page.tsx      # View tasting detail
│   └── tastings/page.tsx      # Tasting history
├── components/
│   └── tasting/
│       ├── HoldButton.tsx              # Core hold-button interface
│       ├── FlavorTagSelector.tsx       # Flavor selection UI
│       ├── StageSelector.tsx           # Tasting stage navigation
│       ├── TimelineVisualization.tsx   # Timeline chart
│       └── FlavorWheel.tsx             # Radial flavor wheel
├── types/
│   └── tasting.ts             # TypeScript types and constants
└── lib/                        # Utility functions (future)
```

## Usage

### Creating a Tasting

1. Click "New Tasting" in the navigation
2. Enter the spirit name and select a category
3. For each tasting stage:
   - Select flavor tags from the selector
   - **Press and hold** each flavor button to record intensity
   - The longer you hold, the stronger the flavor
   - See real-time feedback with progress ring
4. Toggle timeline preview to see your notes visualized
5. Add overall notes and rating (optional)
6. Save your tasting

### Viewing Tastings

- **History**: Browse all your tastings, filter by category
- **Detail View**: Click any tasting to see full timeline or wheel visualization
- Toggle between timeline and wheel views with one click

## Week 1 Deliverables - COMPLETED ✅

- [x] Hold-button tasting timeline interface
- [x] Timeline → Wheel animated visualization
- [x] Tasting history & detail views
- [x] Stage-based tasting flow
- [x] Flavor categorization and color-coding
- [x] Local storage for tastings
- [x] Responsive design

## Next Steps - Week 2

- [ ] Supabase integration (authentication, database)
- [ ] Interactive Scotland whisky map
- [ ] LLM integration for spirit profiles
- [ ] Smart caching system
- [ ] Personal tasting map showing coverage
- [ ] Distillery pins and region highlighting

## Development Notes

### Hold Button Implementation

The hold button uses `requestAnimationFrame` for smooth timing and provides:
- Visual progress ring during hold
- Haptic feedback on mobile devices
- Keyboard support (spacebar)
- Minimum 100ms duration to avoid accidental taps
- Real-time duration display

### Data Structure

Tastings are stored with this structure:

```typescript
interface FlavorNote {
  tag: string;              // e.g., "peat", "vanilla"
  stage: TastingStage;      // e.g., "nose_initial"
  duration: number;         // milliseconds held
  timestamp: number;        // when recorded
  category: string;         // e.g., "wood", "fruit"
}
```

## Contributing

This is a learning project for WSET spirits certification. Contributions welcome!

## License

MIT
