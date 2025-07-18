# Feedback Collection Platform

A full-stack MERN application for collecting feedback via customizable forms. Admins can create forms, view responses, and export data. Customers can submit feedback via public links.

## Features
- Admin registration/login (JWT auth)
- Create feedback forms (text/multiple-choice questions)
- Public form submission (no login required)
- Dashboard for viewing responses (table + summary)
- Export responses as CSV
- Mobile-responsive UI

## Tech Stack
- MongoDB, Express, React, Node.js

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd full_stack_ayn/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in backend folder:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

4. Open http://localhost:3000 in your browser

### Environment Variables
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Backend server port (default: 5000)

## Design Decisions
- Modular code structure for scalability
- RESTful API design
- JWT for secure admin access
- Responsive UI for all devices

## Project Structure
```
full_stack_ayn/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
└── README.md
```

## API Endpoints
- `POST /api/auth/register` - Admin registration
- `POST /api/auth/login` - Admin login
- `POST /api/forms` - Create feedback form
- `GET /api/forms` - Get all forms
- `GET /api/forms/:id` - Get specific form
- `POST /api/responses` - Submit feedback response
- `GET /api/responses/:formId` - Get form responses
- `GET /api/responses/:formId/csv` - Export responses as CSV

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.
