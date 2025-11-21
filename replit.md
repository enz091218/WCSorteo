# World Cup Draw Tool

## Project Overview
A browser-based World Cup group draw tool with two synchronized pages built using vanilla HTML, CSS, and JavaScript. Created on November 21, 2025.

## Purpose
- **Broadcast overlay** (`overlay.html`): Display page for OBS/streaming software showing 12 World Cup groups in real-time
- **Control panel** (`control.html`): Management interface for entering team names during the draw
- **Real-time sync**: Uses Node.js server with Socket.IO for instant updates across all connected devices

## Architecture

### Pages
1. **index.html** - Landing page with links to both old and new versions
2. **Old System (Letter-based)**:
   - **overlay.html** - Broadcast-ready fullscreen display (4×3 grid, Groups A-L)
   - **control.html** - Input interface with Save Changes and Clear All buttons
   - **script-overlay.js** - Connects to Socket.IO, receives real-time updates
   - **script-control.js** - Connects to Socket.IO, sends updates
3. **New System (Numeric)**:
   - **overlay-new.html** - Broadcast-ready fullscreen display (4×3 grid, Groups 1-12)
   - **control-new.html** - SVG-inspired design with 6×2 grid, gray background, flag placeholders, Spanish text
   - **script-overlay-new.js** - Connects to Socket.IO, receives real-time updates
   - **script-control-new.js** - Connects to Socket.IO, sends updates

### Server
1. **server.js** - Node.js + Express + Socket.IO server that stores groups in memory and broadcasts updates
   - Supports dual-system architecture: both letter-based (A-L) and numeric (1-12) simultaneously
   - Synchronizes updates between both systems using letterToNumber/numberToLetter mapping
   - Uses deep-copy arrays to prevent reference mutation issues

### Data Structure
The server maintains both letter and numeric keys simultaneously:
```json
{
  "A": ["", "", "", ""], "1": ["", "", "", ""],
  "B": ["", "", "", ""], "2": ["", "", "", ""],
  "C": ["", "", "", ""], "3": ["", "", "", ""],
  "D": ["", "", "", ""], "4": ["", "", "", ""],
  "E": ["", "", "", ""], "5": ["", "", "", ""],
  "F": ["", "", "", ""], "6": ["", "", "", ""],
  "G": ["", "", "", ""], "7": ["", "", "", ""],
  "H": ["", "", "", ""], "8": ["", "", "", ""],
  "I": ["", "", "", ""], "9": ["", "", "", ""],
  "J": ["", "", "", ""], "10": ["", "", "", ""],
  "K": ["", "", "", ""], "11": ["", "", "", ""],
  "L": ["", "", "", ""], "12": ["", "", "", ""]
}
```
- Stored in server memory (no localStorage)
- 12 groups total (A-L or 1-12 depending on system)
- 4 team slots per group
- Updates to either system automatically sync to the other

## Technology Stack
- **Backend**: Node.js + Express + Socket.IO
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Font**: Google Fonts - Poppins
- **Storage**: Server-side in-memory storage
- **Sync**: Socket.IO WebSocket connections
- **Server Port**: 5000

## Design Features

### Old System (Letter-based A-L)
- Dark gradient background (black to dark blue)
- Cyan (#00d9ff) accents with glow effects
- Responsive grid layouts (3-2-1 column responsive)
- Glassmorphism effects with backdrop blur
- No scrollbars on overlay (broadcast-safe)
- Modern, clean typography (Poppins font)
- English labels

### New System (Numeric 1-12)
- Gray background (#bfbebf) on control panel
- 6-column × 2-row grid layout (fixed, non-responsive)
- Black headers with white panel bodies
- Flag placeholders (rounded rectangles) next to each team input
- Spanish labels: "Grupo X", "GX Pais Y", "Guardar Cambios", "Limpiar Todo"
- Matches provided SVG design specification
- Same dark overlay style as old system but with numeric group names

## Workflow
- **Name**: World Cup Draw Server
- **Command**: `npm start` (runs `node server.js`)
- **Port**: 5000 (webview)

## Key Features
✅ Two-page synchronization using Socket.IO
✅ Real-time updates via WebSocket connections
✅ Cross-device support (overlay and control on different computers)
✅ Server-side state management
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

- **2025-11-21**: Migration to Socket.IO
  - Replaced localStorage with Node.js + Socket.IO server
  - Updated script-overlay.js to use Socket.IO WebSocket connections
  - Updated script-control.js to emit Socket.IO events
  - Created server.js for real-time state management
  - Installed Node.js and Socket.IO dependencies
  - Updated workflow to run Node.js server
  - Enabled cross-device synchronization (overlay on one device, control on another)
  - Maintained exact same visual design and user experience

- **2025-11-21**: Expanded to 12 groups
  - Updated from 8 groups (A-H) to 12 groups (A-L)
  - Modified overlay layout to 4×3 grid
  - Modified control panel to 3-column layout
  - Adjusted spacing and font sizes for better fit
  - All code and documentation updated for 12-group format

- **2025-11-21**: Dual-system implementation (New SVG-inspired design)
  - Created control-new.html matching SVG design specification
    - Gray background (#bfbebf), 6×2 grid layout
    - Flag placeholders with rounded rectangles
    - Spanish labels and text ("Grupo X", "Guardar Cambios", "Limpiar Todo")
    - Labels like "G1 Pais 1", "G2 Pais 2", etc.
  - Created overlay-new.html with numeric groups (1-12)
  - Updated server.js to support dual-system architecture
    - Maintains both letter (A-L) and numeric (1-12) keys
    - Synchronizes bidirectionally between systems
    - Uses deep-copy arrays to prevent reference mutation
  - Created script-control-new.js and script-overlay-new.js
  - Updated index.html to provide links to both old and new versions
  - Both systems coexist and sync in real-time
  - Old system (A-L) continues to work without breaking changes
  - All code reviewed and approved by architect

## User Preferences
- None specified yet

## Notes
- Server must be running for the application to work
- Overlay and control panel can be on different devices/computers
- Multiple overlays can connect simultaneously
- All connected clients receive real-time updates
- Compatible with all modern browsers that support WebSocket
- Optimized for OBS Browser Source at 1920×1080
- Accessible from any device using the Replit URL
