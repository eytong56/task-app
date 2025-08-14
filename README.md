# Task App
## Description
A simple daily task management app. Tasks are associated with a day, allowing you to start each day anew and plan for the future.

*Last updated: 8/13/2025*

## Tech Stack
**Frontend:** React (with Tailwind CSS)

**Backend:** Node.js, Express.js, PostgreSQL

## Current Features

- Single user 
- View current time and date
- Create tasks for any day
- Edit tasks
- Set task status (pending, in progress, completed, pushed)
- Delete tasks
- Move between days and jump to today

## Demo

*TODO: Add demo*

## Next Steps

### General
- Deploy!

### Backend
- Create new `users` table in database
- `users` API (create, edit user details, etc.)
- Connect `users` table with `tasks` table via foreign key
- Implement login, authentication, and authorization (passport.js)

### Frontend
- Allow users to jump to specific dates (via calendar)
- Explanatory tool tips that appear on hover
- Dark mode
- Expand status menu on hover, collapse otherwise
- Login, sign-up, profile page to edit user details