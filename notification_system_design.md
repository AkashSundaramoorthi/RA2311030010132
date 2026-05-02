# Notification System Design

## Overview
A campus notification microservice that fetches, prioritizes, and displays real-time notifications for Placements, Events, and Results.

## Architecture

### Backend (Node.js + Express)
- Fetches notifications from external evaluation API
- Sorts by priority weight and recency
- Exposes REST endpoints for frontend consumption
- Auto-refreshes auth token every 13 minutes

### Frontend (React + Material UI)
- Displays all notifications with type filtering
- Priority Inbox showing top N notifications
- Distinguishes new vs viewed notifications
- Responsive for mobile and desktop

## Stage 1 - Priority Algorithm

### Priority Weights
- Placement: 3 (highest)
- Result: 2
- Event: 1 (lowest)

### Sorting Logic
1. Sort by priority weight descending
2. For equal priority, sort by Timestamp descending (most recent first)
3. Slice top N results

### Complexity
- Time: O(n log n)
- Space: O(n)

## API Endpoints

### Backend
- GET /notifications — fetch all notifications
- GET /notifications/priority?n=10 — fetch top N priority notifications
- GET /refresh-token — manually refresh auth token

## Logging
All significant events logged via Logging Middleware to evaluation-service/logs with appropriate stack, level, package, and message fields.

## Folder Structure
```
RA2311030010132/
  logging_middleware/     — reusable log function
  notification_app_be/    — Express backend
  notification_app_fe/    — React frontend
  notification_system_design.md
  .gitignore
```
