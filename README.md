# Campus Couch

A marketplace platform for college students to buy and sell items within their campus community.

## Features

- User authentication and authorization
- Product listings and search
- Real-time messaging
- Secure payments
- Campus-specific categories

## Tech Stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: MongoDB
- Authentication: JWT
- Payment: Stripe

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/campus-couch.git
cd campus-couch
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env` in both frontend and backend directories
- Fill in the required environment variables

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd ../frontend
npm run dev
```

## Deployment

The application is deployed on Vercel:
- Frontend: https://campuscouch.com
- Backend: https://api.campuscouch.com

## License

This project is licensed under the MIT License - see the LICENSE file for details. 