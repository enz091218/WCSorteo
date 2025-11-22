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
- **Fonts**: 
  - Control Panel: Google Fonts - Poppins
  - Overlay: Moderniz.otf (custom font from /fuente folder)
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
✅ Visual indication of assigned countries in bombo (grayscale flags and gray text)
✅ Drag-and-drop team assignment from bombo grid to group slots (in addition to modal selection)

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
  - **Drag-and-drop**: Unassigned countries are draggable to group slots
  - Visual feedback: Dragging country becomes semi-transparent, drop zones highlight with cyan border
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
- **2025-11-22**: Implemented drag-and-drop team assignment in control panel:
  - Countries in bombo grid (unassigned only) are now draggable
  - Group input slots are drop zones with visual feedback
  - Dragging shows semi-transparent country card (grab cursor)
  - Drop zones highlight with cyan dashed border and glow when hovering
  - Dropping assigns team to group and triggers all existing sync/highlight logic
  - Modal selection system remains fully functional as alternative method
  - Assigned countries cannot be dragged (grayscale, cursor: not-allowed)
  - Duplicate validation: Cannot assign same team to multiple groups
  - Overwrite confirmation: Asks user before replacing existing team
  - Robust highlight synchronization: Always clears previous highlight before re-highlighting
  - Cross-bombo assignment: Automatically switches bombo when dragging team from different pot
  - Smart timing: 50ms delay for same-bombo, 150ms delay for cross-bombo highlight updates
  - Drop zone detection: Uses getBoundingClientRect() for accurate dragleave boundary detection
  - Global cleanup: dragend listener removes all drag-over states to prevent UI glitches
  - Shared logic: Both modal and drag-and-drop use `assignTeamToGroup()` function for consistency
  - Layout stability: All input wrappers have transparent 2px border by default to prevent layout shift during drag operations
- **2025-11-22**: Implemented smooth fade animations for bombo transitions:
  - Changed all bombo containers to 100% opacity (opacity="1") by default
  - Added CSS transitions (0.4s ease-in-out) for smooth fade effects
  - Modified `updateBomboDisplay()` to animate bombo changes with fade-out/fade-in sequence
  - When switching bombos: fade out current → hide → show new → fade in
  - Creates professional transition effect when changing between bombos in overlay
- **2025-11-22**: Created separate bombo containers with independent structure:
  - Created 4 independent SVG groups (`bombo-container-1` through `bombo-container-4`)
  - Each bombo is a complete element with its own: background, title, flags, names, and highlights
  - Modified JavaScript to show/hide the correct bombo based on selection
  - Updated `updateBomboDisplay()` and `updateCountryHighlight()` functions
  - Each bombo maintains its visual structure as a cohesive unit
- **2025-11-22**: Implemented country name alias system for group display:
  - Added `countryDisplayAliases` object in overlay2.html (line 254)
  - Allows specific countries to show abbreviated names in groups only
  - Active aliases: "República de Corea"→"Rep. De Corea", "Estados Unidos"→"EE.UU.", "Costa de Marfil"→"C. De Marfil", "Nueva Zelanda"→"N. Zelanda", "Repechaje Intercontinental 1"→"R. INTER 1", "Repechaje Intercontinental 2"→"R. INTER 2"
  - Names remain unchanged in bombo display and control panel
  - Only affects visual display in groups grid on overlay2.html
- **2025-11-22**: Implemented manual flag offset system for bombo flags:
  - Added `bomboFlagOffset` configuration object in overlay2.html (line 246)
  - Single offset applied to all 12 bombo flags equally
  - Allows pixel-level adjustment (x/y) for visual centering
  - Offsets applied via `<image>` element attributes without moving clipPath mask
  - Fully documented with Spanish instructions and examples
- **2025-11-21**: Centered bombo flag images within rounded masks:
  - Added preserveAspectRatio="xMidYMid slice" to all 12 bombo flags
  - Flag content (emblems, suns, etc.) now perfectly centered within clipPath
  - Images scale to fill entire space while maintaining central elements aligned
- **2025-11-21**: Fixed flag border system for perfect corner rendering:
  - All bombo border rects now have rx="12" ry="8" matching clipPath geometry
  - All 48 group flag entries restructured with clipPath containers and border rects (rx="12.51" ry="8.3")
  - Group clipPath changed from objectBoundingBox to userSpaceOnUse for precise alignment
  - Added Panamá ('pa') to white-background countries list requiring gray borders
  - Border corners now display correctly without being clipped at rounded edges
- **2025-11-21**: Overlay now uses custom Moderniz.otf font from /fuente folder
- **2025-11-21**: Team selection modal filters by current bombo (shows only 12 teams)
- **2025-11-21**: Assigned teams appear in grayscale in both overlay and control panel bombo grids
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
- **2025-11-21**: Added visual indication for assigned countries in bombo grid:
  - Countries already assigned to groups show grayscale (black & white) flags
  - Text changes to light gray (#888888) for assigned countries
  - Reduced opacity (50%) and disabled cursor for assigned countries
  - Updates automatically when teams are added or removed from groups
  - Prevents confusion about which countries are still available

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
