# Task App
## Description
A simple daily task management app. Tasks are associated with a day, allowing you to start each day anew and plan for the future.

*Last updated: 8/13/2025*

## Details

### Tech Stack
**Frontend:** React (with Tailwind CSS)

**Backend:** Node.js, Express.js, PostgreSQL

### Current Features

- Single user 
- View current time and date
- Create tasks for any day
- Edit tasks
- Set task status (pending, in progress, completed, pushed)
- Delete tasks
- Move between days and jump to today

## Demo

https://github.com/user-attachments/assets/c7a7d6ca-e7c6-4ce3-b8f5-1c96b32d614c

## Installation

Use the npm package manager to install dependencies.

```bash
npm install
```

You will also need to add a `./server/.env` file with `PORT` and `DATABASE_URL` variables to run the server and establish the database connection.

Once your database is connected, use the following command to initialize and seed the database.
```bash
npm run db:init
```

## Usage

```bash
npm run dev # run both server and client
npm run server # run only server
npm run client # run only client 
```

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
