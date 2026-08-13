# Walkthrough: Express Server Foundation Setup

**Date:** 2026-08-13  
**Status:** ✅ Completed & Tested

---

## Overview

Set up the initial Node.js/Express server foundation for the Expiry Date Manager backend, including the full project folder structure as defined in `instructions.md`.

---

## Changes Made

### 1. Folder Structure Created

Created the `src/` directory with all subdirectories per the architecture spec:

```
expiry-date-manager-express-server/
├── src/
│   ├── config/         ← Configuration files (DB connection, env, etc.)
│   ├── controllers/    ← Route handler functions
│   ├── dao/            ← Database interaction layer
│   ├── models/         ← Mongoose schema/model definitions
│   ├── routes/         ← Express route definitions
│   ├── services/       ← Business logic layer
│   └── utils/          ← Shared utility functions
├── server.js           ← Application entry point
├── .env.example        ← Environment variable template
└── package.json        ← Updated with scripts and dependencies
```

### 2. `server.js` — Entry Point

- Bootstraps the Express application
- Loads environment variables via `dotenv`
- Registers global middleware: CORS, JSON body parser, URL-encoded parser, cookie-parser, morgan (HTTP logging)
- Exposes a `GET /api/health` endpoint for server health checks
- Listens on `PORT` from `.env` (default: **5001**)

### 3. `.env.example` — Environment Template

Template for required environment variables:

| Variable | Purpose |
|---|---|
| `PORT` | Server port (default: 5001) |
| `CLIENT_ORIGIN` | Allowed CORS origin for the React client |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing/verification |

### 4. `package.json` — Updated

- `main` updated to `server.js`
- Added `start` and `dev` npm scripts

| Script | Command | Use |
|---|---|---|
| `npm start` | `node server.js` | Production |
| `npm run dev` | `nodemon server.js` | Development (auto-restart) |

### 5. Dependencies Installed

**Production:**
| Package | Version | Purpose |
|---|---|---|
| `express` | ^5.2.1 | Web framework |
| `mongoose` | ^9.9.2 | MongoDB ODM |
| `dotenv` | ^17.4.2 | Environment variable loading |
| `cors` | ^2.8.6 | Cross-Origin Resource Sharing |
| `cookie-parser` | ^1.4.7 | Cookie parsing (required for JWT auth) |
| `morgan` | ^1.11.0 | HTTP request logging |

**Development:**
| Package | Version | Purpose |
|---|---|---|
| `nodemon` | ^3.1.14 | Auto-restart on file changes |

---

## Architecture Followed

The folder structure adheres to the **Controller-Service-Repository** pattern defined in `instructions.md`:

```
Request → Route → Controller → Service → DAO → MongoDB
```

- **Routes** map HTTP endpoints to controllers only
- **Controllers** handle request/response, input validation
- **Services** contain business logic
- **DAOs** handle all database interactions via Mongoose models

---

## Verification

- ✅ Server starts on port 5001 with `npm run dev`
- ✅ `GET /api/health` returns `200 OK`
- ✅ All dependencies installed with 0 vulnerabilities
- ✅ Folder structure matches `instructions.md` spec
