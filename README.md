🎮 Games Vault API

Games Vault API is a RESTful web service built with Node.js, Express, and MongoDB, designed to store and manage video games and game studios.
It includes full CRUD functionality, validation, error handling, authentication, and live API documentation through Swagger.

✅ Features

Full CRUD operations for:

Games

Studios

Express routing and modular architecture

MongoDB Atlas database connection using Mongoose

Validation middleware with meaningful error responses

Authentication-protected routes using sessions

Swagger UI documentation available at /api-docs

Ready for deployment on Render

🛠️ Tech Stack

Node.js

Express.js

MongoDB + Mongoose

Swagger UI

dotenv

express-session + connect-mongo

Google OAuth (optional depending on auth setup)

📁 Project Structure
games-vault-api/
│
├── controllers/
│   ├── gameController.js
│   └── studioController.js
│
├── middleware/
│
├── models/
│   ├── Game.js
│   └── Studio.js
│
├── routes/
│   ├── gameRoutes.js
│   ├── studioRoutes.js
│   └── index.js
│
├── swagger.json
├── server.js
└── package.json

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/marsil1990/games-vault-api.git
cd games-vault-api

2️⃣ Install dependencies
npm install

3️⃣ Create .env file in project root
PORT=3000
MONGODB_URL=<your-mongo-atlas-connection-string>
SESSION_SECRET=<any-random-secret>
GOOGLE_CLIENT_ID=<optional>
GOOGLE_CLIENT_SECRET=<optional>
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback


⚠️ The project cannot run locally without a valid .env file.

4️⃣ Start the server
npm start

📚 Swagger Documentation

Once the server is running:

➡️ Local

http://localhost:3000/api-docs


➡️ Deployed (Render)

https://games-vault-api-x81d.onrender.com/api-docs

✅ Available Endpoints
Games

GET /games

GET /games/:id

POST /games

PUT /games/:id

DELETE /games/:id

Studios

GET /studios

GET /studios/:id

POST /studios

PUT /studios/:id

DELETE /studios/:id

All endpoints are documented in Swagger.

🧪 Error Handling

The API returns meaningful HTTP status codes:

200 — Success

201 — Resource created

400 — Invalid request or validation error

404 — Resource not found

500 — Server/database error

✅ Deployment

The project is configured to run on Render with environment variables stored securely in the dashboard.
Ensure .env is NOT pushed to GitHub.

👥 Team Workflow

Each team member works on their own feature branch and submits pull requests into master for review.

Example:

git checkout -b brandon-branch
git push origin brandon-branch

⚠️ Notes

A valid MongoDB Atlas URL is required for database operations.

Swagger will still display without it but CRUD requests will fail.

.env is intentionally excluded from version control.

📄 License

This project is for academic purposes under CSE 341 — BYU-Idaho Web Services.
