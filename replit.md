# World Cup Draw Tool

## Overview
This project is a browser-based World Cup group draw tool designed to manage and display group selections in real-time. It consists of two synchronized web pages: a broadcast-ready overlay for streaming software (like OBS) and a control panel for inputting team names during the draw. The tool facilitates a dynamic and engaging World Cup draw experience, leveraging real-time synchronization to ensure all connected devices display the most current group assignments. Its primary ambition is to provide a professional, interactive platform for live event broadcasting of World Cup draws.

## User Preferences
- Spanish language throughout
- Modern, clean design with cyan accents
- Compact layout to maximize screen usage
- Responsive design for multiple device types

## System Architecture

### UI/UX Decisions
The design emphasizes a dark gradient background with cyan (#00d9ff) accents and glow effects. It incorporates glassmorphism with backdrop blur for modern aesthetics. The overlay (`overlay2.html`) is designed to be broadcast-safe with no scrollbars, using a custom 'Moderniz.otf' font and specific flag border radii for a polished look. The control panel (`control2.html`) features a responsive grid layout that adapts from a 6-column desktop view to 1-column on mobile, ensuring usability across devices. Key visual elements include a bombo (pot) display with 4 pots, each showing 12 teams with flag images, and an interactive loading screen. Team assignment supports drag-and-drop from the bombo grid to group slots, with visual feedback like highlighting drop zones and greyscaling assigned teams.

### Technical Implementation
The system is built with a Node.js server using Express and Socket.IO for real-time, bidirectional communication. Frontend is developed with vanilla HTML5, CSS3, and JavaScript (ES6+). Data, representing 12 groups (A-L) each with 4 team slots, is stored in server memory. Socket.IO ensures instant synchronization between the control panel and multiple overlay displays across different devices.

### Feature Specifications
- **Real-time Synchronization**: Two-page synchronization and real-time updates via WebSocket (Socket.IO).
- **Cross-device Support**: Overlay and control panel can operate on separate devices.
- **State Management**: Server-side in-memory storage for group data.
- **Interactive Control Panel**: Features a bombo selector, manual group highlighting, individual team deletion, and drag-and-drop team assignment.
- **Broadcast Overlay**: Displays 12 World Cup groups in a 4x3 grid, with a dynamic bombo display, loading screen with flag preloading, and visual feedback for assigned countries (grayscale flags).
- **Country Aliases**: Supports abbreviated country names in the group display for specific long names.
- **Font Management**: Uses Google Fonts (Poppins) for the control panel and a custom 'Moderniz.otf' for the overlay.

## External Dependencies
- **Node.js**: Server-side JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **Socket.IO**: Library for real-time, bidirectional, event-based communication.
- **Google Fonts**: Provides 'Poppins' font used in the control panel.