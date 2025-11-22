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

## Recent Changes
### November 22, 2025
-   **Created Overlay 3** (`overlay3.html`): New broadcast overlay with vertical layout featuring 3 rows × 4 columns grid (12 groups) and centered bombo at the bottom. Uses SVG transforms to reposition groups from overlay2.html base without modifying internal coordinates. Fully maintains Socket.IO synchronization and all advanced features (drag-and-drop, highlighting, loading screen, etc.).
-   **Updated index.html**: Added new card for Overlay 3 in main pages section with link and copy button functionality.