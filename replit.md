# Attendify - Attendance Management System

## Overview
Attendify is a web-based attendance and event management system designed for educational institutions. The application allows administrators to manage events, track student attendance, and view real-time attendance statistics.

## Project Structure
This is a static web application built with:
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
- **Backend**: Supabase (Database & Authentication)
- **Server**: Node.js with Express (serves static files)
- **UI Libraries**: 
  - Tailwind CSS (via CDN)
  - Font Awesome icons
  - Chart.js for data visualization

## Key Features
- User authentication (admin login)
- Event scheduling and management
- Real-time attendance tracking (Morning In/Out, Afternoon In/Out)
- Dashboard with attendance statistics and graphs
- Event calendar and history
- User profile management with image upload
- Responsive design with glassmorphic UI elements

## File Structure
```
/
├── index.html              # Login page
├── header-sidebar.html     # Main navigation frame
├── dashboard.html          # Admin dashboard with stats
├── eventschedule.html      # Event scheduling
├── eventhistory.html       # Past events
├── settings.html           # User settings
├── monthschedule.html      # Monthly calendar view
├── weekschedule.html       # Weekly calendar view
├── css/                    # Stylesheets
│   ├── login.css
│   ├── dashboard.css
│   └── style.css
├── js/                     # JavaScript files
│   ├── login.js           # Authentication logic
│   └── script.js          # UI interactions
├── images/                 # Static assets
├── server.js              # Express server
└── package.json           # Node.js dependencies
```

## Database Schema (Supabase)
The application uses the following Supabase tables:
- **admin**: User accounts (id, email, password, name, picture)
- **event**: Event details (EventName, EventDetails, Organizer, Start, End, attendance times)
- **Attendance**: Student attendance records (EventName, Date, MorningIn, MorningOut, AfternoonIn, AfternoonOut)

## Configuration

### Supabase Connection
The application connects to a Supabase instance:
- URL: `https://zovmjxdfmzhxetopmpyp.supabase.co`
- The connection details are configured in the HTML files

### Server Configuration
- Port: 5000
- Host: 0.0.0.0 (allows external connections)
- Serves all static files from the root directory

## Development

### Running Locally
The server runs automatically via the configured workflow. To manually start:
```bash
node server.js
```

### Workflow
- **Name**: Server
- **Command**: `node server.js`
- **Port**: 5000
- **Output**: webview

## Deployment
The project is configured for Replit deployment using:
- **Deployment Type**: autoscale (stateless web server)
- **Run Command**: `node server.js`

## Recent Changes
- 2025-10-20: Initial Replit environment setup
  - Created Express server to serve static files
  - Configured workflow for port 5000
  - Set up deployment configuration
  - Added .gitignore for Node.js and Replit files

## User Preferences
None specified yet.

## Notes
- The application uses plain-text password storage in the database (not recommended for production)
- Tailwind CSS is loaded via CDN (suitable for development, should be built for production)
- All pages use session checking via localStorage
- Real-time updates are implemented using Supabase subscriptions
