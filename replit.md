# World Cup Draw Tool

## Overview
A browser-based World Cup group draw tool featuring two synchronized pages: a broadcast overlay for streaming software (OBS) and a management interface for entering team names. The tool facilitates real-time World Cup group draws with instant updates across all connected devices, driven by a Node.js server with Socket.IO. The project aims to provide a modern, user-friendly, and broadcast-ready solution for managing and displaying World Cup draws.

## User Preferences
- Spanish language throughout
- Modern, clean design with cyan accents
- Compact layout to maximize screen usage
- Responsive design for multiple device types

## System Architecture
The application is built with a clear separation between the frontend (vanilla HTML, CSS, JavaScript) and a Node.js backend.
-   **Frontend**: Consists of `index.html` (landing page), `overlay2.html` (broadcast-ready display with bombo and loading screen), and `control2.html` (management interface with responsive design and bombo selector).
    -   **UI/UX**: Features a dark gradient background, cyan accents with glow effects, glassmorphism, modern typography (Poppins for control, Moderniz.otf for overlay), and responsive grid layouts. Overlays are designed to be broadcast-safe with no scrollbars.
    -   **Key Features**: Two-page synchronization via Socket.IO, real-time updates, cross-device support, server-side state management, broadcast-ready overlay, user-friendly control panel, clear all functionality, success/error messages, comprehensive documentation.
    -   **Advanced Interactions**: Bombo (pot) display with 4 pots, loading screen with flag preloading, group highlighting, responsive design across devices, click-to-highlight country in bombo grid, manual group highlighting, individual team deletion, visual feedback for assignments, drag-and-drop team assignment from bombo to group slots, country name alias system for overlay display, and manual flag offset adjustments.
-   **Backend**: `server.js` uses Node.js, Express, and Socket.IO to manage group data in memory and broadcast updates to connected clients.
    -   **Data Structure**: Groups are stored in a JSON object in server memory, with 12 groups (A-L) each holding 4 team slots.

## External Dependencies
-   **Backend**: Node.js, Express.js, Socket.IO
-   **Frontend**: Google Fonts (Poppins), custom font Moderniz.otf (from `/fuente` folder)
-   **Synchronization**: Socket.IO (WebSockets)

## Configuration Files
-   **Style Configuration** (`config/overlay3-config.js`): Centralized configuration file documenting all visual styles for Overlay 3. Includes settings for colors, fonts, sizes, animations, and component-specific styling (groups, bombo, loading screen). Currently serves as reference documentation - values must be applied manually to overlay3.html.
-   **Style Guide** (`config/OVERLAY3-GUIA-ESTILOS.md`): Complete guide in Spanish explaining how to use the configuration file, including examples, component descriptions, and customization tips.

## Recent Changes
### November 24, 2025
-   **Created Style Configuration System**: 
    -   Added `config/overlay3-config.js` with comprehensive style settings for all Overlay 3 components
    -   Added `config/OVERLAY3-GUIA-ESTILOS.md` documentation guide in Spanish
    -   Configuration covers: groups (headers, cells, flags), bombo (title, content, teams, highlighting), loading screen, animations, general colors, typography
    -   File serves as reference/documentation for manual editing - automatic integration pending
-   **Enhanced Overlay 3 Highlighting**:
    -   Changed bombo highlight color from yellow to golden (`#AA8112`) to match group selector
    -   Highlighted team text in bombo now turns white for better contrast
    -   Adjusted highlight box width to 115px to properly cover flag and 3-letter country code
-   **Moved Overlay 2 to Legacy**: Reorganized index.html to show only Overlay 3 as main option, moved Overlay 2 to "Ver versiones antiguas" section

### November 22, 2025
-   **Created Overlay 3** (`overlay3.html`): New broadcast overlay with 3 rows × 4 columns vertical layout. Groups are distributed evenly across the screen with the bombo centered at the bottom. Built on overlay2.html foundation with SVG transform wrappers to reposition all 12 groups and 4 bombo containers. Maintains full Socket.IO synchronization, drag-and-drop, highlighting, loading screen, and all advanced features from overlay2.
-   **Implemented Absolute Positioning System for Overlay 3**: 
    -   **Control Panel** in `control2.html` with "⚙️ Controles Overlay 3" button that opens a modal panel
    -   **Absolute coordinates** based on 1920x1080 screen resolution (X: 0-1920, Y: 0-1080)
    -   **Positioning by top-left corner**: X and Y values represent the exact pixel position of the element's top-left corner on screen
    -   **Independent control** of position (X, Y) and scale (ScaleX, ScaleY) for each of the 12 groups (A-L) and 4 bombos
    -   **Real-time synchronization** via Socket.IO: changes from control panel instantly appear on overlay3.html
    -   **Persistent storage** in `transforms.json`: positions are saved on server and loaded automatically on restart
    -   **Server-side management** in `server.js`: handles loading, saving, and broadcasting position updates to all connected clients
    -   Panel features responsive design with dark theme, cyan accents, and clear labels indicating coordinate ranges
-   **Updated index.html**: Added new card for Overlay 3 in main pages section with link and copy button functionality.