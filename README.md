# Task Tracker (Frontend)

A React single-page application developed as an assignment for Penthara. This project implements the frontend for a simple task tracker that connects to a separate Express backend: https://github.com/hardikchhabra/todo-api

## Purpose

- Demonstrate frontend skills in React (components, hooks, routing, state management, forms).
- Provide a clean, usable UI for creating and managing tasks while consuming a RESTful API.

## Key features

- Create, read, update, and delete tasks (CRUD).
- Task fields: task, description, status (todo/in-progress/done), due date, priority.
- List view with filtering (status and due date) sorted using date created at.
- Basic error handling and loading states.

## Tech stack

- React (Create React App)
- Fetch for API calls
- CSS Modules / Tailwind
- Backend: Express (separate repo) — https://github.com/hardikchhabra/todo-api

## Quick start

1. Clone this repository:

```bash
   git clone https://github.com/hardikchhabra/task_tracker
```

2. Install dependencies:

```bash
   npm install
```

3. Run development server:

```bash
   npm run start
```

4. Build for production:

```bash
   npm run build
```

## Notes

- Backend lives in a separate repository and must be running for the frontend to be functional: https://github.com/hardikchhabra/todo-api
- This project is primarily an assignment/demo and not intended as a production system.
