# Penthara Task Tracker (Frontend)

A React single-page application developed as an assignment for Penthara. This project implements the frontend for a simple task tracker that connects to a separate Express backend: https://github.com/hardikchhabra/todo-api

Purpose

- Demonstrate frontend skills in React (components, hooks, routing, state management, forms).
- Provide a clean, usable UI for creating and managing tasks while consuming a RESTful API.

Key features

- Create, read, update, and delete tasks (CRUD).
- Task fields: title, description, status (todo/in-progress/done), due date, priority.
- List view with sorting and filtering (status, due date, priority).
- Responsive layout for desktop and mobile.
- Basic error handling and loading states.

Tech stack

- React (Create React App or Vite)
- React Router
- Fetch or Axios for API calls
- CSS Modules / Tailwind / plain CSS (project choice)
- Backend: Express (separate repo) — https://github.com/hardikchhabra/todo-api

Quick start

1. Clone this repository:
   git clone <this-repo-url>
2. Install dependencies:
   npm install
3. Configure backend URL:
   - Set environment variable REACT_APP_API_URL to your backend base URL (e.g. http://localhost:4000)
4. Run development server:
   npm start
5. Build for production:
   npm run build

Configuration

- REACT_APP_API_URL: Base URL for the Express API.
- Optional: add .env.local to set REACT_APP_API_URL for local development.

Notes

- Backend lives in a separate repository and must be running for the frontend to be functional: https://github.com/hardikchhabra/todo-api
- This project is primarily an assignment/demo and not intended as a production system.

License

- MIT
