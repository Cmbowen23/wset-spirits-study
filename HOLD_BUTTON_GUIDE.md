# Hold-Button Tasting Timeline Guide

## The Signature Feature

The hold-button interface is the unique innovation of this WSET study platform. Instead of selecting checkboxes or typing notes, you **physically hold buttons** to record flavor intensity over time.

## How It Works

### Basic Mechanics

1. **Press**: Click or tap a flavor button
2. **Hold**: Keep holding as long as you taste that flavor
3. **Release**: Let go when the flavor fades
4. **Duration = Intensity**: Longer hold = stronger/longer-lasting flavor

### Visual Feedback

While holding:
- Button fills with color
- Progress ring animates around the edge
- Duration displays in real-time (0.5s, 1.2s, 2.5s, etc.)
- Slight vibration on mobile (haptic feedback)

### Recording Philosophy

**Time-based tasting**: Instead of rating flavors 1-10, you measure them in real-time:
- Quick tap (0.2s) = fleeting note
- Brief hold (0.5-1s) = present but subtle
- Medium hold (1-3s) = prominent flavor
- Long hold (3-5s) = dominant, lasting flavor
- Very long hold (5s+) = overwhelming intensity

## Why This Works for WSET Study

### Traditional Problem
WSET students often struggle with:
- "How strong is this flavor?"
- "How long does the finish last?"
- "Which flavors are most prominent?"
- Translating sensory experience to written notes

### Hold-Button Solution
- **Intuitive**: Hold longer = stronger flavor
- **Accurate**: Captures intensity naturally
- **Timed**: Records actual duration of flavors
- **Comparable**: Easy to compare across tastings
- **Visual**: See your tasting pattern instantly

## Advanced Techniques

### Multiple Recordings
- Record the same flavor multiple times
- Useful for: "Initial nose shows vanilla, then after swirling more vanilla emerges"
- Timeline shows both instances

### Stage Progression
1. **Appearance**: Quick notes (color observations are brief)
2. **Nose (Initial)**: Medium holds (first impressions)
3. **Nose (Opened)**: Varied holds (complexity emerges)
4. **Palate (Attack)**: Quick to medium (initial taste)
5. **Palate (Development)**: Longer holds (flavors evolve)
6. **Finish**: Duration = actual finish length!

### Finish Stage Pro Tip
The finish stage is where hold-button really shines:
- Hold "oak" for 8 seconds = 8-second oak finish
- Hold "peat" for 15 seconds = long peaty finish
- Your timeline shows EXACTLY how long flavors lasted

## Comparing Tastings

### Timeline Patterns Tell Stories

**Short Finish Pattern**
```
Appearance: ▪
Nose:       ▪▪▪▪▪
Palate:     ▪▪▪▪
Finish:     ▪
```
Clean, crisp spirit with brief finish

**Long, Complex Finish**
```
Appearance: ▪
Nose:       ▪▪▪▪
Palate:     ▪▪▪▪▪
Finish:     ▪▪▪▪▪▪▪▪▪▪▪▪
```
Rich, complex spirit with lingering finish

**Evolution Pattern**
```
Nose (Initial): ▪▪ fruit
Nose (Opened):  ▪▪▪▪ fruit ▪▪▪ spice ▪▪ wood
```
Spirit opens up with complexity

## Data Insights

### What You Can Learn

From your timeline data:
- **Most prominent flavors**: Longest total duration
- **Stage complexity**: Number of notes per stage
- **Finish length**: Total duration of finish stage
- **Flavor persistence**: Same flavor across multiple stages
- **Personal palate**: Your most-detected flavor categories

### Flavor Wheel View

Toggle to wheel view to see:
- **Category dominance**: Which flavor families you detect most
- **Balance**: Evenly distributed vs. concentrated
- **Personal bias**: Do you always detect fruit? Or wood?

## Study Tips

### For WSET Exams

1. **Build flavor memory**: Record many tastings
2. **Compare within category**: All Islay whiskies together
3. **Note finish length**: Practice timing finish duration
4. **Stage awareness**: Learn which stage reveals what
5. **Vocabulary building**: Use the full flavor library

### Practice Exercises

**Exercise 1: Finish Timing**
- Taste a spirit
- Hold finish flavors for their ACTUAL duration
- Compare your times across multiple sips
- Learn to accurately time finishes

**Exercise 2: Stage Comparison**
- Record nose initial vs. opened
- See visual difference in timeline
- Learn to articulate "opening up"

**Exercise 3: Category Recognition**
- Blind taste a spirit
- Record without seeing label
- Check wheel view for category distribution
- Compare to typical profile

## Technical Details

### Timing Precision
- Minimum recording: 100ms (avoids accidental taps)
- Maximum display: 10 seconds (progress ring)
- Can hold longer (no max limit)
- Recorded to millisecond precision

### Input Methods
- **Mouse**: Press and hold
- **Touch**: Tap and hold (mobile)
- **Keyboard**: Spacebar (accessibility)

### Performance
- Smooth 60fps animation
- Uses `requestAnimationFrame` for accuracy
- No lag even with many buttons
- Instant feedback

## Common Questions

**Q: Should I hold while actively tasting?**
A: Yes! Hold the button for as long as you're experiencing that flavor.

**Q: Can I record the same flavor twice?**
A: Absolutely! Especially useful for comparing nose initial vs. opened.

**Q: What if I detect a flavor in multiple stages?**
A: Record it in each stage where you taste it. The timeline will show the progression.

**Q: How long should I hold?**
A: As long as you taste it! There's no "right" duration - it's your personal experience.

**Q: Can I remove a note if I made a mistake?**
A: Yes! Each recorded note has a "Remove" button in the timeline preview.

**Q: Does holding longer affect my tasting?**
A: No - you can release at any time. The duration is just for recording intensity.

## Exporting Your Data

### Future Features (Week 3+)
- Export tastings to PDF study sheets
- Compare multiple tastings side-by-side
- Generate flavor profile reports
- Track your palate development over time
- Quiz yourself on typical profiles

## Mobile Optimization

### Touch-Friendly
- Large 80x80px buttons
- Haptic feedback confirms recording
- Smooth touch tracking
- No accidental taps (100ms minimum)

### Portrait/Landscape
- Responsive button grid
- Scrollable flavor library
- Timeline adapts to screen size

## Accessibility

### Keyboard Users
- Tab through buttons
- Spacebar to hold
- Full keyboard navigation
- Focus indicators

### Screen Readers
- Descriptive ARIA labels
- Button states announced
- Duration feedback

## The Philosophy

Traditional tasting notes are static:
- "Notes of vanilla and oak, medium finish"

Hold-button notes are dynamic:
- Vanilla: 2.3s (nose), 1.8s (palate), 0.5s (finish)
- Oak: 1.2s (nose), 3.1s (palate), 5.7s (finish)
- **Visual**: See that oak dominates the finish
- **Quantified**: 5.7-second oak finish vs. 0.5-second vanilla
- **Comparable**: Your next whisky's oak finish is 3.2s (shorter!)

This transforms subjective tasting into measurable, comparable data while remaining intuitive and natural.

---

**Start your first tasting and experience the difference!**

Visit `/tasting/new` to begin.
