# World Cup Draw Tool

## Project Overview
A browser-based World Cup group draw tool with two synchronized pages built using vanilla HTML, CSS, and JavaScript. Created on November 21, 2025.

## Purpose
- **Broadcast overlay** (`overlay2.html`): Display page for OBS/streaming software showing 12 World Cup groups in real-time
- **Control panel** (`control2.html`): Management interface for entering team names during the draw
- **Real-time sync**: Uses Node.js server with Socket.IO for instant updates across all connected devices

## Architecture

### Pages
1. **index.html** - Landing page with links to both overlay and control panel
2. **overlay.html** - Broadcast-ready fullscreen display (4×3 grid, Groups A-L)
3. **overlay2.html** - Enhanced broadcast overlay with bombo display and loading screen
4. **control.html** - Input interface with Save Changes and Clear All buttons
5. **control2.html** - Enhanced control panel with bombo selector and responsive design

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
  ...
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
- Mobile-responsive design for control panels

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
✅ Bombo (pot) display with 4 pots × 12 teams
✅ Loading screen with flag preloading
✅ Group highlighting in both overlay and control panel
✅ Responsive mobile design (1 column on phones, 2 columns on tablets, 6 columns on desktop)
✅ Click-to-highlight country in bombo grid (golden background, with toggle)
✅ Manual group highlighting with "Destacar/No destacado" buttons (one group at a time)
✅ Individual team deletion buttons (× button next to each team)
✅ Real-time visual feedback for team assignments and highlighting

## Design Specifications

### overlay2.html
- Loading screen: "Cargando transmisión..." with spinner and progress %
- Bombo display: 3 columns × 4 rows with flag images and country abbreviations
- Groups display: 4 columns × 3 rows (A-L)
- Flag corners: rx=0.25/ry=0.25 for bombo, rx=0.234/ry=0.234 for groups (circular, no oval)
- Country names: 14px font size, MODERNIZ font, black color

### control2.html
- **Bombo Grid Display (Top Section)**: 6-column × 2-row grid showing all 12 countries from current bombo
  - Each country shows flag (48×32px) and full name
  - Responsive: 3 columns on tablet, 2 columns on mobile
  - Auto-updates when bombo selector changes
  - Hover effects with cyan glow
- **Groups Grid**: 6-column grid (A-F top, G-L bottom) on desktop
  - Tablet (≤768px): 2-column grid with scroll
  - Mobile (≤480px): 1-column grid with scroll
- Group highlighting: Cyan border (#00d9ff) with glow when selected
- Bombo selector: 4 buttons (Bombo 1-4) with active state highlighting
- "Destacar" button: Toggle button in bottom right of each group panel
- Team deletion: Red "×" button next to each assigned team
- Team input flags: 32×20px with border radius 2px
- **Removed**: Logo and title header for more compact layout

## Recent Changes
- **2025-11-21**: Initial project creation with localStorage sync
- **2025-11-21**: Migration to Socket.IO for cross-device support
- **2025-11-21**: Expanded to 12 groups (A-L) with 4×3 grid
- **2025-11-21**: Added Bombo display with 4 pots
- **2025-11-21**: Loading screen with flag preloading system
- **2025-11-21**: Enhanced overlay2.html with bombo selector
- **2025-11-21**: Increased country name font to 14px
- **2025-11-21**: Changed "Arabia Saudita" to "A. Saudita" for brevity
- **2025-11-21**: Doubled flag border radius to ~12px for more rounded appearance
- **2025-11-21**: Redesigned control2.html:
  - Moved buttons to top (Bombo, Destacar Grupo, Próximo Grupo, Guardar, Limpiar)
  - Optimized layout to fit all 12 groups without scrolling on desktop
  - Added group highlighting with cyan glow when selected
  - Implemented responsive design for mobile/tablet/desktop
  - Condensed spacing for compact display
  - Groups fill entire screen height on desktop, scroll on mobile
- **2025-11-21**: Removed animation buttons ("Sorteando Grupos" and "Sorteando Paises")
- **2025-11-21**: Added interactive country highlighting in bombo grid:
  - Click any country flag/card in bombo grid to highlight it with golden background
  - Click again to toggle off the highlight
  - Highlight syncs across all connected devices in real-time
  - Automatically highlights country when team is selected in a group
- **2025-11-21**: Changed group highlighting system:
  - Removed automatic golden headers when teams are assigned
  - Added manual "Destacar/No destacado" button in bottom right of each group panel
  - Only one group can be highlighted at a time
  - Highlighted group shows golden header (#AA8112) in overlay
  - Button toggles between "Destacar" and "No destacado" states
  - Syncs across all devices in real-time
- **2025-11-21**: Added individual team deletion:
  - Red "×" button appears next to each assigned team
  - Click to immediately remove that team from the group
  - Updates sync automatically to all connected devices
- **2025-11-21**: Redesigned control2.html header with Bombo Grid Display:
  - Removed logo and title to maximize screen space
  - Added 6×2 grid at top showing all 12 countries from current bombo
  - Each country displays flag (48×32px) and full name
  - Grid updates automatically when bombo selector changes
  - Responsive design: 6 columns on desktop, 3 on tablet, 2 on mobile
  - Hover effects with cyan glow and subtle lift animation
- **2025-11-21**: Changed bombo selector from dropdown to button interface:
  - 4 individual buttons for Bombo 1, 2, 3, and 4
  - Active button highlighted with cyan glow (#00d9ff)
  - Improved visual feedback and easier navigation
  - Responsive button sizing for mobile/tablet/desktop

## User Preferences
- Spanish language throughout
- Modern, clean design with cyan accents
- Compact layout to maximize screen usage
- Responsive design for multiple device types

## Notes
- Server must be running for the application to work
- Overlay and control panel can be on different devices/computers
- Multiple overlays can connect simultaneously
- All connected clients receive real-time updates
- Compatible with all modern browsers that support WebSocket
- Optimized for OBS Browser Source at 1920×1080
- Mobile-friendly with responsive media queries
- Accessible from any device using the Replit URL
