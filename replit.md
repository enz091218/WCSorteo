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
✅ Country highlighting with golden background in bombo
✅ "Sorteando Paises" button for animated country selection
✅ Auto-stop country animation when team is selected

## Design Specifications

### overlay2.html
- Loading screen: "Cargando transmisión..." with spinner and progress %
- Bombo display: 3 columns × 4 rows with flag images and country abbreviations
- Groups display: 4 columns × 3 rows (A-L)
- Flag corners: rx=0.25/ry=0.25 for bombo, rx=0.234/ry=0.234 for groups (circular, no oval)
- Country names: 14px font size, MODERNIZ font, black color

### control2.html
- Desktop (>768px): 6-column grid (A-F top, G-L bottom)
- Tablet (≤768px): 2-column grid with scroll
- Mobile (≤480px): 1-column grid with scroll
- Group highlighting: Cyan border (#00d9ff) with glow when selected
- Bombo selector: Dropdown with Bombo 1-4 options
- "Destacar Grupo": Dropdown to highlight specific groups
- "Próximo Grupo": Button to cycle through groups A-L
- Flags: 32×20px with border radius 2px

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
- **2025-11-21**: Added "Sorteando Grupos" button with animated sequential group highlighting:
  - Animation cycles through groups A-L every 450ms (70% faster than initial 1.5s)
  - Continues from current group position instead of restarting from Group A
  - Stops automatically when user manually selects a different group
- **2025-11-21**: Enhanced group selection with sequential animation:
  - When selecting a group from dropdown, animates sequentially through groups to reach target
  - Example: If on Group J and selecting Group A, animates J → K → L → A
  - Maintains smooth transition without skipping groups
  - Uses same 450ms interval for consistent animation speed
- **2025-11-21**: Added "Sorteando Paises" button with country highlighting animation:
  - Golden background highlight cycles through all 12 countries in the bombo every 450ms
  - Synchronized across all connected devices via Socket.IO
  - Animation automatically stops when any team is selected in any group
  - Highlight remains on the last selected country after stopping
  - Button changes appearance while animating (opacity reduced, text "Deteniendo...")
  - Smart country highlighting: When team selected, highlights that country in bombo (if present in current bombo)
  - If selected team not in current bombo display, no country is highlighted
  - Fixed typo: countrySortingInterval (previously countryGortingInterval)
  - Fixed team name consistency: "República de Corea" used throughout both control2.html and overlay2.html

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
