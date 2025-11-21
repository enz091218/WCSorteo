# World Cup Draw Tool

## Project Overview
A browser-based World Cup group draw tool with two synchronized pages built using vanilla HTML, CSS, and JavaScript. Created on November 21, 2025.

## Purpose
- **Broadcast overlay** (`overlay.html`): Display page for OBS/streaming software showing 12 World Cup groups in real-time
- **Control panel** (`control.html`): Management interface for entering team names during the draw
- **Real-time sync**: Uses Node.js server with Socket.IO for instant updates across all connected devices

## Architecture

### Pages
1. **index.html** - Landing page with links to both overlay and control panel
2. **overlay.html** - Broadcast-ready fullscreen display (4×3 grid, Groups A-L)
3. **control.html** - Input interface with Save Changes and Clear All buttons

### Server
1. **server.js** - Node.js + Express + Socket.IO server that stores groups in memory and broadcasts updates

### Scripts
1. **script-overlay.js** - Connects to Socket.IO, receives real-time updates from server
2. **script-control.js** - Connects to Socket.IO, sends updates to server

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
  "H": ["", "", "", ""],
  "I": ["", "", "", ""],
  "J": ["", "", "", ""],
  "K": ["", "", "", ""],
  "L": ["", "", "", ""]
}
```
- Stored in server memory (no localStorage)
- 12 groups (A through L)
- 4 team slots per group

## Technology Stack
- **Backend**: Node.js + Express + Socket.IO
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Font**: Google Fonts - Poppins
- **Storage**: Server-side in-memory storage
- **Sync**: Socket.IO WebSocket connections
- **Server Port**: 5000

## Design Features
- Dark gradient background (black to dark blue)
- Cyan (#00d9ff) accents with glow effects
- Responsive grid layouts
- Glassmorphism effects with backdrop blur
- No scrollbars on overlay (broadcast-safe)
- Modern, clean typography

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

- **2025-11-21**: Added Bombo (Pot) Display Feature
  - Implemented bombo selector in control2.html with 4 pots
  - Added bombo display in overlay2.html showing 12 countries per pot with flags
  - Updated server.js to manage bombo state (default: Bombo 1)
  - Pot compositions:
    * Bombo 1: España, Argentina, Francia, Inglaterra, Brasil, Portugal, Países Bajos, Bélgica, Alemania, Estados Unidos, México, Canadá
    * Bombo 2: Croacia, Marruecos, Colombia, Uruguay, Suiza, Japón, Senegal, Irán, Corea del Sur, Ecuador, Austria, Australia
    * Bombo 3: Noruega, Panamá, Egipto, Argelia, Escocia, Paraguay, Túnez, Costa de Marfil, Uzbekistán, Catar, Arabia Saudita, Sudáfrica
    * Bombo 4: Jordania, Cabo Verde, Ghana, Curazao, Haití, Nueva Zelanda, Repechaje Europeo 1-4, Repechaje Intercontinental 1-2
  - Real-time synchronization between control panel and overlay for bombo selection
  - Bombo display updates automatically when selector changes
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
