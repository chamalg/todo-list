import React, { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import TaskList from "./TaskList";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error loading tasks", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTask.title && newTask.description) {
      try {
        const createdTask = await createTask(newTask);
        //Adding the new task at the top of the list
        setTasks((prevTasks) => [createdTask, ...prevTasks]); 
        setNewTask({ title: "", description: "" });
        showMessage("Task successfully added.", "success");
      } catch (error) {
        console.error("Error adding task", error);
        showMessage("Failed to add task", "error");
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      showMessage("Task successfully deleted.", "success");
    } catch (error) {
      console.error("Error deleting task", error);
      showMessage("Failed to delete task", "error");
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });

    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  return (
    <div className="container">
      {message.text && (
        <div className={`message-container ${message.type}`}>
          <div className="message">{message.text}</div>
        </div>
      )}
      <div className="column">
        <h2>Add a Task</h2>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Title"
          className="input"
        />
        <textarea
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          placeholder="Description"
          className="textarea"
        />
        <button onClick={handleAddTask} className="button">
          Add
        </button>
      </div>
      <hr className="separator-line" />
      <div className="column">
        <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} />
      </div>
    </div>
  );
}

export default App;
