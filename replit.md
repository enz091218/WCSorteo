# World Cup Draw Tool

## Overview
This project is a browser-based World Cup group draw tool featuring two synchronized web pages built with vanilla HTML, CSS, and JavaScript, powered by a Node.js server with Socket.IO. Its primary purpose is to provide a real-time broadcast overlay for streaming software (`overlay2.html`) displaying 12 World Cup groups and a management interface (`control2.html`) for entering team names during the draw. The tool ensures instant updates across all connected devices, offering a robust solution for live event broadcasting.

## User Preferences
- Spanish language throughout
- Modern, clean design with cyan accents
- Compact layout to maximize screen usage
- Responsive design for multiple device types

## System Architecture
The application uses a client-server architecture with a Node.js (Express + Socket.IO) backend and vanilla HTML/CSS/JS frontend.
- **Frontend Pages**:
    - `index.html`: Landing page.
    - `overlay2.html`: Broadcast-ready fullscreen display for 12 groups (A-L), featuring bombo (pot) display, flag preloading, and real-time updates.
    - `control2.html`: Management interface with a bombo selector, responsive group input, team deletion, drag-and-drop assignment, and password protection.
- **Backend**: `server.js` manages group data in-memory and broadcasts updates via Socket.IO.
- **Data Structure**: Group data is stored as a JSON object in server memory (e.g., `{"A": ["", "", "", ""]}`).
- **UI/UX Decisions**:
    - Dark gradient background with cyan (#00d9ff) accents and glow effects.
    - Glassmorphism effects with backdrop blur.
    - Modern, clean typography (Google Fonts - Poppins for control, Moderniz.otf for overlay).
    - Responsive grid layouts optimized for various devices (mobile, tablet, desktop).
    - No scrollbars on the overlay for broadcast-safe display.
    - Features like group highlighting, country highlighting in bombo, and visual feedback for assigned teams.
    - Smooth fade animations for bombo transitions.
    - Password protection for the control panel with server-side validation.
    - Drag-and-drop functionality for team assignment from bombo to groups.
    - Country name alias system for abbreviated display in groups.

## External Dependencies
- **Backend**: Node.js, Express.js, Socket.IO, crypto (built-in)
- **Frontend**: Google Fonts (Poppins)
- **Custom Fonts**: Moderniz.otf (from `/fuente` folder)
- **External Services**: None directly, but designed for integration with streaming software like OBS.

## Recent Changes (November 22, 2025)
- **Token-based Authentication System**: Implemented robust password protection with cryptographic token-based authentication
  - Server generates random 64-character hex token using crypto.randomBytes() after successful password validation
  - Client receives token and stores in sessionStorage (authToken)
  - Socket.IO connection requires authentication handshake with valid token before any operations
  - All socket events (update_groups, set_bombo, etc.) are gated server-side with authentication check
  - Tokens automatically expire after 24 hours
  - Invalid tokens result in socket disconnection
  - Client code encapsulated in IIFE to prevent console bypass of authentication
  - Password stored securely in CONTROL_PANEL_PASSWORD environment variable (default: "3dblencad")
- **Delayed Grayscale Rendering**: Flags in bombo remain colorful during 3-second highlight period before turning gray
  - Applies to both control panel and overlay for visual consistency
  - Detects previously assigned teams vs newly assigned teams
- **Auto-unhighlight Feature**: Countries and groups automatically unhighlight after 3 seconds
  - Smart guards against race conditions
  - Validates current state before clearing to prevent clearing manually changed highlights