# Quick Start Guide

Get the WSET Spirits Study Platform running in under 2 minutes!

## Step 1: Install Dependencies (30 seconds)

```bash
npm install
```

## Step 2: Start the Server (10 seconds)

```bash
npm run dev
```

Wait for:
```
✓ Ready in X.Xs
○ Local:        http://localhost:3000
```

## Step 3: Open Your Browser (5 seconds)

Navigate to: **http://localhost:3000**

## Step 4: Try the Hold-Button Interface!

### Create Your First Tasting

1. Click **"New Tasting"** in the navigation
2. Enter a spirit name: `Lagavulin 16`
3. Select category: `Scotch Whisky`
4. You'll see the first stage: **Appearance**

### Record Your First Flavor

1. Find the flavor button: **"peat"** (in the Earth category)
2. **Press and hold** the button for 2-3 seconds
3. Watch the progress ring fill up!
4. Release when done
5. See your note appear in the timeline preview on the right

### Try Multiple Flavors

1. Hold **"smoke"** for 1 second
2. Hold **"iodine"** for 2 seconds
3. Hold **"oak"** for 1.5 seconds
4. See all notes in your timeline!

### Progress Through Stages

1. Click **"Next Stage"** to go to Nose (Initial)
2. Hold **"vanilla"** for 1 second
3. Hold **"caramel"** for 2 seconds
4. Continue through all 6 stages

### View Your Timeline

1. Click **"Show Timeline"** in the preview panel
2. See your tasting visualized as horizontal bars
3. Each stage shows your recorded flavors
4. Colors represent flavor categories

### Save Your Tasting

1. Scroll down and add a rating (1-10)
2. Add overall notes (optional)
3. Click **"Save Tasting"**
4. You'll be redirected to your tasting history

### View as a Wheel

1. Click any tasting in your history
2. See the timeline view
3. Click **"Wheel View"** to toggle
4. See your flavors as a radial chart!

## That's It!

You've experienced the core innovation: **hold-button tasting timeline**.

## What to Try Next

### Explore the Flavor Library

- Search for specific flavors
- Filter by category (Fruit, Spice, Wood, etc.)
- Notice recently used flavors appear at the top

### Compare Tastings

- Create multiple tastings
- Compare timeline patterns
- See which spirits have longer finishes
- Identify your most-detected flavor categories

### Advanced: Finish Timing

The hold-button really shines for **finish**:

1. Take a sip of your spirit
2. Advance to the "Finish" stage
3. As soon as you taste oak: press and hold "oak"
4. Keep holding for the entire duration you taste it
5. Release when the flavor fades
6. Your timeline shows the EXACT finish duration!

## Keyboard Shortcut

Press **Spacebar** to hold any focused button (accessibility feature).

## Mobile Tip

On mobile devices, you'll feel a slight vibration when you press and release buttons.

## Next Steps

Ready for Week 2 features?

1. Set up Supabase for cloud storage
2. Add Anthropic API for spirit profiles
3. Explore interactive maps

See **WEEK_2_ROADMAP.md** for details.

## Troubleshooting

**Server won't start?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Port 3000 in use?**
```bash
# Kill whatever's using it
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

**Want to clear all tastings?**

Open browser console:
```javascript
localStorage.clear();
location.reload();
```

## Learn More

- **README.md** - Full project overview
- **SETUP.md** - Detailed setup guide
- **HOLD_BUTTON_GUIDE.md** - Deep dive into the signature feature
- **PROJECT_STATUS.md** - Current implementation status

## Questions?

The hold-button interface is intentionally simple:
1. Hold = Record
2. Longer hold = Stronger/longer flavor
3. Release = Done

That's the whole concept! Now you can quantify your tasting experience.

---

**Have fun exploring spirits with the hold-button timeline!** 🥃
