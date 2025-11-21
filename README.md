# World Cup Draw Tool

A simple, browser-based World Cup group draw tool with two synchronized pages - a broadcast overlay and a control panel.

## Features

- **Two-page system**: Overlay page for streaming/broadcast and control panel for data entry
- **Real-time synchronization**: Changes in the control panel instantly appear on the overlay using Socket.IO
- **Server-based state**: Node.js server stores groups in memory and broadcasts to all connected clients
- **Cross-device support**: Overlay and control panel can be on different computers/devices
- **Broadcast-ready design**: Clean, modern overlay optimized for OBS and streaming software
- **8 groups with 4 teams each**: Standard World Cup group stage format (Groups A-H)

## Pages

### overlay.html - Broadcast Overlay
This is the page you display in OBS or your streaming software:
- Fullscreen dark design with gradient background
- 4×2 grid showing all 8 groups
- Modern Poppins font with cyan accents
- No scrollbars, buttons, or inputs - just clean display
- Empty slots show "(empty)" in gray
- Updates automatically when you save changes in the control panel

### control.html - Control Panel
This is where you enter team names during the draw:
- Input fields for all 8 groups (A-H)
- 4 team slots per group
- **Save Changes** button - saves all teams and updates the overlay
- **Clear All** button - resets everything (asks for confirmation)
- Two-column layout to minimize scrolling
- Shows success messages when saving

## How to Use

1. **Start the server**:
   - The Node.js server runs automatically on port 5000
   - Access the app from any device on the same network

2. **Open the pages** (can be on different computers):
   - `overlay.html` - Add this to OBS as a browser source or display fullscreen
   - `control.html` - Use this to enter team names during the draw

3. **During the draw**:
   - As each team is drawn, type it into the appropriate group/slot in `control.html`
   - Click "Save Changes" to update the overlay
   - The overlay updates instantly via Socket.IO - no refresh needed

4. **Technical Details**:
   - Server stores groups in memory and broadcasts to all connected clients
   - Overlay and control panel can be on different devices (same network or internet)
   - Real-time updates using Socket.IO WebSocket connections
   - All clients automatically receive updates when anyone makes changes

## Data Structure

The server stores data in memory as a JSON object:

```json
{
  "A": ["Team 1", "Team 2", "Team 3", "Team 4"],
  "B": ["", "", "", ""],
  "C": ["", "", "", ""],
  "D": ["", "", "", ""],
  "E": ["", "", "", ""],
  "F": ["", "", "", ""],
  "G": ["", "", "", ""],
  "H": ["", "", "", ""]
}
```

## Files

- `server.js` - Node.js server with Socket.IO (stores groups in memory)
- `overlay.html` - Broadcast overlay page
- `control.html` - Control panel page
- `script-overlay.js` - Overlay logic (receives updates via Socket.IO)
- `script-control.js` - Control panel logic (sends updates via Socket.IO)
- `package.json` - Node.js dependencies
- `README.md` - This documentation

## Requirements

- Node.js 18+ (for running the server)
- Modern browsers that support:
  - WebSocket / Socket.IO
  - CSS Grid
  - ES6 JavaScript

## Tips

- The server must be running for the app to work
- The overlay and control panel can be on different computers/devices
- Multiple overlays can connect simultaneously (all will update in real-time)
- You can edit and save changes multiple times - all connected clients update instantly
- Use "Clear All" to reset for a new draw
- The overlay works great as an OBS Browser Source at 1920×1080 resolution
- Access the app using your Replit URL from any device on the internet
