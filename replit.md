# World Cup Draw Tool

## Project Overview
A browser-based World Cup group draw tool with two synchronized pages built using vanilla HTML, CSS, and JavaScript. Created on November 21, 2025.

## Purpose
- **Broadcast overlay** (`overlay.html`): Display page for OBS/streaming software showing 8 World Cup groups in real-time
- **Control panel** (`control.html`): Management interface for entering team names during the draw
- **Real-time sync**: Uses localStorage and storage events for instant updates between pages

## Architecture

### Pages
1. **index.html** - Landing page with links to both overlay and control panel
2. **overlay.html** - Broadcast-ready fullscreen display (4×2 grid, Groups A-H)
3. **control.html** - Input interface with Save Changes and Clear All buttons

### Scripts
1. **script-overlay.js** - Reads from localStorage, listens for storage events
2. **script-control.js** - Writes to localStorage, manages user input

### Data Structure
```json
{
  "A": ["", "", "", ""],
  "B": ["", "", "", ""],
  "C": ["", "", "", ""],
  "D": ["", "", "", ""],
  "E": ["", "", "", ""],
  "F": ["", "", "", ""],
  "G": ["", "", "", ""],
  "H": ["", "", "", ""]
}
```
- Stored in localStorage under key: `worldCupGroups`
- 8 groups (A through H)
- 4 team slots per group

## Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Font**: Google Fonts - Poppins
- **Storage**: Browser localStorage API
- **Sync**: Window storage events
- **Server**: Python http.server (port 5000)

## Design Features
- Dark gradient background (black to dark blue)
- Cyan (#00d9ff) accents with glow effects
- Responsive grid layouts
- Glassmorphism effects with backdrop blur
- No scrollbars on overlay (broadcast-safe)
- Modern, clean typography

## Workflow
- **Name**: World Cup Draw Server
- **Command**: `python -m http.server 5000 --bind 0.0.0.0`
- **Port**: 5000 (webview)

## Key Features
✅ Two-page synchronization using localStorage
✅ Real-time updates via storage events
✅ Broadcast-ready overlay design
✅ User-friendly control panel
✅ Clear All with confirmation
✅ Success/error status messages
✅ Well-commented code
✅ Comprehensive documentation

## Usage
1. Open both `overlay.html` and `control.html` in separate browser windows
2. Enter team names in control panel
3. Click "Save Changes" to update overlay in real-time
4. Overlay updates automatically without page refresh

## Recent Changes
- **2025-11-21**: Initial project creation
  - Created overlay.html with 4×2 group grid
  - Created control.html with input forms
  - Implemented localStorage synchronization
  - Added comprehensive README documentation
  - Created index.html landing page
  - Set up Python HTTP server workflow
  - All code reviewed and approved by architect

## User Preferences
- None specified yet

## Notes
- Both pages must be served from the same origin for localStorage to work
- Works offline after initial page load
- Compatible with all modern browsers
- Optimized for OBS Browser Source at 1920×1080
