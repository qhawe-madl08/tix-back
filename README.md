# Event Ticketing Platform

A full-stack application for event ticketing with a Next.js frontend and Node.js/Express backend.

## Project Structure

\`\`\`
event-ticketing-platform/
├── frontend/             # Next.js frontend application
│   ├── app/              # App Router pages and layouts
│   ├── components/       # React components
│   ├── lib/              # Utility functions and API client
│   └── public/           # Static assets
│
├── backend/              # Node.js/Express backend application
│   ├── prisma/           # Prisma schema and migrations
│   └── src/              # Backend source code
│       ├── middleware/   # Express middleware
│       └── routes/       # API routes
│
└── package.json          # Root package.json for workspaces
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:

\`\`\`bash
# In the backend directory
cp .env.example .env
# Edit .env with your database credentials and JWT secret

# In the frontend directory
cp .env.example .env
# Edit .env with your API URL
\`\`\`

4. Set up the database:

\`\`\`bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
npm run seed
\`\`\`

### Running the Application

Start both frontend and backend in development mode:

\`\`\`bash
npm run dev
\`\`\`

Or start them separately:

\`\`\`bash
# Start frontend only
npm run dev:frontend

# Start backend only
npm run dev:backend
\`\`\`

## Features

- User authentication and authorization
- Event creation and management
- Ticket purchasing and verification
- Admin dashboard
- Organizer tools

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login a user

### Events
- `GET /events` - Get all events
- `GET /events/:id` - Get event by ID
- `POST /events` - Create a new event (requires auth)
- `PUT /events/:id` - Update an event (requires auth)
- `DELETE /events/:id` - Delete an event (requires auth)

### Tickets
- `GET /tickets/my-tickets` - Get user's tickets (requires auth)
- `POST /tickets/purchase` - Purchase tickets (requires auth)
- `POST /tickets/verify/:qrCode` - Verify a ticket (requires auth)

### Users
- `GET /users/me` - Get current user profile (requires auth)
- `PUT /users/me` - Update user profile (requires auth)

### Organizers
- `GET /organizers/my-events` - Get organizer's events (requires auth)
- `GET /organizers/events/:eventId/sales` - Get ticket sales for an event (requires auth)
- `POST /organizers/apply` - Apply to become an organizer (requires auth)

### Admin
- `GET /admin/users` - Get all users (admin only)
- `PUT /admin/users/:id/role` - Update user role (admin only)
- `GET /admin/stats` - Get system stats (admin only)

## License

This project is licensed under the MIT License.
