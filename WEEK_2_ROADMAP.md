# Week 2 Implementation Roadmap

## Goal: Maps + LLM Integration (Days 6-10)

Transform from local demo to full-featured platform with Supabase backend, interactive Scotland map, and AI-generated spirit knowledge.

---

## Day 6-7: Interactive Scotland Map

### Setup
```bash
# Already installed: react-leaflet, leaflet
npm install -D @types/leaflet
```

### Database Schema

Create in Supabase SQL Editor:

```sql
-- Regions table
CREATE TABLE regions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'scotch_region', 'cognac_cru', etc.
  parent_region_id UUID REFERENCES regions(id),
  country TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  boundary_geojson JSONB,
  climate TEXT,
  water_source TEXT,
  typical_characteristics TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Distilleries table
CREATE TABLE distilleries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  region_id UUID REFERENCES regions(id),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  founded_year INTEGER,
  current_owner TEXT,
  still_types TEXT[],
  visitor_center_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policies
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE distilleries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view regions"
  ON regions FOR SELECT USING (true);

CREATE POLICY "Anyone can view distilleries"
  ON distilleries FOR SELECT USING (true);
```

### Component: ScotlandWhiskyMap

Create `/components/maps/ScotlandWhiskyMap.tsx`:

```typescript
'use client';

import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Region boundaries (simplified coordinates)
const REGIONS = [
  {
    name: 'Islay',
    coordinates: [[55.6, -6.5], [55.9, -6.1], [55.7, -6.0], [55.6, -6.5]],
    characteristics: ['heavily peated', 'maritime', 'medicinal'],
  },
  // ... other regions
];

export default function ScotlandWhiskyMap() {
  // Implementation
}
```

### Pages to Create

1. `/app/maps/scotland/page.tsx` - Main map view
2. `/app/maps/region/[id]/page.tsx` - Region detail
3. `/app/maps/distillery/[id]/page.tsx` - Distillery detail

---

## Day 8: LLM Integration + Caching

### Supabase Auth Setup

1. Enable Email authentication in Supabase
2. Create auth helpers:

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
```

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = () => {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
};
```

### Spirit Profiles Cache Schema

```sql
CREATE TABLE spirit_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  region_id UUID REFERENCES regions(id),
  distillery_id UUID REFERENCES distilleries(id),
  llm_generated_content JSONB NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  generated_for_wset_level INTEGER,
  scan_count INTEGER DEFAULT 1,
  UNIQUE(name, category)
);

CREATE INDEX idx_spirit_profiles_name ON spirit_profiles(name);
CREATE INDEX idx_spirit_profiles_category ON spirit_profiles(category);

ALTER TABLE spirit_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view spirit profiles"
  ON spirit_profiles FOR SELECT USING (true);
```

### Anthropic API Integration

Create `/lib/anthropic.ts`:

```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateSpiritProfile(params: {
  name: string;
  category: string;
  userLevel: number;
}) {
  const prompt = `Generate a comprehensive WSET Level ${params.userLevel} study guide for ${params.name} (${params.category}).

Include:
1. Distillery/Producer Background
2. Production Methods
3. Typical Flavor Profile
4. WSET Exam Key Facts
5. Price Range & Availability

Return as valid JSON.`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  // Parse and return JSON
}
```

### API Route: Spirit Profile

Create `/app/api/spirits/profile/route.ts`:

```typescript
import { createClient } from '@/lib/supabase/server';
import { generateSpiritProfile } from '@/lib/anthropic';

export async function POST(request: Request) {
  const { name, category, userLevel } = await request.json();
  const supabase = createClient();

  // Check cache first
  const { data: existing } = await supabase
    .from('spirit_profiles')
    .select('*')
    .eq('name', name)
    .eq('category', category)
    .single();

  if (existing) {
    // Update scan count
    await supabase
      .from('spirit_profiles')
      .update({ scan_count: existing.scan_count + 1 })
      .eq('id', existing.id);

    return Response.json(existing);
  }

  // Generate with LLM
  const profile = await generateSpiritProfile({ name, category, userLevel });

  // Save to cache
  const { data: saved } = await supabase
    .from('spirit_profiles')
    .insert({
      name,
      category,
      llm_generated_content: profile,
      generated_for_wset_level: userLevel,
    })
    .select()
    .single();

  return Response.json(saved);
}
```

---

## Day 9: Migrate Tastings to Supabase

### Update Tastings Schema

```sql
-- Already created in original plan
-- Add RLS policies for authenticated users

CREATE POLICY "Users can view their own tastings"
  ON tastings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tastings"
  ON tastings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tastings"
  ON tastings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tastings"
  ON tastings FOR DELETE
  USING (auth.uid() = user_id);
```

### Update Components

Replace localStorage calls with Supabase:

```typescript
// Before (localStorage)
const tastings = JSON.parse(localStorage.getItem('tastings') || '[]');

// After (Supabase)
const supabase = createClient();
const { data: tastings } = await supabase
  .from('tastings')
  .select('*')
  .order('date', { ascending: false });
```

### Migration Utility

Create `/lib/migrate-local-storage.ts`:

```typescript
export async function migrateLocalStorageToSupabase() {
  const stored = localStorage.getItem('tastings');
  if (!stored) return;

  const tastings = JSON.parse(stored);
  const supabase = createClient();

  for (const tasting of tastings) {
    await supabase.from('tastings').insert({
      spirit_name: tasting.spirit_name,
      category: tasting.category,
      date: tasting.date,
      overall_notes: tasting.overall_notes,
      rating: tasting.rating,
      timeline_data: tasting.timeline_data,
    });
  }

  localStorage.removeItem('tastings');
}
```

---

## Day 10: Personal Tasting Map

### Component: PersonalCoverageMap

Create `/components/maps/PersonalCoverageMap.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface RegionCoverage {
  region_id: string;
  region_name: string;
  tasting_count: number;
  first_tasting: string;
  last_tasting: string;
}

export default function PersonalCoverageMap() {
  const [coverage, setCoverage] = useState<RegionCoverage[]>([]);

  useEffect(() => {
    loadCoverage();
  }, []);

  async function loadCoverage() {
    const supabase = createClient();

    // Query user's tastings grouped by region
    const { data } = await supabase.rpc('get_user_region_coverage');

    setCoverage(data || []);
  }

  // Render map with color-coded regions
}
```

### Database Function

```sql
CREATE OR REPLACE FUNCTION get_user_region_coverage()
RETURNS TABLE (
  region_id UUID,
  region_name TEXT,
  tasting_count BIGINT,
  first_tasting TIMESTAMPTZ,
  last_tasting TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.name,
    COUNT(t.id),
    MIN(t.date),
    MAX(t.date)
  FROM regions r
  LEFT JOIN spirit_profiles sp ON sp.region_id = r.id
  LEFT JOIN tastings t ON t.spirit_name = sp.name AND t.user_id = auth.uid()
  WHERE r.category = 'scotch_region'
  GROUP BY r.id, r.name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Page: Personal Map

Create `/app/maps/my-coverage/page.tsx`:

Shows user's tasting coverage with:
- Color intensity based on tasting count
- Stats: X of 6 regions tasted
- Suggestions: "Try a Campbeltown whisky!"
- Timeline of regional exploration

---

## Environment Variables

Update `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Anthropic
ANTHROPIC_API_KEY=your_api_key

# Optional: Mapbox (if using Mapbox instead of Leaflet)
NEXT_PUBLIC_MAPBOX_TOKEN=your_token
```

---

## Testing Checklist

### Day 6-7: Maps
- [ ] Scotland map renders correctly
- [ ] Can click regions and see info
- [ ] Distillery pins appear
- [ ] Region boundaries are accurate
- [ ] Mobile responsive

### Day 8: LLM
- [ ] Can request spirit profile
- [ ] LLM generates valid JSON
- [ ] Profile saves to cache
- [ ] Cache hit increments scan_count
- [ ] Profile displays correctly

### Day 9: Database
- [ ] User can sign up/login
- [ ] Tastings save to Supabase
- [ ] Only user's tastings visible
- [ ] RLS prevents unauthorized access
- [ ] Migration from localStorage works

### Day 10: Coverage
- [ ] Personal map shows user's regions
- [ ] Color intensity reflects tasting count
- [ ] Stats calculate correctly
- [ ] Suggestions are relevant
- [ ] Updates in real-time after new tasting

---

## Week 2 Deliverable Acceptance Criteria

- [x] Week 1 complete (hold-button timeline)
- [ ] Scotland map with 6 regions
- [ ] 10+ distilleries plotted
- [ ] LLM generates spirit profiles
- [ ] Profiles cached in database
- [ ] Tastings stored in Supabase
- [ ] User authentication working
- [ ] Personal coverage map functional
- [ ] All data secure with RLS
- [ ] Mobile optimized

---

## Common Issues & Solutions

### Leaflet CSS Not Loading
```typescript
// Add to layout.tsx
import 'leaflet/dist/leaflet.css';
```

### Marker Icons Not Showing
```typescript
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
```

### Supabase Auth Redirect Issues
```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  // Handle auth redirect
}
```

### LLM Rate Limiting
- Implement exponential backoff
- Cache aggressively
- Show loading states
- Queue requests if needed

---

## Performance Optimizations

### Map Loading
- Lazy load map component
- Use dynamic imports
- Minimize GeoJSON complexity

### LLM Caching
- Check cache before every request
- Update scan_count async
- Implement stale-while-revalidate

### Database Queries
- Use indexes on foreign keys
- Limit SELECT fields
- Paginate large result sets

---

## Next: Week 3+

After Week 2:
- Expand maps (Kentucky, Jalisco, etc.)
- Still diagrams (pot, column)
- Flashcard system
- Quiz generation
- Production flowcharts
- OCR label scanning

But first: Complete Week 2! 🥃

---

## Resources

- Supabase Docs: https://supabase.com/docs
- Anthropic API: https://docs.anthropic.com
- Leaflet Docs: https://leafletjs.com/reference.html
- GeoJSON.io: http://geojson.io (draw regions)
- Natural Earth Data: https://www.naturalearthdata.com (map data)
