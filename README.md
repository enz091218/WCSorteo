# World Cup Draw Tool

A simple, browser-based World Cup group draw tool with two synchronized pages - a broadcast overlay and a control panel.

## Features

- **Two-page system**: Overlay page for streaming/broadcast and control panel for data entry
- **Real-time synchronization**: Changes in the control panel instantly appear on the overlay
- **No backend required**: Everything runs in the browser using localStorage
- **Broadcast-ready design**: Clean, modern overlay optimized for OBS and streaming software
- **8 groups with 4 teams each**: Standard World Cup group stage format (Groups A-H)

## Pages

### overlay.html - Broadcast Overlay
This is the page you display in OBS or your streaming software:
- Fullscreen dark design with gradient background
- 4×2 grid showing all 8 groups
- Modern Poppins font with cyan accents
- No scrollbars, buttons, or inputs - just clean display
- Empty slots show "(empty)" in gray
- Updates automatically when you save changes in the control panel

### control.html - Control Panel
This is where you enter team names during the draw:
- Input fields for all 8 groups (A-H)
- 4 team slots per group
- **Save Changes** button - saves all teams and updates the overlay
- **Clear All** button - resets everything (asks for confirmation)
- Two-column layout to minimize scrolling
- Shows success messages when saving

## How to Use

1. **Open both pages in separate browser windows/tabs**:
   - `overlay.html` - Add this to OBS as a browser source or display fullscreen
   - `control.html` - Use this to enter team names during the draw

2. **During the draw**:
   - As each team is drawn, type it into the appropriate group/slot in `control.html`
   - Click "Save Changes" to update the overlay
   - The overlay updates instantly - no refresh needed

3. **Technical Details**:
   - Both pages must be from the same origin (same server/domain)
   - Data is stored in `localStorage` under the key `worldCupGroups`
   - The overlay listens for storage events and updates automatically
   - No internet connection needed after loading the pages

## Data Structure

The tool stores data in localStorage as a JSON object:

```json
{
  "A": ["Team 1", "Team 2", "Team 3", "Team 4"],
  "B": ["", "", "", ""],
  "C": ["", "", "", ""],
  "D": ["", "", "", ""],
  "E": ["", "", "", ""],
  "F": ["", "", "", ""],
  "G": ["", "", "", ""],
  "H": ["", "", "", ""]
}
```

## Files

- `overlay.html` - Broadcast overlay page
- `control.html` - Control panel page
- `script-overlay.js` - Overlay logic (reads from localStorage)
- `script-control.js` - Control panel logic (writes to localStorage)
- `README.md` - This documentation

## Browser Compatibility

Works in all modern browsers that support:
- localStorage API
- Storage events
- CSS Grid
- ES6 JavaScript

## Tips

- Open the overlay page first to initialize localStorage
- Keep both pages open during the draw
- You can edit and save changes multiple times
- Use "Clear All" to reset for a new draw
- The overlay works great as an OBS Browser Source at 1920×1080 resolution
