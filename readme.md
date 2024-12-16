
# Kanban Board Application (MERN Stack)

## Overview
The **MERN Stack Kanban Board Application** is a full-stack web application that helps users manage tasks through various stages of completion, such as "To Do," "In Progress," and "Done." The application is built using MongoDB, Express.js, React.js, and Node.js (MERN stack) and features user authentication, role-based access control, task management, and more.

This project is aimed at students looking to get hands-on experience with full-stack development, particularly in building CRUD applications using modern technologies.

## Features and Functionalities

### 1. User Registration and Authentication
- Register new users with unique usernames and passwords.
- Users can log in and log out using JWT (JSON Web Tokens).
- The app handles user sessions and persists login state.

### 2. Kanban Board Interface
- The board has columns such as "To Do," "In Progress," and "Done."
- Users can drag and drop tasks between these columns.
- Each task has a title, description, and due date.

### 3. Task Management
- Users can create new tasks, view tasks, update task details, and delete tasks.
- Tasks can be updated (e.g., moved between columns) via drag-and-drop functionality.
  
### 4. Role-based Access Control (RBAC)
- Admins have full access to CRUD operations.
- Regular users can create, read, and update tasks but cannot delete tasks.

### 5. Pagination
- Limits the number of tasks displayed per page for better performance.
- Includes navigation to move between pages.

### 6. Error Handling and Validation
- Validate user input to ensure security and data integrity.
- Gracefully handle errors and provide informative error messages.

### 7. Deployment and Hosting
- The app is deployable to platforms like Vercel, Netlify, or EC2.
- Sensitive information like database credentials and JWT secret is stored in environment variables.

### 8. User Experience Enhancements
- The app is responsive to work across devices (mobile, tablet, desktop).
- Visual feedback and animations improve user interactions.

---

## Tech Stack

- **Frontend:**
  - React.js
  - React-Drag-and-Drop (for task movement)
  - Axios (for API calls)
  - CSS/SCSS (for styling)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose (for MongoDB interaction)
  - JWT (for authentication)
  - Bcrypt.js (for hashing passwords)

- **Deployment:**
  - Vercel/Netlify (Frontend)
  - Heroku/EC2 (Backend)

---

## Project Structure

```
kanban-board/
│
├── backend/                         # Backend folder (Node.js + Express)
│   ├── config/                      # Configuration files (e.g., JWT secret, DB connection)
│   ├── controllers/                 # Business logic (handling requests)
│   ├── models/                      # MongoDB models (User, Task, etc.)
│   ├── routes/                      # Express routes for API
│   ├── middleware/                  # Middleware (auth, error handling)
│   └── server.js                    # Entry point for the backend server
│
├── frontend/                        # Frontend folder (React.js)
│   ├── src/
│   │   ├── components/              # React components (Kanban board, TaskItem, etc.)
│   │   ├── context/                 # Context for global state (e.g., user info, tasks)
│   │   ├── pages/                   # Pages (Home, Login, Register, Board, etc.)
│   │   ├── App.js                   # Main React app entry
│   │   └── index.js                 # ReactDOM rendering
│   ├── public/
│   │   └── index.html               # HTML file
│   └── package.json                 # Frontend dependencies
│
├── .env                              # Environment variables (e.g., JWT secret, DB credentials)
├── package.json                      # Backend dependencies
├── README.md                         # Project documentation
└── .gitignore                        # Git ignore files
```



## User Authentication and Authorization

- **JWT Authentication**: The backend uses JWT for user authentication. Tokens are sent with each request to protected routes.
- **Role-based Access Control (RBAC)**: Admins can perform all operations, while regular users have restricted permissions (e.g., they can't delete tasks).

### Key Routes:
- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Log in and receive a JWT token.
- **GET /tasks**: Get all tasks (protected route).
- **POST /tasks**: Create a new task (protected route).
- **PUT /tasks/:id**: Update task details (protected route).
- **DELETE /tasks/:id**: Delete a task (restricted to admins).

---

## API Endpoints

### Auth Routes:
- `POST /auth/register`: User registration.
- `POST /auth/login`: User login.

### Task Routes:
- `GET /tasks`: Get all tasks.
- `POST /tasks`: Create a new task.
- `PUT /tasks/:id`: Update a task.
- `DELETE /tasks/:id`: Delete a task.

---

## Frontend Details

- **React Components:**
  - **KanbanBoard**: Displays the task board with drag-and-drop functionality.
  - **TaskItem**: Displays individual task details.
  - **TaskForm**: Form for creating or editing tasks.
  - **LoginForm**: Form for user login.
  - **RegisterForm**: Form for user registration.

- **State Management**: Global state for user authentication and tasks is managed using React's `Context` API.

---

## Code Quality

- **ESLint**: Coding standards are enforced using ESLint to ensure consistent code style.
- **Prettier**: Automatic code formatting with Prettier.

---

## Deployment

1. **Frontend**: Deploy using Vercel or Netlify.
2. **Backend**: Deploy using Heroku, EC2, or similar cloud platforms.

Make sure to set environment variables for the backend (e.g., MongoDB URI, JWT secret).

---

## Additional Features

- **User Roles**: Admin and regular user roles.
- **Pagination**: For displaying tasks in chunks to improve performance.
- **Responsive Design**: Ensures the app works on various screen sizes.

---


