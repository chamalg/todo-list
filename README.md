# To-Do List Application (React & Node)

A simple to-do list application built using React on the frontend and Node.js with Express for the backend. This app allows users to add, view, and delete tasks, with tasks displayed in descending order of creation (newest at the top). The app uses a RESTful API to handle task operations, and tasks are stored in a database.

## Features:
- Add new tasks with a title and description.
- View all tasks with the most recent displayed at the top.
- Delete tasks once completed.
- Displays success or error messages after adding a task.

## Tech Stack:
- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Containerization**: Docker

## Installation Instructions

## 1. Clone the Repository
Clone the repository to your local machine.
`git clone https://github.com/chamalg/todo-list.git`


## 2. Run following Docker commands
Navigate to the root directory of your project, where the docker-compose.yml file is located, using the cd (change directory) command, and then execute `docker-compose up --build`
 
## 3. Create .env files
Refer to the `.env.example` file and create your own `.env` file with the appropriate values in both the root level and inside the `server` directory..

## 4. Access the Application
After the containers are up, you can access the application via:

- **Frontend**: Visit `http://localhost:3000` in your browser.
- **Backend**: The backend API should be available at `http://localhost:5000`.

## Future Work

- Implement end-to-end tests to ensure the application's functionality and workflow are thoroughly validated.
