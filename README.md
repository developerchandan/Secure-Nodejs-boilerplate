# Jobluu API

Jobluu API is a RESTful service for managing job listings.

## Prerequisites

- Node.js (v14 or later)
- MongoDB

## Installation

1. Clone the repository:
2. Install dependencies:
3. Create a `.env` file in the root directory and add the following:

Replace `your_very_long_and_secure_secret_key` with a secure random string.

## Running the Application

To start the server in development mode:
To start the server in production mode:

The server will start on the port specified in your `.env` file (default is 3000).

## API Endpoints

- POST /api/v1/users/register - Register a new user
- POST /api/v1/users/login - Login a user
- GET /api/v1/jobs - Get all jobs
- POST /api/v1/jobs - Create a new job (protected route)
- GET /api/v1/jobs/:id - Get a specific job
- PUT /api/v1/jobs/:id - Update a job (protected route)
- DELETE /api/v1/jobs/:id - Delete a job (protected route)

## Testing

To run tests: